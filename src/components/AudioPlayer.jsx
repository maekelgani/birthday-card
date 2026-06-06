import React, { useState, useRef, useEffect } from 'react';
import anime from 'animejs';
import { Music, Play, Pause, SkipForward, X } from 'lucide-react';

const AudioPlayer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (window.bgm) {
      audioRef.current = window.bgm;
      setIsPlaying(!window.bgm.paused);
    } else {
      audioRef.current = new Audio('/placeholder-bgm.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
      window.bgm = audioRef.current;
    }

    const checkPlayState = () => {
      setIsPlaying(!audioRef.current.paused);
    };

    audioRef.current.addEventListener('play', checkPlayState);
    audioRef.current.addEventListener('pause', checkPlayState);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('play', checkPlayState);
        audioRef.current.removeEventListener('pause', checkPlayState);
      }
    };
  }, []);

  const toggleExpand = () => {
    const nextState = !isExpanded;
    setIsExpanded(nextState);

    if (nextState) {
      anime({
        targets: playerRef.current,
        width: ['56px', '280px'],
        height: ['56px', '76px'],
        borderRadius: ['28px', '20px'],
        duration: 400,
        easing: 'easeOutElastic(1, .8)'
      });
    } else {
      anime({
        targets: playerRef.current,
        width: ['280px', '56px'],
        height: ['76px', '56px'],
        borderRadius: ['20px', '28px'],
        duration: 300,
        easing: 'easeInQuad'
      });
    }
  };

  const togglePlay = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log('Autoplay prevented:', err));
    }
  };

  const handleSkip = (e) => {
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => console.log('Playback prevented', err));
    }
  };

  return (
    <div
      ref={playerRef}
      className="fixed top-6 right-6 z-50 bg-[#DBE2EF]/70 backdrop-blur-xl border border-[#FFFFFF]/60 shadow-xl flex items-center justify-center overflow-hidden cursor-pointer"
      style={{ width: '56px', height: '56px', borderRadius: '28px' }}
      onClick={!isExpanded ? toggleExpand : undefined}
    >
      {!isExpanded ? (
        <Music className={`text-[#3F72AF] w-6 h-6 ${isPlaying ? 'animate-bounce' : ''}`} />
      ) : (
        <div className="w-full flex items-center justify-between px-5 opacity-0 animate-[fadeIn_0.3s_ease-out_0.2s_forwards]">
          <div className="flex flex-col">
            <span className="text-[10px] text-[#3F72AF] font-bold uppercase tracking-widest">Sedang Diputar</span>
            <span className="text-sm text-[#112D4E] font-extrabold truncate w-24">Lagu Favorit</span>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={togglePlay} className="p-2.5 rounded-full bg-[#112D4E] text-[#FFFFFF] hover:scale-105 transition-transform shadow-md">
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>
            <button onClick={handleSkip} className="p-2 rounded-full text-[#3F72AF] hover:bg-[#FFFFFF]/50 transition-colors">
              <SkipForward className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); toggleExpand(); }}
              className="ml-1 p-1 text-[#112D4E]/50 hover:text-[#112D4E]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
      <style>{`
        @keyframes fadeIn {
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default AudioPlayer;
