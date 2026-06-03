import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const BlurReveal = ({ children, className = "", delay = 0 }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: elementRef.current,
              opacity: [0, 1],
              filter: ['blur(10px)', 'blur(0px)'],
              translateY: [20, 0],
              duration: 1200,
              delay: delay,
              easing: 'easeOutQuart'
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (elementRef.current) {
      // Set initial state
      anime.set(elementRef.current, { opacity: 0, filter: 'blur(10px)' });
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current);
    };
  }, [delay]);

  return (
    <div ref={elementRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
};

export default BlurReveal;
