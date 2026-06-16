import React, { useState, useEffect } from 'react';
import anime from 'animejs';
import { Delete } from 'lucide-react';

const PinKeypad = ({ pin, setPin, error }) => {
  const maxLength = 6;

  const handleKeyPress = (num) => {
    if (pin.length < maxLength) {
      setPin((prev) => prev + num);
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  // Shake effect on error
  useEffect(() => {
    if (error) {
      anime({
        targets: '.pin-dots',
        translateX: [
          { value: -10, duration: 50 },
          { value: 10, duration: 50 },
          { value: -10, duration: 50 },
          { value: 10, duration: 50 },
          { value: 0, duration: 50 }
        ],
        easing: 'easeInOutSine'
      });
    }
  }, [error]);

  const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'delete', 0, 'empty'];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-[280px] mx-auto z-20 relative">
      {/* Pin Dots */}
      <div className="pin-dots flex gap-3 mb-2">
        {Array.from({ length: maxLength }).map((_, i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              i < pin.length 
                ? 'bg-[#3F72AF] scale-110 shadow-[0_0_10px_rgba(63,114,175,0.5)]' 
                : 'bg-[#DBE2EF] border border-[#112D4E]/20'
            } ${error ? 'bg-red-400 border-red-400' : ''}`}
          ></div>
        ))}
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-3 w-full">
        {keys.map((key, i) => {
          if (key === 'empty') return <div key={i} className="pointer-events-none" />;
          if (key === 'delete') {
            return (
              <button
                key={i}
                onClick={handleDelete}
                className="flex items-center justify-center h-14 bg-white/40 hover:bg-[#DBE2EF] rounded-2xl text-[#112D4E] transition-all duration-200 active:scale-95 shadow-sm border border-[#3F72AF]/10"
              >
                <Delete className="w-6 h-6" />
              </button>
            );
          }
          return (
            <button
              key={i}
              onClick={() => handleKeyPress(key)}
              className="flex items-center justify-center h-14 bg-white/80 hover:bg-[#3F72AF] hover:text-white rounded-2xl text-xl font-bold text-[#112D4E] transition-all duration-200 active:scale-95 shadow-[0_4px_10px_rgba(0,0,0,0.05)] border border-[#3F72AF]/10"
            >
              {key}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PinKeypad;
