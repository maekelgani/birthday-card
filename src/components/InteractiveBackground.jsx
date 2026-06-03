import React, { useEffect, useRef, useState } from 'react';

const InteractiveBackground = () => {
  const bgRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect touch device / mobile to disable parallax
    const mediaQuery = window.matchMedia('(pointer: coarse) or (max-width: 768px)');
    setIsMobile(mediaQuery.matches);

    const handleResize = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handleResize);

    const handleMouseMove = (e) => {
      if (isMobile) return; // Disable parallax on mobile for performance

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPos = (clientX / innerWidth - 0.5) * 2;
      const yPos = (clientY / innerHeight - 0.5) * 2;

      if (bgRef.current) {
        bgRef.current.style.transform = `translate(${xPos * -20}px, ${yPos * -20}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, [isMobile]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#F9F7F7] z-0 pointer-events-none">
      
      {/* Panning Container */}
      <div 
        ref={bgRef} 
        className="absolute inset-[-5%] w-[110%] h-[110%] transition-transform duration-300 ease-out flex items-center justify-center"
      >
        {/* Subtle Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(to right, #112D4E 1px, transparent 1px), linear-gradient(to bottom, #112D4E 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        ></div>

        {/* Hardcoded fine flower sketches SVG */}
        <svg 
          className="absolute opacity-10" 
          width="800" 
          height="800" 
          viewBox="0 0 100 100" 
          fill="none" 
          stroke="#112D4E" 
          strokeWidth="0.2"
        >
          {/* Simple artistic flower outline */}
          <path d="M50 50 C40 30, 20 40, 50 50 C80 40, 60 30, 50 50 C60 70, 80 60, 50 50 C20 60, 40 70, 50 50 Z" />
          <path d="M50 50 Q 50 80 45 100" strokeWidth="0.1" />
          {/* Scattered petals */}
          <path d="M20 20 C15 10, 5 15, 20 20 Z" />
          <path d="M80 80 C85 90, 95 85, 80 80 Z" />
          <path d="M85 25 C90 15, 98 25, 85 25 Z" />
          <path d="M15 85 C10 95, 2 85, 15 85 Z" />
        </svg>
      </div>

      {/* Convex & Blur Effect Overlay */}
      <div className="convex-blur-effect"></div>
    </div>
  );
};

export default InteractiveBackground;
