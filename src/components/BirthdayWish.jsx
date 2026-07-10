import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const BirthdayWish = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animasikan Teks (Blur Reveal effect)
          if (textRef.current) {
            const elements = textRef.current.children;
            anime({
              targets: elements,
              opacity: [0, 1],
              translateY: [30, 0],
              filter: ['blur(10px)', 'blur(0px)'],
              delay: anime.stagger(200),
              duration: 1500,
              easing: 'easeOutQuart'
            });
          }

          // Animasikan SVG Draw Line
          if (svgRef.current) {
            anime({
              targets: '.cake-path',
              strokeDashoffset: [anime.setDashoffset, 0],
              easing: 'easeInOutSine',
              duration: 2500,
              delay: function (el, i) { return i * 200 },
              direction: 'forwards',
              loop: false
            });
          }

          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full min-h-screen flex items-center justify-center py-20 px-6 md:px-16 bg-transparent relative z-20">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">

        {/* Kolom Kiri: Teks Ucapan */}
        <div className="flex flex-col space-y-6" ref={textRef}>
          <span className="text-[#3F72AF] font-mono tracking-widest font-semibold uppercase opacity-0">
            Sebuah Harapan
          </span>
          <h2 className="font-sans text-5xl md:text-7xl font-extrabold text-[#112D4E] tracking-tight leading-tight opacity-0">
            Selamat <br className="hidden md:block" /> Ulang Tahun Sayanggkuu
          </h2>
          <div className="space-y-4 opacity-0">
            <p className="text-[#112D4E]/80 text-lg md:text-xl font-medium leading-relaxed">
              Terimaaci buat kamu tahun 2025-2026 ini, terimaaci kamu suda bertahan yaa sayangg. ❤️
            </p>
            <p className="text-[#112D4E]/80 text-base md:text-lg leading-relaxed">
              Adik sekarang sudah 22 tahun, walau suda 22 kamu tetap adik kecil aku. Kamu selalu jadi adik kecil mamas.
              Tahun ini.. Semoga semua yang kamu harapkan dan semua yang kamu cita-cita kan terwujud yaa sayangg.
              Semoga kamu selalu sehat selalu dalam lindungan Allah SWT. Selalu jadi anak yang baik dan berbakti kepada orang tahun
              Semoga sukses selalu, diberi banyak rezekinya dan dilancarkan. AAMIIN. Love youu!! 💗💗💗
            </p>
          </div>
        </div>

        {/* Kolom Kanan: SVG Animasi Line Art Kue */}
        <div className="flex justify-center items-center w-full" ref={svgRef}>
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-w-sm lg:max-w-md mx-auto drop-shadow-sm">
            {/* Base Plate */}
            <path className="cake-path" fill="none" stroke="#3F72AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ willChange: 'stroke-dashoffset' }} d="M 20 160 Q 100 180 180 160" />

            {/* Bottom Tier */}
            <path className="cake-path" fill="none" stroke="#3F72AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ willChange: 'stroke-dashoffset' }} d="M 40 165 L 40 110 Q 100 130 160 110 L 160 165" />
            {/* Bottom Tier Details (Icing) */}
            <path className="cake-path" fill="none" stroke="#3F72AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ willChange: 'stroke-dashoffset' }} d="M 40 110 Q 55 125 70 115 Q 85 125 100 115 Q 115 125 130 115 Q 145 125 160 110" />

            {/* Top Tier */}
            <path className="cake-path" fill="none" stroke="#3F72AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ willChange: 'stroke-dashoffset' }} d="M 60 115 L 60 70 Q 100 85 140 70 L 140 115" />
            {/* Top Tier Details (Icing) */}
            <path className="cake-path" fill="none" stroke="#3F72AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ willChange: 'stroke-dashoffset' }} d="M 60 70 Q 73 80 86 72 Q 100 80 114 72 Q 127 80 140 70" />

            {/* Candle Base */}
            <path className="cake-path" fill="none" stroke="#3F72AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ willChange: 'stroke-dashoffset' }} d="M 95 75 L 95 35 M 105 75 L 105 35 M 95 35 L 105 35" />

            {/* Candle Flame */}
            <path className="cake-path" fill="none" stroke="#3F72AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ willChange: 'stroke-dashoffset' }} d="M 100 35 Q 90 20 100 5 Q 110 20 100 35" />

            {/* Sparkles */}
            <path className="cake-path" fill="none" stroke="#3F72AF" strokeWidth="2" strokeLinecap="round" style={{ willChange: 'stroke-dashoffset' }} d="M 100 -5 L 100 -15 M 115 10 L 125 5 M 85 10 L 75 5 M 110 -5 L 120 -15 M 90 -5 L 80 -15" />
          </svg>
        </div>

      </div>
    </section>
  );
};

export default BirthdayWish;
