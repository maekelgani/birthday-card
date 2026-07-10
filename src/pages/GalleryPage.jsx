import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import anime from 'animejs';

const GalleryPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    anime({
      targets: '.gallery-item',
      opacity: [0, 1],
      translateY: [30, 0],
      delay: anime.stagger(100),
      duration: 800,
      easing: 'easeOutExpo'
    });
  }, []);

  // Placeholders from unsplash with romantic/aesthetic vibe
  const images = [
    "miniGal (2).webp",
    "miniGal (1).webp",
    "miniGal (3).webp",
    "gallery (1).webp",
    "gallery (2).webp",
    "gallery (3).webp",
  ];

  return (
    <div className="min-h-screen py-24 px-4 max-w-6xl mx-auto z-10 relative">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#112D4E] mb-8">Kenangan Kita</h1>
        <button
          onClick={() => navigate('/main')}
          className="px-8 py-3 bg-white/70 backdrop-blur-md border border-[#3F72AF]/30 text-[#3F72AF] rounded-full hover:bg-[#3F72AF] hover:text-white transition-colors duration-300 shadow-[0_4px_15px_rgba(63,114,175,0.15)] font-medium"
        >
          &larr; Kembali
        </button>
      </div>

      <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
        {images.map((src, idx) => (
          <div key={idx} className="gallery-item opacity-0 break-inside-avoid">
            <div className="rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(17,45,78,0.1)] hover:shadow-[0_12px_40px_rgba(63,114,175,0.2)] transition-shadow duration-300">
              <img
                src={src}
                alt={`Kenangan ${idx + 1}`}
                className="w-full h-auto hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
