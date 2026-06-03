import React, { useState, useRef, useEffect } from 'react';
import anime from 'animejs';

const MemoryBubbles = () => {
  const [poppedCount, setPoppedCount] = useState(0);
  const words = ["I", "Love", "You"];
  const bubblesRef = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    bubblesRef.current.forEach((el, index) => {
      if (el) {
        anime({
          targets: el,
          translateY: () => anime.random(-15, 15),
          translateX: () => anime.random(-10, 10),
          direction: 'alternate',
          loop: true,
          duration: () => anime.random(2500, 4500),
          easing: 'easeInOutSine',
          delay: index * 300
        });
      }
    });
  }, []);

  const handlePop = (index) => {
    if (index !== poppedCount) return; 

    const el = bubblesRef.current[index];
    
    anime({
      targets: el,
      scale: 1.3,
      opacity: 0,
      duration: 400,
      easing: 'easeOutQuint'
    });

    setPoppedCount(prev => {
      const nextCount = prev + 1;
      if (nextCount === 3) {
        setTimeout(triggerFireworks, 600);
      }
      return nextCount;
    });
  };

  const triggerFireworks = () => {
    const fwContainer = document.createElement('div');
    fwContainer.className = 'fixed inset-0 pointer-events-none z-50 overflow-hidden';
    document.body.appendChild(fwContainer);

    for (let i = 0; i < 80; i++) {
      const p = document.createElement('div');
      p.className = 'absolute w-2 h-2 rounded-full';
      // Bright festive colors fitting the light theme
      p.style.backgroundColor = ['#3F72AF', '#112D4E', '#FFB6C1', '#FFD700', '#DBE2EF'][Math.floor(Math.random() * 5)];
      p.style.left = '50%';
      p.style.top = '50%';
      fwContainer.appendChild(p);

      anime({
        targets: p,
        translateX: () => anime.random(-400, 400),
        translateY: () => anime.random(-400, 150),
        scale: [0, Math.random() * 2 + 1],
        opacity: [1, 0],
        duration: () => anime.random(1500, 3000),
        easing: 'easeOutExpo',
        complete: i === 79 ? () => fwContainer.remove() : undefined
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-20 relative" ref={containerRef}>
      <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#112D4E] mb-16 text-center">
        Pecahkan gelembung ini secara berurutan...
      </h2>
      
      <div className="flex justify-center gap-6 md:gap-16 mb-16 relative w-full max-w-md">
        {words.map((word, index) => (
          <div key={index} className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
            
            {/* The revealed word */}
            <span 
              className={`absolute font-serif text-4xl md:text-5xl font-bold text-[#3F72AF] transition-all duration-700 ${poppedCount > index ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
            >
              {word}
            </span>
            
            {/* The Bubble (Glassmorphism light theme) */}
            <div 
              ref={el => bubblesRef.current[index] = el}
              onClick={() => handlePop(index)}
              className={`absolute w-full h-full rounded-full cursor-pointer bg-[#DBE2EF]/30 backdrop-blur-md border border-white/60 shadow-[0_8px_32px_rgba(63,114,175,0.15)] flex items-center justify-center transition-transform hover:scale-105 hover:bg-[#DBE2EF]/50 ${poppedCount > index ? 'pointer-events-none' : ''}`}
            >
              <div className="w-1/3 h-1/3 bg-white/60 rounded-full absolute top-3 left-3 blur-[3px]"></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className={`transition-all duration-1000 text-center px-4 ${poppedCount === 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <p className="font-serif text-2xl md:text-4xl text-[#112D4E] font-medium italic mb-4">
          "Terima kasih telah mewarnai hari-hariku."
        </p>
      </div>
    </div>
  );
};

export default MemoryBubbles;
