import React from 'react';
import { motion } from 'framer-motion';

const WhyChooseMe = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const frameVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 1.2, 
        ease: "easeOut",
        staggerChildren: 0.4,
        delayChildren: 0.3
      }
    }
  };

  return (
    <section style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '4rem 2rem',
      position: 'relative',
      zIndex: 20
    }}>
      
      <motion.div 
        variants={frameVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{
          maxWidth: '1000px',
          width: '100%',
          position: 'relative',
          padding: '6rem 4rem',
          background: 'rgba(255, 255, 255, 0.01)',
          backdropFilter: 'blur(20px)',
          borderRadius: '30px',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: '0 0 50px rgba(0, 255, 255, 0.05), inset 0 0 20px rgba(255, 0, 255, 0.05)',
          overflow: 'hidden'
        }}
      >
        {/* Animated Corner Accents for the "Frame" look */}
        <motion.div 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
          style={{ position: 'absolute', top: 0, left: 0, width: '50px', height: '50px', borderTop: '2px solid #00FFFF', borderLeft: '2px solid #00FFFF', borderTopLeftRadius: '30px' }} 
        />
        <motion.div 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
          style={{ position: 'absolute', bottom: 0, right: 0, width: '50px', height: '50px', borderBottom: '2px solid #FF00FF', borderRight: '2px solid #FF00FF', borderBottomRightRadius: '30px' }} 
        />

        <motion.div variants={textVariants} style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '3rem', color: '#ffffff', letterSpacing: '-1px' }}>Why Choose Me</h2>
          <div style={{ width: '60px', height: '3px', background: 'linear-gradient(to right, #00FFFF, #FF00FF)', margin: '1.5rem auto 0' }}></div>
        </motion.div>

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '2.5rem',
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <motion.p variants={textVariants} style={{ fontSize: '1.8rem', color: '#ffffff', fontWeight: 300, lineHeight: 1.6 }}>
            I started with a passion for design and grew into building complete interactive experiences.
          </motion.p>
          
          <motion.p variants={textVariants} style={{ fontSize: '1.4rem', color: '#a0a0a0', lineHeight: 1.8 }}>
            Today, I combine Unity development with UI/UX thinking to create games and interfaces that are both functional and engaging. 
          </motion.p>

          <motion.p variants={textVariants} style={{ fontSize: '1.4rem', color: '#00FFFF', fontWeight: 400, fontStyle: 'italic', marginTop: '1rem' }}>
            I care about the small details—because that’s what shapes great user experiences.
          </motion.p>
        </div>

      </motion.div>
    </section>
  );
};

export default WhyChooseMe;
