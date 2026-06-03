import React from 'react';

const ManifestoTicker = () => {
  const manifestoText = "HARI SPESIAL UNTUKMU • SEMOGA PANJANG UMUR • SELALU BAHAGIA • MENCAPAI IMPIAN • ";
  const repeatCount = 8; // Pastikan teks cukup panjang agar -50% translateX berjalan mulus

  return (
    <div className="w-full bg-[#FFFFFF] py-6 md:py-10 border-y border-[#DBE2EF] overflow-hidden flex items-center">
      {/* 
        Satu kontainer panjang yang memuat banyak elemen sekaligus. 
        Animasi marqueeLeft (-50%) di index.css akan melakukan looping mulus.
      */}
      <div className="whitespace-nowrap animate-marqueeLeft flex w-max">
        {[...Array(repeatCount)].map((_, i) => (
          <span
            key={i}
            className="text-4xl md:text-7xl font-sans font-extrabold tracking-widest px-4"
          >
            {manifestoText}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ManifestoTicker;
