import React, { useState, useRef, useEffect } from 'react';
import anime from 'animejs';
import { X } from 'lucide-react';

const MiniGallery = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const overlayImageRef = useRef(null);
  const overlayTextRef = useRef(null);
  const overlayBgRef = useRef(null);

  const images = [
    { src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=500&q=80", msg: "Senyuman itu selalu menjadi alasan utama mengapa dunia terasa begitu hangat meski di hari yang paling dingin sekalipun." },
    { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80", msg: "Langkah kita mungkin kecil, tapi jejak yang kita tinggalkan di setiap sudut kota ini akan selalu menjadi cerita yang tak pernah usang." },
    { src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=500&q=80", msg: "Waktu berlalu begitu cepat, namun kenangan yang kita ukir hari ini akan menjadi monumen abadi untuk masa depan." },
  ];

  const handleCardClick = (index) => {
    setActiveIndex(index);
  };

  const closeOverlay = () => {
    anime({
      targets: overlayTextRef.current,
      translateX: 0,
      translateY: 0,
      opacity: 0,
      scale: 0.8,
      duration: 300,
      easing: 'easeInQuad'
    });
    
    anime({
      targets: overlayImageRef.current,
      rotateY: 90,
      translateX: 0,
      translateY: 0,
      scale: 0.8,
      opacity: 0,
      duration: 400,
      easing: 'easeInQuad'
    });
    
    anime({
      targets: overlayBgRef.current,
      opacity: 0,
      duration: 500,
      easing: 'easeInQuad',
      complete: () => {
        setActiveIndex(null);
      }
    });
  };

  useEffect(() => {
    if (activeIndex !== null) {
      const isMobile = window.innerWidth < 768;
      
      const imgTargetX = isMobile ? 0 : -192;
      const imgTargetY = isMobile ? -138 : 0;
      const textTargetX = isMobile ? 0 : 172;
      const textTargetY = isMobile ? 158 : 0;
      
      anime.set(overlayBgRef.current, { opacity: 0 });
      anime.set(overlayImageRef.current, { rotateY: -180, scale: 0.5, opacity: 0, translateX: 0, translateY: 0 });
      anime.set(overlayTextRef.current, { opacity: 0, translateX: 0, translateY: 0, scale: 0.8 });

      anime({
        targets: overlayBgRef.current,
        opacity: 1,
        duration: 400,
        easing: 'easeOutQuad'
      });

      anime({
        targets: overlayImageRef.current,
        rotateY: 0,
        scale: 1,
        opacity: 1,
        translateX: imgTargetX,
        translateY: imgTargetY,
        duration: 1000,
        easing: 'easeOutElastic(1, .6)'
      });

      anime({
        targets: overlayTextRef.current,
        opacity: 1,
        scale: 1,
        translateX: textTargetX,
        translateY: textTargetY,
        duration: 800,
        delay: 300, 
        easing: 'easeOutQuint'
      });
      
      const handleResize = () => {
        const mobile = window.innerWidth < 768;
        if (overlayImageRef.current && overlayTextRef.current) {
          anime.set(overlayImageRef.current, {
            translateX: mobile ? 0 : -192,
            translateY: mobile ? -138 : 0,
          });
          anime.set(overlayTextRef.current, {
            translateX: mobile ? 0 : 172,
            translateY: mobile ? 158 : 0,
          });
        }
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [activeIndex]);

  return (
    <div className="w-full flex flex-col items-center pb-16 relative">
      <div className="group grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full mb-12">
        {images.map((item, index) => (
          <div 
            key={index} 
            className="relative w-full aspect-[4/5] cursor-pointer perspective-1000"
            onClick={() => handleCardClick(index)}
          >
            <div className="w-full h-full relative transition-all duration-500 ease-out md:group-hover:opacity-60 md:group-hover:blur-[2px] md:hover:!opacity-100 md:hover:!blur-0 md:hover:-translate-y-4 md:hover:scale-105 md:hover:z-10">
              <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-lg border border-[#DBE2EF]">
                <img src={item.src} alt="Kenangan" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto">
          <div 
            ref={overlayBgRef}
            className="absolute inset-0 bg-[#FFFFFF]/90 backdrop-blur-md cursor-pointer"
            onClick={closeOverlay}
          ></div>
          
          <button 
            onClick={closeOverlay}
            className="absolute top-6 right-6 z-[60] p-3 bg-[#DBE2EF]/50 backdrop-blur-md rounded-full text-[#112D4E] hover:bg-[#3F72AF] hover:text-white transition-colors shadow-sm"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative w-0 h-0 flex items-center justify-center">
            
            <div 
              ref={overlayTextRef}
              className="absolute w-[260px] h-[260px] md:w-[360px] md:h-[360px] -left-[130px] -top-[130px] md:-left-[180px] md:-top-[180px] p-6 md:p-10 bg-[#F9F7F7]/95 rounded-[2rem] shadow-xl border border-[#DBE2EF] flex flex-col justify-center z-10"
            >
              <h3 className="font-sans text-xl md:text-2xl font-extrabold text-[#112D4E] mb-3 md:mb-5 shrink-0 tracking-tight">Cerita Dibaliknya</h3>
              <p className="text-[#3F72AF] text-sm md:text-base leading-relaxed text-justify font-sans overflow-y-auto pr-3 custom-scrollbar font-medium">
                {images[activeIndex].msg}
              </p>
            </div>

            <div 
              ref={overlayImageRef}
              className="absolute w-[240px] h-[300px] md:w-[320px] md:h-[400px] -left-[120px] -top-[150px] md:-left-[160px] md:-top-[200px] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white z-20 bg-white"
              style={{ transformOrigin: 'center center' }}
            >
              <img 
                src={images[activeIndex].src} 
                alt="Kenangan Overlay" 
                className="w-full h-full object-cover"
              />
            </div>

          </div>
        </div>
      )}
      
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #DBE2EF;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default MiniGallery;
