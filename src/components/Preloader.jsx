import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

const Preloader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const progressCircleRef = useRef(null);
  const orbitRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Kunci scroll saat loading
    document.body.style.overflow = "hidden";

    // 1. Masuk: Blur Reveal (Logo & Lingkaran)
    anime({
      targets: contentRef.current,
      opacity: [0, 1],
      scale: [0.8, 1],
      filter: ['blur(10px)', 'blur(0px)'],
      duration: 600,
      easing: 'easeOutQuart'
    });

    // Rotasi konstan orbit putus-putus
    anime({
      targets: orbitRef.current,
      rotate: 360,
      duration: 12000,
      easing: 'linear',
      loop: true
    });

    // 2. Lingkaran Progres (Stroke Dashoffset)
    anime({
      targets: progressCircleRef.current,
      strokeDashoffset: [289, 0],
      duration: 1800, // durasi loading buatan
      easing: 'easeInOutCubic',
      complete: () => {
        // 3. Keluar: Slide Up Kontainer
        anime({
          targets: containerRef.current,
          translateY: '-100%',
          duration: 900,
          easing: 'easeInOutExpo',
          complete: () => {
            document.body.style.overflow = "";
            setIsVisible(false);
            if (onComplete) onComplete();
          }
        });

        // Memudarkan isi preloader saat slide-up
        anime({
          targets: contentRef.current,
          opacity: [1, 0],
          scale: [1, 0.9],
          filter: ['blur(0px)', 'blur(10px)'],
          duration: 400,
          easing: 'easeInQuart'
        });
      }
    });

  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#FFFFFF] pointer-events-auto">
      <div ref={contentRef} className="relative z-10 flex flex-col items-center gap-8">

        <div className="relative flex items-center justify-center w-36 h-36">

          {/* Dashed Orbit Circle (Berputar) */}
          <svg ref={orbitRef} viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-40 origin-center">
            <circle cx="50" cy="50" r="48" fill="none" stroke="#3F72AF" strokeWidth="0.5" strokeDasharray="2 6" />
          </svg>

          {/* Solid Circle Track */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="46" fill="none" stroke="#DBE2EF" strokeWidth="1" />
            {/* Progress Circle (Berjalan dari kosong ke penuh) */}
            <circle ref={progressCircleRef} cx="50" cy="50" r="46" fill="none" stroke="#112D4E" strokeWidth="1.5" strokeDasharray="289" strokeDashoffset="289" />
          </svg>

          {/* Inner Blur Circle */}
          <div className="absolute inset-3 rounded-full border border-[#DBE2EF]/50 bg-[#F9F7F7]/50 backdrop-blur-md" />

          {/* Logo / Ikon Kenangan */}
          <div className="z-10 text-[#112D4E] font-serif text-4xl font-bold">ㅤ♡ㅤ</div>

        </div>
      </div>
    </div>
  );
};

export default Preloader;
