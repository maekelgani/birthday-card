import React, { useEffect, useRef } from 'react';

const MouseParticles = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    // Set canvas resolution
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();
    
    // Config: accent color #3F72AF
    const maxParticles = 80;
    
    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 3; // Random size 3-8px
        this.baseSize = this.size;
        // Float upwards and slightly spread
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5 - 0.5; // Upward bias
        this.life = 1; // 1 to 0 (opacity and scale scale with life)
        this.decay = Math.random() * 0.02 + 0.015; // Fade out speed
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
        this.size = this.baseSize * this.life;
      }
      
      draw() {
        if (this.life <= 0) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(0, this.size), 0, Math.PI * 2);
        // Using #3F72AF with dynamic opacity
        ctx.fillStyle = `rgba(63, 114, 175, ${this.life * 0.8})`;
        ctx.fill();
        
        // Add a subtle glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(63, 114, 175, ${this.life * 0.5})`;
      }
    }
    
    // Track mouse movement
    const handleMouseMove = (e) => {
      // Add multiple particles for a dense trail
      for (let i = 0; i < 3; i++) {
        particles.push(new Particle(e.clientX, e.clientY));
      }
      
      // Garbage collection limit
      if (particles.length > maxParticles) {
        particles.splice(0, particles.length - maxParticles);
      }
    };
    
    // Touch support for mobile (optional, but keep it light)
    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      particles.push(new Particle(touch.clientX, touch.clientY));
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    
    // Render loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Reset shadow blur to prevent performance leak in clearRect
      ctx.shadowBlur = 0;
      
      // Update and draw particles, filter out dead ones (Garbage Collection)
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      
      particles = particles.filter(p => p.life > 0);
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[45]"
    />
  );
};

export default MouseParticles;
