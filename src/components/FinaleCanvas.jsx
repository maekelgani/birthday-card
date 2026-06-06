import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Fungsi untuk menghasilkan SVG Data URI berbentuk Hati yang sangat ringan (beban kinerja 0)
// Mendukung inject warna
const createHeartSVG = (color) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" stroke="${color}" stroke-width="1"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

const FinaleCanvas = ({ isVisible }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    if (!isVisible || !containerRef.current || !canvasRef.current) return;

    console.log("Finale Triggered: Mulai memutar GSAP");

    // Mencegah scroll ketika finale muncul
    document.body.style.overflow = "hidden";

    // 1. Animasi Slide-Up Container
    gsap.fromTo(containerRef.current,
      { yPercent: 100 },
      { yPercent: 0, duration: 2, ease: "power4.inOut" }
    );

    // 2. Persiapan Canvas & GSAP Logic
    const c = canvasRef.current;
    const ctx = c.getContext("2d");
    let cw = (c.width = window.innerWidth);
    let ch = (c.height = window.innerHeight);
    let radius = Math.max(cw, ch);
    const particles = Array(99);

    // Palet warna warni ceria untuk bentuk hati
    const colors = ['#e63946', '#ffb5a7', '#3F72AF', '#DBE2EF', '#ffffff'];

    for (let i = 0; i < particles.length; i++) {
      particles[i] = {
        x: 0,
        y: 0,
        scale: 0,
        rotate: 0,
        img: new Image()
      };
      // Assign gambar hati dengan warna acak dari palet
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      particles[i].img.src = createHeartSVG(randomColor);
    }

    const draw = () => {
      particles.sort((a, b) => a.scale - b.scale); // Urutkan berdasarkan scale untuk z-indexing  
      ctx.clearRect(0, 0, cw, ch);
      particles.forEach((p) => {
        const size = 24 * p.scale * 2.5;
        // Pencegahan Error: Jika ukuran terlalu kecil atau 0, jangan digambar
        if (size <= 0.1) return;

        ctx.translate(cw / 2, ch / 2);
        ctx.rotate(p.rotate);

        // Centering gambar
        ctx.drawImage(
          p.img,
          p.x - size / 2,
          p.y - size / 2,
          size,
          size
        );
        ctx.resetTransform();
      });
    };

    // GSAP Timeline untuk efek vortex / pusaran
    tlRef.current = gsap.timeline({ onUpdate: draw })
      .fromTo(particles, {
        x: (i) => {
          const angle = (i / particles.length * Math.PI * 2) - Math.PI / 2;
          return Math.cos(angle * 10) * radius;
        },
        y: (i) => {
          const angle = (i / particles.length * Math.PI * 2) - Math.PI / 2;
          return Math.sin(angle * 10) * radius;
        },
        scale: 2.5,
        rotate: 0
      }, {
        duration: 5,
        ease: "sine",
        x: 0,
        y: 0,
        scale: 0,
        rotate: -3,
        stagger: { each: -0.05, repeat: -1 }
      }, 0)
      .seek(99);

    // Handle Resize
    const handleResize = () => {
      cw = c.width = window.innerWidth;
      ch = c.height = window.innerHeight;
      radius = Math.max(cw, ch);
      if (tlRef.current) tlRef.current.invalidate();
    };
    window.addEventListener("resize", handleResize);

    // Handle Jeda / Pause saat layar ditekan
    const handlePointerUp = () => {
      if (tlRef.current) {
        gsap.to(tlRef.current, {
          timeScale: tlRef.current.isActive() ? 0 : 1
        });
      }
    };
    c.addEventListener('pointerup', handlePointerUp);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      c.removeEventListener('pointerup', handlePointerUp);
      if (tlRef.current) tlRef.current.kill();
      document.body.style.overflow = "";
    };

  }, [isVisible]);

  // Jika belum dipanggil, tetap render wadahnya namun di luar layar (hidden)
  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#0E100F] flex items-center justify-center pointer-events-auto"
    >
      <canvas ref={canvasRef} className="w-full h-full block cursor-pointer"></canvas>

      {/* Overlay Teks Penutup */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <h1 className="text-white font-serif italic text-4xl md:text-6xl font-bold opacity-80 mix-blend-difference drop-shadow-2xl text-center px-4 leading-tight">
          Dan Cerita Ini <br /> <span className="text-white">Akan Terus Berlanjut...</span>
        </h1>
        <p className="text-white/40 mt-8 text-xs md:text-sm tracking-widest uppercase font-sans animate-pulse">
          Ketuk Layar Untuk Menjeda/Memutar
        </p>
      </div>
    </div>
  );
};

export default FinaleCanvas;
