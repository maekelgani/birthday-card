import React from 'react';

const CurvedCarousel = () => {
  const images = [
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=60",
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=60",
    "https://images.unsplash.com/photo-1520113412461-12c852924b17?auto=format&fit=crop&w=600&q=60",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=60",
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=60",
    "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=60",
    "https://images.unsplash.com/photo-1506744626753-2fea104b826f?auto=format&fit=crop&w=600&q=60",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=60",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=60",
    "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600&q=60",
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
