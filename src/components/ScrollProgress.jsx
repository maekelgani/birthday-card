import React, { useEffect, useState } from 'react';

const ScrollProgress = () => {
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      
      // Update state for width (0 to 100)
      setScrollWidth(Math.min(Math.max(scrollPercent * 100, 0), 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial call
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 h-1 bg-[#3F72AF] z-[99999] origin-left will-change-[width] transition-[width] duration-75 ease-linear"
      style={{ width: `${scrollWidth}%` }}
    />
  );
};

export default ScrollProgress;
