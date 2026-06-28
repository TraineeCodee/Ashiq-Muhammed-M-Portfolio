import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const frameCount = 96;
const currentFrame = (index) => `${import.meta.env.BASE_URL}images/herosection/ezgif-frame-${index.toString().padStart(3, '0')}.svg`;

const Hero = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const lastDrawnIndexRef = useRef(-1);
  const [images, setImages] = useState([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const drawImage = (img) => {
    const canvas = canvasRef.current;
    if (!canvas || !img || !img.complete) return false;
    const context = canvas.getContext('2d');
    
    // Scale image to cover the canvas (object-fit: cover equivalent)
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio  = Math.max( hRatio, vRatio );
    const centerShift_x = ( canvas.width - img.width*ratio ) / 2;
    const centerShift_y = ( canvas.height - img.height*ratio ) / 2;  
    
    context.clearRect(0,0,canvas.width, canvas.height);
    context.drawImage(img, 0,0, img.width, img.height,
                       centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);  
    return true;
  };

  // Preload images progressively in batches
  useEffect(() => {
    const loadedImages = new Array(frameCount);
    let isCancelled = false;

    const loadImage = (i) => {
      return new Promise((resolve) => {
        if (isCancelled) {
          resolve(null);
          return;
        }
        const img = new Image();
        img.src = currentFrame(i);
        img.onload = () => {
          if (isCancelled) {
            resolve(null);
            return;
          }
          loadedImages[i - 1] = img;
          
          // Draw if this is the active frame
          const currentProgress = scrollYProgress ? scrollYProgress.get() : 0;
          const expectedIndex = Math.min(frameCount - 1, Math.floor(currentProgress * frameCount));
          if (i - 1 === expectedIndex) {
            requestAnimationFrame(() => {
              const drawn = drawImage(img);
              if (drawn) lastDrawnIndexRef.current = expectedIndex;
            });
          }
          resolve(img);
        };
        img.onerror = () => {
          resolve(null);
        };
      });
    };

    const loadAllProgressively = async () => {
      // 1. Load the first frame immediately
      await loadImage(1);
      if (isCancelled) return;
      setImages([...loadedImages]);

      // 2. Load the rest in small batches of 6
      const batchSize = 6;
      for (let i = 2; i <= frameCount; i += batchSize) {
        if (isCancelled) break;
        const promises = [];
        for (let j = 0; j < batchSize && (i + j) <= frameCount; j++) {
          promises.push(loadImage(i + j));
        }
        await Promise.all(promises);
        if (isCancelled) break;
        setImages([...loadedImages]);
      }
    };

    loadAllProgressively();

    return () => {
      isCancelled = true;
    };
  }, [scrollYProgress]);

  // When scroll changes, update canvas
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (images.length === 0) return;
    
    // Calculate frame index (0 to 95)
    const frameIndex = Math.min(
      frameCount - 1,
      Math.floor(latest * frameCount)
    );

    if (lastDrawnIndexRef.current !== frameIndex) {
      requestAnimationFrame(() => {
        if (images[frameIndex]) {
          const drawn = drawImage(images[frameIndex]);
          if (drawn) {
            lastDrawnIndexRef.current = frameIndex;
          }
        }
      });
    }
  });

  // Initial draw and handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        // Redraw current frame on resize
        if (images.length > 0) {
          const currentProgress = scrollYProgress.get();
          const frameIndex = Math.min(frameCount - 1, Math.floor(currentProgress * frameCount));
          if (images[frameIndex]) {
            drawImage(images[frameIndex]);
          }
        }
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Draw first frame if loaded
    if (images[0]) {
      drawImage(images[0]);
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [images, scrollYProgress]);

  // Text Animations based on scroll progress
  
  // 1. Initial Title: Shows from 0% to 25% scroll, fades out by 35%
  const titleOpacity = useTransform(scrollYProgress, [0, 0.25, 0.35], [1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.35], [0, -100]);
  const titleScale = useTransform(scrollYProgress, [0, 0.35], [1, 1.2]);
  
  // 2. Subtitle Sequence: Fades in at 35%, visible till 65%, fades out by 75%
  const subtitleOpacity = useTransform(scrollYProgress, [0.35, 0.45, 0.65, 0.75], [0, 1, 1, 0]);
  const subtitleScale = useTransform(scrollYProgress, [0.35, 0.55, 0.75], [0.8, 1, 1.2]);
  const subtitleY = useTransform(scrollYProgress, [0.35, 0.75], [50, -50]);

  // 3. Feature Sequence: Fades in at 75%, peaks at 90%, fades out by 100%
  const featureOpacity = useTransform(scrollYProgress, [0.75, 0.85, 0.95, 1], [0, 1, 1, 0]);
  const featureY = useTransform(scrollYProgress, [0.75, 1], [100, -100]);
  const featureScale = useTransform(scrollYProgress, [0.75, 0.9, 1], [0.9, 1.1, 1.3]);

  return (
    <section id="home" ref={containerRef} style={{ height: '250vh', position: 'relative', backgroundColor: '#000' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        {/* Canvas for the image sequence */}
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
        
        {/* Overlay Text Content */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          
          {/* Initial Title */}
          <motion.div style={{ position: 'absolute', opacity: titleOpacity, y: titleY, scale: titleScale, textAlign: 'center' }}>
            <h1 style={{ fontSize: '7vw', fontWeight: 800, letterSpacing: '-2px', background: 'linear-gradient(to right, #ffffff, #a0a0a0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Ashiq Muhammed M
            </h1>
            <p style={{ color: '#a0a0a0', fontSize: '1.5vw', marginTop: '1rem' }}>Scroll to experience</p>
          </motion.div>

          {/* Mid Scroll Text */}
          <motion.div style={{ position: 'absolute', opacity: subtitleOpacity, scale: subtitleScale, y: subtitleY, textAlign: 'center' }}>
            <h2 style={{ fontSize: '5vw', color: '#00FFFF', fontWeight: 700, textShadow: '0 0 30px rgba(0, 255, 255, 0.5)' }}>
              Unity Developer
            </h2>
            <h2 style={{ fontSize: '4vw', color: '#ffffff', fontWeight: 400, marginTop: '0.5rem' }}>
              & Graphic Designer
            </h2>
          </motion.div>

          {/* End Scroll Text */}
          <motion.div style={{ position: 'absolute', opacity: featureOpacity, y: featureY, scale: featureScale, textAlign: 'center' }}>
            <h2 style={{ fontSize: '6vw', color: '#FF00FF', fontWeight: 800, textShadow: '0 0 40px rgba(255, 0, 255, 0.5)' }}>
              The Vibe Coder
            </h2>
            <p style={{ fontSize: '2vw', color: '#fff', marginTop: '1rem', fontWeight: 300 }}>
              Bridging logic with creative visual systems.
            </p>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
