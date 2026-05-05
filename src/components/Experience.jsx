import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const experiences = [
  {
    role: "µPlay & Game Dev IG Lead",
    company: "MuLearn Foundation · Internship",
    date: "Jul 2025 - Present",
    duration: "11 mos",
    location: "Hybrid",
  },
  {
    role: "Operations Team Member",
    company: "Google Developer Groups on Campus - Mar Baselios College of Engineering and Technology",
    date: "Nov 2025 - Present",
    duration: "7 mos",
  },
  {
    role: "MuPlay IG Lead",
    company: "Catalyst - Mar Baselios IEDC",
    date: "Jan 2026 - Present",
    duration: "5 mos",
  },
  {
    role: "Media team",
    company: "NSS MBCET",
    date: "Sep 2025 - Present",
    duration: "9 mos",
    skills: "Design and Figma (Software)"
  }
];

const Experience = () => {
  return (
    <section id="experience" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '8rem 2rem',
      position: 'relative',
      zIndex: 20
    }}>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        <h2 style={{ fontSize: '3rem', color: '#ffffff' }}>Experience</h2>
        <div style={{ width: '60px', height: '4px', background: 'linear-gradient(to right, #00FFFF, #FF00FF)', margin: '1rem auto' }}></div>
      </motion.div>

      <div style={{ maxWidth: '800px', width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {experiences.map((exp, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="glass"
            style={{
              padding: '2rem 3rem',
              display: 'flex',
              gap: '1.5rem',
              alignItems: 'flex-start'
            }}
          >
            <div style={{ 
              background: 'rgba(255,255,255,0.05)', 
              padding: '1rem', 
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <Briefcase size={28} color={index % 2 === 0 ? "#00FFFF" : "#FF00FF"} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem', color: '#ffffff' }}>{exp.role}</h3>
              <p style={{ fontSize: '1.1rem', color: '#a0a0a0', marginBottom: '0.2rem' }}>{exp.company}</p>
              <p style={{ fontSize: '0.9rem', color: index % 2 === 0 ? "#00FFFF" : "#FF00FF", fontWeight: 600, marginBottom: (exp.location || exp.skills) ? '0.5rem' : '0' }}>
                {exp.date} {exp.duration && `· ${exp.duration}`}
              </p>
              {exp.location && <p style={{ fontSize: '0.9rem', color: '#888', marginBottom: '0.2rem' }}>{exp.location}</p>}
              {exp.skills && <p style={{ fontSize: '0.9rem', color: '#ccc', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.1rem' }}>💎</span> {exp.skills}
              </p>}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
