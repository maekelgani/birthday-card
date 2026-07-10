import React from 'react';

const CurvedCarousel = () => {
  const images = [
    "carousel (1).webp",
    "carousel (2).webp",
    "carousel (3).webp",
    "carousel (4).webp",
    "carousel (5).webp",
    "carousel (6).webp",
    "carousel (7).webp",
    "carousel (8).webp",
    "carousel (9).webp",
    "carousel (10).webp",
  ];

  // Duplikat 4 kali agar transisi translateX(-50%) super panjang dan mulus tanpa putus
  const loopingImages = [...images, ...images, ...images, ...images];

  return (
    <div className="w-full bg-[#FFFFFF] py-6 md:py-8 overflow-hidden flex items-center relative">
      <div className="flex w-max animate-marqueeRight gap-6 px-3">
        {loopingImages.map((src, index) => (
          <div
            key={index}
            className="w-[200px] h-[280px] md:w-[260px] md:h-[340px] shrink-0 bg-[#F9F7F7] shadow-sm border border-[#DBE2EF] rounded-3xl overflow-hidden"
          >
            <img
              src={src}
              alt={`Kenangan Horizontal ${index + 1}`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurvedCarousel;
