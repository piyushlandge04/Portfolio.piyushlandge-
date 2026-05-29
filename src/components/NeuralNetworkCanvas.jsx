import React, { useEffect, useRef } from 'react';

export default function NeuralNetworkCanvas() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null, radius: 160 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    // Configs
    const maxParticles = 65;
    const connectionDistance = 110;
    
    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      initParticles();
    };

    // Helper to get active theme color values
    const getColors = () => {
      const rootStyles = getComputedStyle(document.documentElement);
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      return {
        cyan: rootStyles.getPropertyValue('--accent-cyan').trim() || 'rgb(0, 191, 255)',
        purple: rootStyles.getPropertyValue('--accent-purple').trim() || 'rgb(40, 116, 255)',
        particleColor: isLight ? 'rgba(40, 116, 255, 0.45)' : 'rgba(0, 191, 255, 0.5)',
        lineColor: isLight ? '40, 116, 255' : '0, 191, 255'
      };
    };

    class Particle {
      constructor(x, y) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 2 + 1.5;
        this.baseRadius = this.radius;
      }

      update() {
        // Bounce off bounds
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

        // Move particle
        this.x += this.vx;
        this.y += this.vy;

        // Mouse attraction/repulsion forces
        if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
          const dx = mouseRef.current.x - this.x;
          const dy = mouseRef.current.y - this.y;
          const distance = Math.hypot(dx, dy);

          if (distance < mouseRef.current.radius) {
            // Gentle attraction pull
            const force = (mouseRef.current.radius - distance) / mouseRef.current.radius;
            this.x += (dx / distance) * force * 0.8;
            this.y += (dy / distance) * force * 0.8;
            this.radius = this.baseRadius + force * 2;
          } else {
            this.radius = this.baseRadius;
          }
        } else {
          this.radius = this.baseRadius;
        }
      }

      draw(colors) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = colors.particleColor;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
      }
    };

    const drawLines = (colors) => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.hypot(dx, dy);

          if (distance < connectionDistance) {
            const alpha = (1 - distance / connectionDistance) * 0.25;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${colors.lineColor}, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw line to mouse
        if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
          const dx = particles[i].x - mouseRef.current.x;
          const dy = particles[i].y - mouseRef.current.y;
          const distance = Math.hypot(dx, dy);

          if (distance < mouseRef.current.radius) {
            const alpha = (1 - distance / mouseRef.current.radius) * 0.35;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.strokeStyle = `rgba(${colors.lineColor}, ${alpha})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    // Initialize and bind
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const colors = getColors();
      
      particles.forEach((p) => {
        p.update();
        p.draw(colors);
      });

      drawLines(colors);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full pointer-events-auto"
      style={{ mixBlendMode: 'screen' }}
      aria-label="Interactive neural network background"
    />
  );
}
