import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const WishForYou = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const textRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    // Floating particles animation
    const particles = particlesRef.current.children;
    anime({
      targets: particles,
      translateY: () => anime.random(-20, 20),
      translateX: () => anime.random(-20, 20),
      scale: () => anime.random(0.8, 1.2),
      opacity: [0.3, 0.7],
      direction: 'alternate',
      loop: true,
      duration: () => anime.random(3000, 5000),
      easing: 'easeInOutSine'
    });

    // Scroll reveal animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animasi masuk untuk Kartu Kaca (Glassmorphism Card)
            anime({
              targets: cardRef.current,
              opacity: [0, 1],
              scale: [0.85, 1],
              translateY: [80, 0],
              rotateX: [15, 0],
              duration: 1500,
              easing: 'easeOutElastic(1, .8)'
            });

            // Animasi masuk untuk teks di dalamnya (Staggered)
            anime({
              targets: textRef.current.children,
              translateY: [40, 0],
              opacity: [0, 1],
              filter: ['blur(10px)', 'blur(0px)'],
              delay: anime.stagger(150, { start: 400 }), // Mulai setelah kartu bergerak
              duration: 1200,
              easing: 'easeOutQuart'
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Set initial state
    if (cardRef.current) {
      cardRef.current.style.opacity = '0';
      cardRef.current.style.transform = 'scale(0.85) translateY(80px) rotateX(15deg)';
      // Persiapkan properti 3D agar rotateX terlihat keren
      cardRef.current.parentNode.style.perspective = '1000px';
    }

    Array.from(textRef.current.children).forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
      el.style.filter = 'blur(10px)';
    });

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[80vh] bg-[#112D4E] flex items-center justify-center py-24 px-6 md:px-12 overflow-hidden"
    >
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#3F72AF]/20 blur-[100px]"></div>
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[#DBE2EF]/10 blur-[100px]"></div>
      </div>

      {/* Floating Particles Container */}
      <div ref={particlesRef} className="absolute inset-0 w-full h-full pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: 0.3
            }}
          />
        ))}
      </div>

      {/* Glassmorphism Card Wrapper with Perspective */}
      <div className="relative z-10 w-full max-w-4xl mx-auto" style={{ perspective: '1000px' }}>
        <div ref={cardRef} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-16 lg:p-24 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">

          {/* Content Wrapper */}
          <div ref={textRef} className="flex flex-col items-center text-center">

            {/* Section Subtitle */}
            <span className="text-[#3F72AF] font-sans font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-6">
              A Special Note
            </span>

            {/* Heading */}
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-[#F9F7F7] mb-10 leading-tight">
              My Wish <span className="italic font-light text-[#3F72AF]">for You</span>
            </h2>

            {/* Decorative Divider */}
            <div className="flex items-center justify-center gap-4 mb-10 opacity-70">
              <div className="h-[1px] w-16 md:w-24 bg-gradient-to-r from-transparent to-[#DBE2EF]"></div>
              <div className="w-2 h-2 rotate-45 border border-[#DBE2EF]"></div>
              <div className="h-[1px] w-16 md:w-24 bg-gradient-to-l from-transparent to-[#DBE2EF]"></div>
            </div>

            {/* Wish Text (Lorem Ipsum) */}
            <p className="font-sans text-lg md:text-xl lg:text-2xl text-[#F9F7F7]/80 leading-relaxed font-light max-w-3xl mb-12">
              "Sayangg selamat ulang tahun yaa.. Semoga semua yang kamu harapkan dan semua yang kamu cita-cita kan terwujud yaa sayangg. Semoga kamu selalu sehat selalu dalam lindungan Allah SWT. Selalu jadi anak yang baik dan berbakti kepada orang tahun Semoga sukses selalu, diberi banyak rezekinya dan dilancarkan."
            </p>

            {/* Signature */}
            <div className="mt-8">
              <p className="text-[#F9F7F7]/60 font-sans text-sm uppercase tracking-widest mb-2">
                With all my love,
              </p>
              <p
                className="text-[#3F72AF] text-4xl md:text-5xl opacity-90"
                style={{ fontFamily: "'Caveat', cursive" }}
              >
                Maekel
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WishForYou;
