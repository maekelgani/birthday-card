import React, { useEffect, useRef } from 'react';
import InstaCard from './InstaCard';
import BlurReveal from './BlurReveal';
import anime from 'animejs';

const HorizontalGallery = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  const posts = [
    {
      id: 1,
      imageSrc: "igPost (1).jpg",
      username: "kenang.kenangan",
      date: "07 Jun 2023",
      caption: "Semua kengangan kita dalam satu frame"
    },
    {
      id: 2,
      imageSrc: "igPost (2).jpg",
      username: "kenang.kenangan",
      date: "07 Jun 2023",
      caption: "Semua kengangan kita dalam satu frame"
    },
    {
      id: 3,
      imageSrc: "igPost (3).jpg",
      username: "kenang.kenangan",
      date: "07 Jun 2023",
      caption: "Semua kengangan kita dalam satu frame"
    },
    {
      id: 4,
      imageSrc: "igPost (4).jpg ",
      username: "kenang.kenangan",
      date: "07 Jun 2023",
      caption: "Semua kengangan kita dalam satu frame"
    },
    {
      id: 5,
      imageSrc: "igPost (5).jpg",
      username: "kenang.kenangan",
      date: "07 Jun 2023",
      caption: "Semua kengangan kita dalam satu frame"
    },
    {
      id: 6,
      imageSrc: "igPost (6).jpg",
      username: "kenang.kenangan",
      date: "07 Jun 2023",
      caption: "Semua kengangan kita dalam satu frame"
    },
    {
      id: 7,
      imageSrc: "carousel (1).png",
      username: "kenang.kenangan",
      date: "07 Jun 2023",
      caption: "Semua kengangan kita dalam satu frame"
    },
    {
      id: 8,
      imageSrc: "carousel (2).jpg",
      username: "kenang.kenangan",
      date: "07 Jun 2023",
      caption: "Semua kengangan kita dalam satu frame"
    },
    {
      id: 9,
      imageSrc: "carousel (3).jpg",
      username: "kenang.kenangan",
      date: "07 Jun 2023",
      caption: "Semua kengangan kita dalam satu frame"
    },
    {
      id: 10,
      imageSrc: "carousel (4).jpg",
      username: "kenang.kenangan",
      date: "07 Jun 2023",
      caption: "Semua kengangan kita dalam satu frame"
    },
    {
      id: 11,
      imageSrc: "carousel (5).jpg",
      username: "kenang.kenangan",
      date: "07 Jun 2023",
      caption: "Semua kengangan kita dalam satu frame"
    },
    {
      id: 12,
      imageSrc: "carousel (6).jpg",
      username: "kenang.kenangan",
      date: "07 Jun 2023",
      caption: "Semua kengangan kita dalam satu frame"
    },
    {
      id: 13,
      imageSrc: "carousel (7).jpg",
      username: "kenang.kenangan",
      date: "07 Jun 2023",
      caption: "Semua kengangan kita dalam satu frame"
    },
    {
      id: 14,
      imageSrc: "carousel (8).jpg",
      username: "kenang.kenangan",
      date: "07 Jun 2023",
      caption: "Semua kengangan kita dalam satu frame"
    },
    {
      id: 15,
      imageSrc: "carousel (9).jpg",
      username: "kenang.kenangan",
      date: "07 Jun 2023",
      caption: "Semua kengangan kita dalam satu frame"
    },
    {
      id: 16,
      imageSrc: "carousel (10).jpg",
      username: "kenang.kenangan",
      date: "07 Jun 2023",
      caption: "Semua kengangan kita dalam satu frame"
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

    // Intersection Observer untuk animasi masuk (Entrance Animation) tiap kartu
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Mainkan animasi saat kartu terlihat di layar (horizontal scroll)
          anime({
            targets: entry.target,
            translateY: [anime.random(-200, 200), 0],
            rotate: [anime.random(-20, 20), 0],
            opacity: [0, 1],
            duration: 1200,
            easing: 'easeOutElastic(1, .8)'
          });
          // Hentikan pemantauan setelah animasi dijalankan
          observer.unobserve(entry.target);
        }
      });
    }, { root: null, threshold: 0.1 });

    const cards = document.querySelectorAll('.gallery-card');
    cards.forEach(card => observer.observe(card));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
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
            <div key={post.id} className="gallery-card opacity-0 will-change-[transform,opacity]">
              <InstaCard {...post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HorizontalGallery;
