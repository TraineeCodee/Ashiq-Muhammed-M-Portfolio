import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const InteractiveBackground = () => {
  // Motion values for the mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the glowing blobs
  // Cyan blob follows the cursor closely
  const springX1 = useSpring(mouseX, { stiffness: 50, damping: 20, mass: 0.5 });
  const springY1 = useSpring(mouseY, { stiffness: 50, damping: 20, mass: 0.5 });

  // Magenta blob follows with a more delayed, abstract physics
  const springX2 = useSpring(mouseX, { stiffness: 20, damping: 30, mass: 1.5 });
  const springY2 = useSpring(mouseY, { stiffness: 20, damping: 30, mass: 1.5 });

  useEffect(() => {
    // Set initial center position safely
    if (typeof window !== 'undefined') {
      mouseX.set(window.innerWidth / 2);
      mouseY.set(window.innerHeight / 2);
    }

    const handleMouseMove = (e) => {
      // Offset by half the blob size so the cursor is in the middle of the blob
      // Assuming blobs are around 40vw (~400-600px). We'll center the visual weight.
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="ambient-background" style={{ pointerEvents: 'none' }}>
      {/* Cyan Cursor Tracker */}
      <motion.div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          backgroundColor: 'var(--cyan)',
          borderRadius: '50%',
          filter: 'blur(150px)',
          opacity: 0.15,
          x: springX1,
          y: springY1,
          // Shift left and up by half the width/height to perfectly center on cursor
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 1
        }}
      />
      
      {/* Magenta Delayed Tracker */}
      <motion.div
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          backgroundColor: 'var(--magenta)',
          borderRadius: '50%',
          filter: 'blur(180px)',
          opacity: 0.12,
          x: springX2,
          y: springY2,
          // Slightly offset from the center naturally
          translateX: '-40%',
          translateY: '-60%',
          zIndex: 0
        }}
      />
      
      {/* Static abstract blob in bottom right to ensure page isn't totally dark if cursor is top left */}
      <div 
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-10%',
          width: '40vw',
          height: '40vw',
          backgroundColor: 'var(--magenta)',
          borderRadius: '50%',
          filter: 'blur(150px)',
          opacity: 0.1,
          animation: 'moveBlobs 20s infinite alternate ease-in-out'
        }}
      />
    </div>
  );
};

export default InteractiveBackground;
