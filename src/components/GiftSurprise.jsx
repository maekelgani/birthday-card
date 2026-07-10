import React, { useState, useRef, useEffect } from 'react';
import anime from 'animejs';
import { Gift } from 'lucide-react';

const secretMessages = [
  "Kamu dapat aku",
  "Yang ini juga dapat aku",
  "Semuanya dapat AKUUUUU!"
];

const GiftCard = ({ index, message, isFlipped, onClick }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (isFlipped && cardRef.current) {
      anime({
        targets: cardRef.current,
        rotateY: '180deg',
        duration: 800,
        easing: 'easeOutElastic(1, .8)'
      });
    }
  }, [isFlipped]);

  return (
    <div className="relative w-64 h-80 cursor-pointer group" style={{ perspective: '1000px' }} onClick={onClick}>
      <div
        ref={cardRef}
        className={`w-full h-full relative transition-transform duration-300 ${isFlipped ? 'pointer-events-none' : 'group-hover:-translate-y-2 group-hover:scale-105'}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Depan Kado */}
        <div
          className="absolute inset-0 w-full h-full bg-[#3F72AF] rounded-2xl flex flex-col items-center justify-center shadow-lg border-4 border-[#112D4E]/10"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <Gift className="w-20 h-20 text-white mb-4" />
          <span className="text-white font-sans font-bold tracking-widest text-lg">KADO {index + 1}</span>
        </div>

        {/* Belakang Pesan */}
        <div
          className="absolute inset-0 w-full h-full bg-[#FFFFFF] rounded-2xl flex items-center justify-center p-6 shadow-xl border border-[#DBE2EF]"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <span className="text-[#112D4E] font-sans font-extrabold text-2xl text-center leading-snug">
            {message}
          </span>
        </div>
      </div>
    </div>
  );
};

const GiftSurprise = () => {
  const [clickStep, setClickStep] = useState(0);
  const [openedCards, setOpenedCards] = useState({});

  const handleCardClick = (cardIndex) => {
    // Cek apakah sudah dibuka
    if (openedCards[cardIndex] || clickStep >= secretMessages.length) return;

    // Tetapkan pesan berdasarkan urutan step (Illusion of choice)
    const assignedMessage = secretMessages[clickStep];

    setOpenedCards(prev => ({
      ...prev,
      [cardIndex]: assignedMessage
    }));

    setClickStep(prev => prev + 1);

    // Jika ini adalah kado terakhir (ketiga)
    if (clickStep === 2) {
      triggerConfetti();
    }
  };

  const triggerConfetti = () => {
    // Confetti effect sederhana menggunakan DOM elements dan Anime.js
    const colors = ['#3F72AF', '#112D4E', '#FFFFFF', '#DBE2EF'];
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    document.body.appendChild(container);

    const particles = [];
    for (let i = 0; i < 50; i++) {
      const p = document.createElement('div');
      p.style.position = 'absolute';
      p.style.width = '10px';
      p.style.height = '10px';
      p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      p.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      p.style.left = '50%';
      p.style.top = '50%';
      container.appendChild(p);
      particles.push(p);
    }

    anime({
      targets: particles,
      translateX: () => anime.random(-500, 500),
      translateY: () => anime.random(-500, 500),
      scale: [1, 0],
      rotate: () => anime.random(-360, 360),
      duration: 3000,
      easing: 'easeOutExpo',
      complete: () => {
        if (container.parentNode) {
          container.parentNode.removeChild(container);
        }
      }
    });
  };

  return (
    <section className="w-full min-h-screen bg-[#DBE2EF] py-20 px-6 flex flex-col items-center justify-center relative z-20">
      <div className="text-center mb-16 max-w-2xl">
        <h2 className="font-sans text-4xl md:text-5xl font-extrabold text-[#112D4E] tracking-tight mb-4">
          Pilih Kado Kamu
        </h2>
        <p className="text-[#3F72AF] font-medium text-lg">
          Pilih yang mana aja! maw satu, duwa, atau semuwanyaa juga bolee.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-12 justify-center items-center">
        {[0, 1, 2].map((index) => (
          <GiftCard
            key={index}
            index={index}
            message={openedCards[index]}
            isFlipped={!!openedCards[index]}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default GiftSurprise;
