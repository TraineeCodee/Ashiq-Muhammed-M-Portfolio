import React, { useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { Gamepad2 } from 'lucide-react';

const CustomCursor = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    const updateMousePosition = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        x: mouseX,
        y: mouseY,
        pointerEvents: 'none',
        zIndex: 999999, // Extremely high z-index to stay on top
        translateX: '-50%',
        translateY: '-50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Gamepad2 size={24} color="#00FFFF" style={{ filter: 'drop-shadow(0 0 5px rgba(0,255,255,0.5))' }} />
    </motion.div>
  );
};

export default CustomCursor;
