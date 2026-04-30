import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Target, Zap } from 'lucide-react';

const Details = () => {
  // We'll use a simple state to track mouse position for a dynamic 3D tilt effect on the image
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top;  // y position within the element
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (max 15 degrees)
    const rotateXValue = ((y - centerY) / centerY) * -15;
    const rotateYValue = ((x - centerX) / centerX) * 15;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section id="about" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '5rem 2rem',
      position: 'relative',
      zIndex: 20
    }}>
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '4rem',
        alignItems: 'center'
      }}>
        
        {/* Dynamic Profile Picture Side */}
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            perspective: '1000px'
          }}
        >
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{
              rotateX,
              rotateY,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.5 }}
            style={{
              width: '100%',
              maxWidth: '400px',
              aspectRatio: '3/4',
              borderRadius: '24px',
              position: 'relative',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Glow Layer */}
            <div style={{
              position: 'absolute',
              inset: '-5px',
              background: 'linear-gradient(45deg, #00FFFF, #FF00FF)',
              borderRadius: '28px',
              filter: 'blur(20px)',
              opacity: 0.5,
              transform: 'translateZ(-20px)'
            }} />
            
            {/* Image Layer */}
            <div className="glass" style={{
              width: '100%',
              height: '100%',
              borderRadius: '24px',
              padding: '10px',
              transform: 'translateZ(20px)'
            }}>
              <img 
                src="/me.jpeg" 
                alt="Ashiq Muhammed M"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  filter: 'contrast(1.1) brightness(0.9)'
                }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Text Details Side */}
        <motion.div 
          className="glass"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{
            padding: '4rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '3rem'
          }}
        >
          <motion.div variants={itemVariants} style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00FFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <div>
              <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>About Me</h3>
              <p style={{ fontSize: '1.2rem', color: '#a0a0a0', lineHeight: 1.6 }}>
                I am a Unity developer and UI/UX designer focused on building interactive experiences and game systems. I enjoy creating intuitive interfaces, smooth user flows, and visually engaging designs that combine creativity with performance.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
            <MapPin size={40} color="#FF00FF" style={{ flexShrink: 0 }} />
            <div>
              <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Location</h3>
              <p style={{ fontSize: '1.2rem', color: '#a0a0a0', lineHeight: 1.6 }}>
                Based in Kerala, India. Working globally on high-impact interactive systems.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
            <Target size={40} color="#00FFFF" style={{ flexShrink: 0 }} />
            <div>
              <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Focus</h3>
              <p style={{ fontSize: '1.2rem', color: '#a0a0a0', lineHeight: 1.6 }}>
                Bridging complex technical backend logic with highly creative, fluid visual systems. 
                The intersection where hardcore programming meets beautiful aesthetics.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
            <Zap size={40} color="#FF00FF" style={{ flexShrink: 0 }} />
            <div>
              <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Philosophy</h3>
              <p style={{ fontSize: '1.2rem', color: '#a0a0a0', lineHeight: 1.6 }}>
                Life isn't about being perfect. It's about iteration: "Build, Reflect, Improve."
              </p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Details;
