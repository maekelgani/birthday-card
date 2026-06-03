import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import anime from 'animejs';
import { PlayCircle } from 'lucide-react';
import GlobalBackground from '../components/GlobalBackground';

const LandingPage = () => {
  const navigate = useNavigate();
  const textRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    if (textRef.current && btnRef.current) {
      anime.set([textRef.current, btnRef.current], {
        opacity: 0,
        filter: 'blur(10px)',
        translateY: 20
      });

      anime({
        targets: [textRef.current, btnRef.current],
        opacity: 1,
        filter: 'blur(0px)',
        translateY: 0,
        delay: anime.stagger(300, { start: 600 }),
        duration: 1500,
        easing: 'easeOutQuart'
      });
    }
  }, []);

  const handleEnter = () => {
    const event = new CustomEvent('play-bgm');
    window.dispatchEvent(event);
    
    navigate('/main');
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-transparent">
      <GlobalBackground />

      <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center space-y-12">
        <div ref={textRef} className="space-y-4">
          <h1 className="font-sans text-5xl md:text-7xl font-extrabold text-[#112D4E] tracking-tight drop-shadow-sm">
            Untukmu
          </h1>
          <p className="text-[#3F72AF] font-sans font-medium tracking-widest text-sm md:text-base uppercase opacity-80">
            Sebuah cerita yang belum usai
          </p>
        </div>

        <button 
          ref={btnRef}
          onClick={handleEnter}
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#3F72AF] rounded-full text-white font-semibold tracking-wide hover:bg-[#112D4E] hover:scale-105 transition-all duration-500 overflow-hidden shadow-xl shadow-[#3F72AF]/30"
        >
          <PlayCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-500" />
          <span>Buka Kenangan</span>
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
