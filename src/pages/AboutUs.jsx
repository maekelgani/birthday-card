import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import anime from 'animejs';

const polaroidData = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1516589178581-6cd78536f115?w=500&q=80',
    caption: 'Best day ever 💖',
    rotate: '-rotate-3',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=500&q=80',
    caption: 'Just the two of us ✨',
    rotate: 'rotate-2',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1518599904199-0ca897819ddb?w=500&q=80',
    caption: 'Aesthetic moments 📸',
    rotate: '-rotate-6',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=500&q=80',
    caption: 'My favorite smile',
    rotate: 'rotate-4',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1517404215738-15263e9f9178?w=500&q=80',
    caption: 'Forever & Always',
    rotate: '-rotate-2',
  }
];

const AboutUs = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Animasi Blur Reveal dengan IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: entry.target,
              opacity: [0, 1],
              filter: ['blur(10px)', 'blur(0px)'],
              translateY: [30, 0],
              duration: 1000,
              easing: 'easeOutQuart'
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el) => {
      // Set state awal sebelum dianimasikan
      el.style.opacity = '0';
      el.style.filter = 'blur(10px)';
      el.style.transform = 'translateY(30px)';
      observer.observe(el);
    });

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-[#F9F7F7] text-[#112D4E] overflow-hidden relative">

      {/* Tombol Kembali ke Beranda */}
      <div className="absolute top-6 left-6 z-50">
        <Link to="/main" className="inline-flex items-center gap-2 text-[#3F72AF] font-sans font-medium hover:text-[#112D4E] transition-colors bg-white/50 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-[#DBE2EF]/50">
          <span>&larr;</span> Kembali
        </Link>
      </div>

      {/* SECTION A: THE TYPOGRAPHY HERO */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 py-20 text-center relative z-10">
        <div className="reveal-on-scroll flex flex-col items-center max-w-5xl mx-auto space-y-8">

          {/* Badge */}
          <span className="inline-block px-6 py-2 bg-[#DBE2EF] text-[#3F72AF] font-sans font-bold tracking-widest uppercase text-sm rounded-full shadow-sm">
            Since 07-07-2023
          </span>

          {/* Hero Names */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-black text-[#112D4E] leading-[1.1] tracking-tight">
            Maekel Mahdi Firman Gani <br className="hidden md:block" />
            <span className="text-[#3F72AF]">&</span> <br className="hidden md:block" />
            Anissya Putri Maharani
          </h1>

          {/* Romantic Quote */}
          <blockquote className="font-serif italic text-xl md:text-2xl text-[#112D4E]/70 max-w-2xl mt-6">
            "Kisah kita adalah kanvas kosong yang terus kita lukisi dengan memori, warna, dan canda tawa, selamanya."
          </blockquote>
        </div>
      </section>


      {/* SECTION B: THE SCRAPBOOK GALLERY */}
      <section className="w-full py-20 md:py-32 px-6 md:px-16 bg-[#DBE2EF]/30 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 reveal-on-scroll">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#112D4E]">Kepingan Memori</h2>
            <p className="font-sans text-[#3F72AF] mt-4 font-medium">Halaman-halaman dari buku cerita kita.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {polaroidData.map((item) => (
              <div
                key={item.id}
                className={`reveal-on-scroll relative group transition-all duration-300 ease-out cursor-pointer ${item.rotate} hover:rotate-0 hover:scale-110 hover:z-50 hover:shadow-2xl`}
              >
                {/* Masking Tape (Selotip) */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#DBE2EF]/70 backdrop-blur-sm shadow-sm rotate-[-2deg] z-10 border border-white/20" />

                {/* Polaroid Frame */}
                <div className="bg-[#FFFFFF] p-3 pb-12 shadow-md w-64 md:w-72 relative border border-[#112D4E]/5">
                  <div className="w-full aspect-square overflow-hidden bg-gray-100 relative">
                    <img
                      src={item.src}
                      alt="Polaroid Memory"
                      loading="lazy"
                      className="w-full h-full object-cover grayscale-[30%] contrast-125 sepia-[20%] group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  {/* Handwritten Caption */}
                  <div className="absolute bottom-3 left-0 w-full text-center">
                    <span
                      className="text-2xl text-[#112D4E] opacity-90"
                      style={{ fontFamily: "'Caveat', cursive" }}
                    >
                      {item.caption}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION C: DECORATIVE MUSIC VINYL */}
      <section className="w-full py-20 md:py-32 px-4 md:px-6 flex flex-col items-center justify-center bg-[#F9F7F7] overflow-hidden">
        <div className="reveal-on-scroll text-center mb-16">
          <h2 className="font-serif text-4xl font-bold text-[#112D4E]">Melodi Kita</h2>
        </div>

        <div className="reveal-on-scroll grid grid-cols-2 gap-4 md:gap-16 w-full max-w-5xl justify-items-center">

          {/* Vinyl 1: Pilihan Gani */}
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 md:w-64 md:h-64 flex justify-center items-center">
              {/* Vinyl Record */}
              <div className="absolute right-[-30%] md:right-[-40%] top-[10%] w-[85%] h-[85%] bg-zinc-900 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center animate-[spin_4s_linear_infinite] border-2 md:border-4 border-zinc-800">
                <div className="w-3/4 h-3/4 rounded-full border border-zinc-700/50 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 rounded-full border border-zinc-700/50 flex items-center justify-center">
                    <div className="w-1/2 h-1/2 rounded-full bg-[#112D4E] flex items-center justify-center border border-white/10 shadow-inner">
                      <div className="w-2 h-2 md:w-4 md:h-4 bg-[#F9F7F7] rounded-full shadow-inner"></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Album Cover */}
              <div className="absolute inset-0 w-full h-full bg-white shadow-xl md:shadow-2xl z-10 overflow-hidden border border-[#DBE2EF] flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500&q=80"
                  alt="Album Pilihan Gani"
                  loading="lazy"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#112D4E]/40 to-transparent mix-blend-multiply pointer-events-none"></div>
              </div>
            </div>
            <div className="mt-6 md:mt-10 text-center">
              <p className="font-sans font-bold text-sm md:text-lg text-[#112D4E]">Pilihan Gani</p>
              <p className="font-sans text-[#3F72AF] mt-1" style={{ fontFamily: "'Caveat', cursive", fontSize: '1.2rem' }}>Classic Vibes</p>
            </div>
          </div>

          {/* Vinyl 2: Pilihan Nisa */}
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 md:w-64 md:h-64 flex justify-center items-center">
              {/* Vinyl Record */}
              <div className="absolute right-[-30%] md:right-[-40%] top-[10%] w-[85%] h-[85%] bg-zinc-900 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center animate-[spin_4s_linear_infinite] border-2 md:border-4 border-zinc-800" style={{ animationDelay: '-2s' }}>
                <div className="w-3/4 h-3/4 rounded-full border border-zinc-700/50 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 rounded-full border border-zinc-700/50 flex items-center justify-center">
                    <div className="w-1/2 h-1/2 rounded-full bg-[#3F72AF] flex items-center justify-center border border-white/10 shadow-inner">
                      <div className="w-2 h-2 md:w-4 md:h-4 bg-[#F9F7F7] rounded-full shadow-inner"></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Album Cover */}
              <div className="absolute inset-0 w-full h-full bg-white shadow-xl md:shadow-2xl z-10 overflow-hidden border border-[#DBE2EF] flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80"
                  alt="Album Pilihan Nisa"
                  loading="lazy"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#3F72AF]/40 to-transparent mix-blend-multiply pointer-events-none"></div>
              </div>
            </div>
            <div className="mt-6 md:mt-10 text-center">
              <p className="font-sans font-bold text-sm md:text-lg text-[#112D4E]">Pilihan Nisa</p>
              <p className="font-sans text-[#3F72AF] mt-1" style={{ fontFamily: "'Caveat', cursive", fontSize: '1.2rem' }}>Aesthetic Pop</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default AboutUs;
