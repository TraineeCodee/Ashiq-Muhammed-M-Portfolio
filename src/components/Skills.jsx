import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  "Figma",
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Unity",
  "Game Mechanics",
  "C#"
];

const Skills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section id="skills" style={{ 
      minHeight: '60vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '4rem 2rem',
      position: 'relative',
      zIndex: 20
    }}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '3rem' }}
      >
        <h2 style={{ fontSize: '3rem', color: '#ffffff', letterSpacing: '-1px' }}>Core Skills</h2>
        <div style={{ width: '50px', height: '3px', background: 'linear-gradient(to right, #00FFFF, #FF00FF)', margin: '1rem auto' }}></div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.5rem',
          justifyContent: 'center',
          maxWidth: '900px',
          width: '100%'
        }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.1, y: -5, boxShadow: '0 10px 20px rgba(0, 255, 255, 0.2)' }}
            style={{
              padding: '1rem 2rem',
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(10px)',
              borderRadius: '50px',
              border: `1px solid ${index % 2 === 0 ? 'rgba(0, 255, 255, 0.2)' : 'rgba(255, 0, 255, 0.2)'}`,
              color: '#ffffff',
              fontSize: '1.2rem',
              fontWeight: 500,
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
          >
            {skill}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
