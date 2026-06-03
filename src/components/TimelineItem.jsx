import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

const TimelineItem = ({ year, title, description, isLeft }) => {
  const itemRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (isVisible && itemRef.current) {
      // Animate text content blur reveal
      anime({
        targets: itemRef.current.querySelectorAll('.timeline-content'),
        opacity: [0, 1],
        filter: ['blur(10px)', 'blur(0px)'],
        translateX: isLeft ? [-30, 0] : [30, 0],
        duration: 1000,
        easing: 'easeOutExpo',
        delay: anime.stagger(150)
      });
      
      // Dot animation
      const dot = itemRef.current.querySelector('.timeline-dot');
      if (dot) {
        anime({
          targets: dot,
          scale: [0, 1.2, 1],
          duration: 800,
          easing: 'easeOutElastic(1, .5)'
        });
      }
    }
  }, [isVisible, isLeft]);

  return (
    <div 
      ref={itemRef} 
      // Mobile: Column layout. Desktop: Row layout based on isLeft
      className={`relative flex flex-col md:flex-row items-center md:justify-between w-full mb-16 md:mb-24 ${isLeft ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Spacer for alignment on Desktop */}
      <div className="w-5/12 hidden md:block"></div>
      
      {/* Center Dot connecting to the line - Visible on Desktop */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 items-center justify-center w-5 h-5 rounded-full bg-[#FFFFFF] border-2 border-[#3F72AF] timeline-dot shadow-[0_0_10px_rgba(63,114,175,0.4)]">
        <div className="w-2 h-2 bg-[#112D4E] rounded-full"></div>
      </div>
      
      {/* Content Area (Cardless, pure text) */}
      <div className={`w-full md:w-5/12 flex flex-col items-start ${isLeft ? 'md:items-end md:text-right' : 'md:text-left'} text-left px-6 md:px-0`}>
        <div className="timeline-content opacity-0 w-full mb-2">
          <div className="font-sans text-[#3F72AF] font-bold text-sm md:text-base tracking-widest uppercase">{year}</div>
        </div>
        <div className="timeline-content opacity-0 w-full mb-3">
          <h3 className="font-sans text-3xl font-bold text-[#112D4E] tracking-tight">{title}</h3>
        </div>
        <div className="timeline-content opacity-0 w-full">
          <p className="text-[#112D4E]/70 text-base md:text-lg font-normal leading-relaxed max-w-sm md:mx-0">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;
