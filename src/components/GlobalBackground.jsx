import React from 'react';
import InteractiveParticles from './InteractiveParticles';

const GlobalBackground = () => {
  return (
    <>
      {/* Latar Belakang Utama Berupa Grid */}
      <div className="fixed inset-0 z-[-3] bg-[#FFFFFF] bg-grid-pattern pointer-events-none"></div>
      
      {/* Radial Gradient untuk Efek Cembung Fisheye */}
      <div className="fixed inset-0 z-[-2] convex-overlay pointer-events-none"></div>
      
      {/* Partikel Ditempatkan Di Antara Background dan Konten agar Terlihat */}
      <InteractiveParticles />
      
      {/* Edge Blur Vignette */}
      <div className="edge-blur-overlay"></div>
    </>
  );
};

export default GlobalBackground;
