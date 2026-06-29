import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const InteractiveBackground = () => {
  const canvasRef = useRef(null);
  const pointerRef = useRef({ x: -1000, y: -1000, active: false });
  const [isMobile, setIsMobile] = useState(false);

  // Motion values for the background blur blobs (smooth follow)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX1 = useSpring(mouseX, { stiffness: 45, damping: 22, mass: 0.5 });
  const springY1 = useSpring(mouseY, { stiffness: 45, damping: 22, mass: 0.5 });

  const springX2 = useSpring(mouseX, { stiffness: 22, damping: 30, mass: 1.2 });
  const springY2 = useSpring(mouseY, { stiffness: 22, damping: 30, mass: 1.2 });

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Initial blob center placement
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      pointerRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        mouseX.set(touchX);
        mouseY.set(touchY);
        pointerRef.current = { x: touchX, y: touchY, active: true };
      }
    };

    const handleMouseLeave = () => {
      pointerRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchstart', handleTouchMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  // Constellation interactive background canvas loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Adjust canvas dimensions on resize
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle Setup
    // Cap count lower on mobile to save CPU/battery (N^2 mesh links calculation)
    const maxParticles = isMobile ? 12 : 65;
    const particles = [];

    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1,
        baseOpacity: Math.random() * 0.3 + 0.15
      });
    }

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pointer = pointerRef.current;
      const connectionDist = isMobile ? 85 : 110;
      const attractionDist = 180;

      // Update & Draw Particles
      particles.forEach((p, idx) => {
        // Move particles
        p.x += p.vx;
        p.y += p.vy;

        // Bouncing logic on screen edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Magnet attraction pull to interactive pointer coordinates
        if (pointer.active) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const dist = Math.hypot(dx, dy);

          if (dist < attractionDist) {
            // Smoothly pull particles closer
            const force = (attractionDist - dist) * 0.00025;
            p.x += (dx / dist) * force * 15;
            p.y += (dy / dist) * force * 15;
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 255, ${p.baseOpacity})`;
        ctx.fill();

        // Check distance to other particles and draw link meshes
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p2.x - p.x;
          const dy = p2.y - p.y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.09;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw link from particle to cursor pointer
        if (pointer.active) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const dist = Math.hypot(dx, dy);

          if (dist < attractionDist - 20) {
            const alpha = (1 - dist / (attractionDist - 20)) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.strokeStyle = `rgba(255, 0, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  return (
    <div className="ambient-background" style={{ pointerEvents: 'none', position: 'fixed', inset: 0, width: '100vw', height: '100vh', overflow: 'hidden', zIndex: 0 }}>
      {/* 1. Cyber-net Interactive Constellation Canvas */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }} />

      {/* 2. Cyan Ambient Glow Blob (cursor tracker) */}
      <motion.div
        style={{
          position: 'absolute',
          width: isMobile ? '350px' : '550px',
          height: isMobile ? '350px' : '550px',
          backgroundColor: 'var(--cyan)',
          borderRadius: '50%',
          filter: 'blur(130px)',
          opacity: 0.12,
          x: springX1,
          y: springY1,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 1
        }}
      />
      
      {/* 3. Magenta Ambient Glow Blob (delayed cursor tracker) */}
      <motion.div
        style={{
          position: 'absolute',
          width: isMobile ? '400px' : '650px',
          height: isMobile ? '400px' : '650px',
          backgroundColor: 'var(--magenta)',
          borderRadius: '50%',
          filter: 'blur(150px)',
          opacity: 0.1,
          x: springX2,
          y: springY2,
          translateX: '-40%',
          translateY: '-60%',
          zIndex: 0
        }}
      />
      
      {/* 4. Static decorative bottom-right anchor blob */}
      <div 
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-10%',
          width: '45vw',
          height: '45vw',
          backgroundColor: 'var(--magenta)',
          borderRadius: '50%',
          filter: 'blur(150px)',
          opacity: 0.08,
          animation: 'moveBlobs 22s infinite alternate ease-in-out',
          zIndex: 0
        }}
      />
    </div>
  );
};

export default InteractiveBackground;
