import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const Hero = () => {
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const contentWrapperRef = useRef(null);

  const sliderImages = [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=60",
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=400&q=60",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=60",
    "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=400&q=60",
    "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=400&q=60",
    "https://images.unsplash.com/photo-1502444330042-d1a1ddf9bb5b?auto=format&fit=crop&w=400&q=60"
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
        delay: anime.stagger(200, { start: 500 }),
        duration: 1500,
        easing: 'easeOutQuart'
      });
    }

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
      {/* Pembungkus Konten Animasi Scroll (Opacity, Scale, Blur) */}
      <div ref={contentWrapperRef} className="max-w-7xl mx-auto w-full h-full px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10 will-change-[opacity,transform,filter] pt-20">

        {/* Left Column: Typography */}
        <div className="flex flex-col justify-center space-y-6" ref={textRef}>
          <h1 className="font-sans text-6xl md:text-8xl font-extrabold leading-tight text-[#112D4E] tracking-tight">
            <span className="word inline-block mr-4">Selamat</span><br />
            <span className="word inline-block text-[#3F72AF] mr-4">Ulang</span>
            <span className="word inline-block">Tahun</span>
          </h1>
          <p className="word text-[#3F72AF] text-lg md:text-xl font-sans max-w-md font-medium leading-relaxed opacity-80">
            Perjalanan waktu yang terus berjalan, merajut memori dalam keabadian cerita kita.
          </p>
        </div>

        {/* Right Column: 2 Counter-Moving Image Sub-columns */}
        <div className="hidden md:flex h-[90vh] overflow-hidden justify-end gap-6 relative" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}>

          {/* Sub-column 1: Moving UP */}
          <div className="w-[220px] h-full relative">
            <div className="flex flex-col gap-4 animate-moveVerticalUp w-full">
              {duplicateImages.map((src, index) => (
                <div key={index} className="w-full aspect-[3/4] shrink-0 relative overflow-hidden rounded-[2rem] border border-[#DBE2EF]/50">
                  <img src={src} alt="Memory Slider Up" loading={index > 1 ? "lazy" : "eager"} decoding="async" className="w-full h-full object-cover object-center grayscale contrast-[1.08] brightness-[0.8] hover:grayscale-0 hover:contrast-100 hover:brightness-100 transition-all duration-700" />
                </div>
              ))}
            </div>
          </div>

          {/* Sub-column 2: Moving DOWN */}
          <div className="w-[220px] h-full relative">
            <div className="flex flex-col gap-4 animate-moveVerticalDown w-full">
              {duplicateImages.map((src, index) => (
                <div key={index} className="w-full aspect-[3/4] shrink-0 relative overflow-hidden rounded-[2rem] border border-[#DBE2EF]/50">
                  <img src={src} alt="Memory Slider Down" loading={index > 1 ? "lazy" : "eager"} decoding="async" className="w-full h-full object-cover object-center grayscale contrast-[1.08] brightness-[0.8] hover:grayscale-0 hover:contrast-100 hover:brightness-100 transition-all duration-700" />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
