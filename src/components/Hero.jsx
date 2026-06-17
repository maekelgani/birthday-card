import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const Hero = () => {
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const contentWrapperRef = useRef(null);

  const sliderImages = [
    "/HeroPict-1 (1).jpg",
    "/HeroPict-1 (2).jpg",
    "/HeroPict-1 (3).jpg",
    "/HeroPict-1 (4).jpg",
    "/HeroPict-1 (5).jpg",
    "/HeroPict-1 (6).jpg"
  ];

  const duplicateImages = [...sliderImages, ...sliderImages];

  useEffect(() => {
    // Initial Text Animasi
    if (textRef.current) {
      const words = textRef.current.querySelectorAll('.word');

      anime.set(words, {
        opacity: 0,
        filter: 'blur(10px)',
        translateY: 20
      });

      anime({
        targets: words,
        opacity: 1,
        filter: 'blur(0px)',
        translateY: 0,
        delay: anime.stagger(200, { start: 300 }),
        duration: 1200,
        easing: 'easeOutQuart'
      });
    }

    // Animasi SVG Noodle Heart
    anime({
      targets: '.noodle-path',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 3000,
      direction: 'alternate',
      loop: true
    });

    // Scroll Logic for Sticky Fade & Blur
    const handleScroll = () => {
      if (!contentWrapperRef.current) return;

      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight; // Kapan efek memudar penuh

      // Hitung persentase scroll (0 ke 1)
      let progress = scrollY / maxScroll;
      if (progress > 1) progress = 1;
      if (progress < 0) progress = 0;

      // Transformasi Nilai
      const opacity = 1 - progress; // 1 ke 0
      const scale = 1 - (progress * 0.06); // 1 ke 0.94
      const blurValue = progress * 10; // 0px ke 10px

      // Menerapkan langsung ke elemen DOM untuk performa tinggi
      contentWrapperRef.current.style.opacity = opacity;
      contentWrapperRef.current.style.transform = `scale(${scale})`;
      contentWrapperRef.current.style.filter = `blur(${blurValue}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={containerRef} className="sticky top-0 w-full h-screen overflow-hidden flex items-center z-10 bg-transparent">
      {/* Galeri Gambar: Absolute Right (Meniru Kintaro) */}
      <div className="hidden md:flex absolute top-0 right-6 sm:right-12 md:right-16 lg:right-24 xl:right-36 2xl:right-48 bottom-0 h-full w-55 sm:w-65 md:w-85 lg:w-100 xl:w-110 2xl:w-120 gap-3 sm:gap-4 px-2 overflow-hidden z-0 pointer-events-none select-none opacity-30 mix-blend-luminosity" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}>
        {/* Sub-column 1: Moving UP */}
        <div className="flex-1 h-full relative overflow-hidden">
          <div className="flex flex-col gap-3 sm:gap-4 pt-4 animate-moveVerticalUp w-full">
            {duplicateImages.map((src, index) => (
              <div key={index} className="w-full aspect-[3/4] shrink-0 relative overflow-hidden rounded-[2rem] border border-[#DBE2EF]/50">
                <img src={src} alt="Memory Slider Up" loading={index > 1 ? "lazy" : "eager"} decoding="async" className="w-full h-full object-cover object-center grayscale contrast-[1.08] brightness-[0.8] hover:grayscale-0 hover:contrast-100 hover:brightness-100 transition-all duration-700" />
              </div>
            ))}
          </div>
        </div>

        {/* Sub-column 2: Moving DOWN */}
        <div className="flex-1 h-full relative overflow-hidden mt-10">
          <div className="flex flex-col gap-3 sm:gap-4 pt-4 animate-moveVerticalDown w-full">
            {duplicateImages.map((src, index) => (
              <div key={index} className="w-full aspect-[3/4] shrink-0 relative overflow-hidden rounded-[2rem] border border-[#DBE2EF]/50">
                <img src={src} alt="Memory Slider Down" loading={index > 1 ? "lazy" : "eager"} decoding="async" className="w-full h-full object-cover object-center grayscale contrast-[1.08] brightness-[0.8] hover:grayscale-0 hover:contrast-100 hover:brightness-100 transition-all duration-700" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pembungkus Konten Animasi Scroll (Opacity, Scale, Blur) */}
      <div ref={contentWrapperRef} className="w-full h-full px-6 md:px-16 pt-28 pb-12 sm:pt-32 sm:pb-16 2xl:pb-24 relative z-10 will-change-[opacity,transform,filter] flex flex-col justify-center mix-blend-difference">

        {/* Noodle Love Stroke Animation (Hanya muncul di Mobile) */}
        <div className="absolute top-[10%] right-[-10%] md:hidden opacity-40 z-0 pointer-events-none w-[200px] h-[200px] rotate-[-15deg]">
          <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#3F72AF] fill-none stroke-[2] drop-shadow-md">
            <path
              className="noodle-path"
              d="M50 88 C 50 88, 10 65, 10 35 C 10 15, 30 10, 50 30 C 70 10, 90 15, 90 35 C 90 65, 50 88, 50 88 Z"
              strokeDasharray="300"
              strokeDashoffset="300"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Typography */}
        <div className="flex flex-col gap-6 sm:gap-12 xl:gap-16 justify-center w-full relative z-10" ref={textRef}>
          <div className="overflow-hidden">
            <h1 className="font-sans text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[140px] font-black tracking-tighter leading-[0.85] uppercase whitespace-nowrap text-[#112D4E]">
              <span className="word inline-block">Selamat</span><br />
              <span className="word inline-block text-[#3F72AF]">Ulang</span><br />
              <span className="word inline-block text-[#112D4E]/80">Tahun</span>
            </h1>
          </div>
          <p className="word text-[#3F72AF] sm:text-lg 2xl:text-xl font-sans font-light leading-relaxed max-w-xl pr-4">
            Perjalanan waktu yang terus berjalan, merajut memori dalam keabadian cerita kita.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
