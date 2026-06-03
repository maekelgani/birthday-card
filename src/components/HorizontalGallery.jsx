import React, { useEffect, useRef } from 'react';
import InstaCard from './InstaCard';
import BlurReveal from './BlurReveal';

const HorizontalGallery = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  const posts = [
    {
      id: 1,
      imageSrc: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      username: "kenang.kenangan",
      date: "07 Jul 2023",
      caption: "Awal perjalanan kita. Senyum pertama yang tak akan pernah kulupa."
    },
    {
      id: 2,
      imageSrc: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80",
      username: "kenang.kenangan",
      date: "14 Agu 2024",
      caption: "Menelusuri sudut kota yang asing, namun terasa familiar bersamamu."
    },
    {
      id: 3,
      imageSrc: "https://images.unsplash.com/photo-1520113412461-12c852924b17?auto=format&fit=crop&w=800&q=80",
      username: "kenang.kenangan",
      date: "22 Sep 2025",
      caption: "Banyak hal berubah, tapi rasa ini tetap sama, bahkan bertumbuh."
    },
    {
      id: 4,
      imageSrc: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
      username: "kenang.kenangan",
      date: "01 Nov 2026",
      caption: "Dan kita akan terus melangkah. Hari ini, besok, dan selamanya."
    },
    {
      id: 5,
      imageSrc: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80",
      username: "kenang.kenangan",
      date: "31 Des 2026",
      caption: "Semesta menjadi saksi atas setiap tawa yang kita bagi."
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !trackRef.current) return;
      
      const container = containerRef.current;
      const track = trackRef.current;
      
      // Ambil posisi kontainer relatif terhadap viewport
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Total jarak scroll yang tersedia di dalam container ini
      // Kurangi 1 viewport tinggi agar titik akhir pas di ujung container
      const totalScrollDistance = container.offsetHeight - viewportHeight;
      
      // Seberapa jauh kita telah scroll ke dalam container ini (0 = pas mulai terlihat sticky, totalScrollDistance = di akhir sticky)
      let scrolledPixels = -rect.top;
      
      // Clamp nilai antara 0 dan totalScrollDistance
      scrolledPixels = Math.max(0, Math.min(scrolledPixels, totalScrollDistance));
      
      // Persentase scroll (0.0 ke 1.0)
      const scrollPercentage = scrolledPixels / totalScrollDistance;
      
      // Hitung maksimal pergeseran horizontal (panjang track dikurangi lebar viewport)
      const maxTranslateX = track.scrollWidth - window.innerWidth;
      
      // Pergeseran nyata
      const currentTranslateX = -(maxTranslateX * scrollPercentage);
      
      // Terapkan translasi ke track
      track.style.transform = `translateX(${currentTranslateX}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Panggil sekali saat mount untuk setup awal
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    // Wrapper h-[300vh] memberikan ruang scroll vertikal ekstra
    <section ref={containerRef} className="relative w-full h-[300vh] bg-[#F9F7F7]">
      {/* Sticky Container yang mengunci di layar selama scroll vertikal berlangsung */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center border-y border-[#DBE2EF]">
        
        <div className="absolute top-10 md:top-20 w-full px-6 md:px-16 flex justify-between items-end z-10 pointer-events-none">
          <BlurReveal>
            <h2 className="text-3xl md:text-5xl font-black font-sans tracking-tight text-[#112D4E] uppercase">
              Galeri Memori
            </h2>
            <p className="text-[#3F72AF] font-medium font-sans mt-2">Gulir untuk menelusuri kenangan kita</p>
          </BlurReveal>
          
          <BlurReveal delay={200}>
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#112D4E]/40 hidden md:block">
              HORIZONTAL SCROLL
            </div>
          </BlurReveal>
        </div>

        {/* Track Horisontal yang digerakkan oleh Scroll Vertikal */}
        <div ref={trackRef} className="flex gap-8 px-6 md:px-[10vw] w-max will-change-transform mt-10">
          {posts.map((post) => (
            <InstaCard key={post.id} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HorizontalGallery;
