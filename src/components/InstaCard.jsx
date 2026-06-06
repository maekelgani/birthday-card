import React, { useState, useRef } from 'react';
import anime from 'animejs';

const InstaCard = ({ imageSrc, username, date, caption }) => {
  const [isLiked, setIsLiked] = useState(false);
  const heartIconRef = useRef(null);
  const particlesContainerRef = useRef(null);

  const handleLike = () => {
    // Jika sudah di-like, bisa di-unlike (tanpa partikel), atau mau permanen?
    // Kita asumsikan bisa di toggle, tapi animasi partikel hanya saat "like"
    const willBeLiked = !isLiked;
    setIsLiked(willBeLiked);

    if (willBeLiked && heartIconRef.current) {
      // 1. Heartbeat Pop Animation
      anime({
        targets: heartIconRef.current,
        scale: [1, 1.6, 1],
        duration: 600,
        easing: 'spring(1, 80, 10, 0)'
      });

      // 2. Micro Particles Burst
      if (particlesContainerRef.current) {
        const particleCount = 5;
        const colors = ['#3F72AF', '#DBE2EF', '#112D4E'];
        
        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement('div');
          particle.classList.add('absolute', 'w-1.5', 'h-1.5', 'rounded-full');
          particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
          // Posisikan di tengah
          particle.style.top = '50%';
          particle.style.left = '50%';
          particle.style.marginTop = '-3px';
          particle.style.marginLeft = '-3px';
          
          particlesContainerRef.current.appendChild(particle);

          const angle = Math.random() * Math.PI * 2;
          const velocity = 25 + Math.random() * 15;

          anime({
            targets: particle,
            translateX: Math.cos(angle) * velocity,
            translateY: Math.sin(angle) * velocity,
            scale: [0.5, 1.2, 0],
            opacity: [1, 0],
            duration: 800 + Math.random() * 400,
            easing: 'easeOutExpo',
            complete: () => {
              if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
              }
            }
          });
        }
      }
    }
  };

  return (
    <div className="w-[320px] md:w-[380px] shrink-0 bg-[#FFFFFF] rounded-xl shadow-md border border-[#DBE2EF] overflow-hidden flex flex-col font-sans select-none relative">
      
      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b border-[#DBE2EF]/50">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#3F72AF] to-[#DBE2EF] p-[2px]">
          <div className="w-full h-full rounded-full bg-white border border-white">
            <img src={imageSrc} alt="avatar" loading="lazy" decoding="async" className="w-full h-full rounded-full object-cover" />
          </div>
        </div>
        <div className="ml-3 flex flex-col">
          <span className="text-[#112D4E] font-bold text-sm leading-none">{username}</span>
          <span className="text-[#112D4E]/50 text-xs mt-1 leading-none">{date}</span>
        </div>
        <div className="ml-auto text-[#112D4E] font-bold tracking-widest text-lg cursor-pointer">
          ...
        </div>
      </div>

      {/* Media */}
      <div className="w-full aspect-square bg-[#F9F7F7] relative overflow-hidden group">
        <img 
          src={imageSrc} 
          alt="Post media" 
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
      </div>

      {/* Action Bar */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Like Button */}
          <div className="relative cursor-pointer" onClick={handleLike}>
            <div ref={particlesContainerRef} className="absolute inset-0 pointer-events-none z-10" />
            <svg 
              ref={heartIconRef}
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              className={`w-7 h-7 transition-colors duration-200 ${isLiked ? 'fill-[#3F72AF] stroke-[#3F72AF]' : 'fill-transparent stroke-[#112D4E] hover:stroke-[#3F72AF]'}`}
              strokeWidth="2"
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </div>
          
          {/* Comment Icon (Decorative) */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 stroke-[#112D4E] cursor-pointer hover:stroke-[#3F72AF] transition-colors">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
          
          {/* Send/Message Icon (Decorative) */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 stroke-[#112D4E] cursor-pointer hover:stroke-[#3F72AF] transition-colors">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </div>
        
        {/* Save Icon (Decorative) */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 stroke-[#112D4E] cursor-pointer hover:stroke-[#3F72AF] transition-colors">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
      </div>

      {/* Caption */}
      <div className="px-4 pb-4">
        <p className="text-sm text-[#112D4E]">
          <span className="font-bold mr-2">{username}</span>
          {caption}
        </p>
      </div>
    </div>
  );
};

export default InstaCard;
