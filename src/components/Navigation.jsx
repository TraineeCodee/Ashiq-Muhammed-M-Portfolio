import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About me', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Project', href: '#project' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Just a small threshold to trigger a visual change if we want one
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.5 }}
      style={{
        position: 'fixed',
        top: '2rem',
        left: 0,
        width: '100vw',
        zIndex: 10000,
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none' // allow clicking through empty space
      }}
    >
      <div 
        className="glass"
        style={{
          display: 'flex',
          gap: '2rem',
          padding: '1rem 3rem',
          borderRadius: '50px',
          background: scrolled ? 'rgba(5, 5, 5, 0.7)' : 'rgba(255, 255, 255, 0.03)',
          pointerEvents: 'auto', // re-enable clicks on the bar itself
          transition: 'background 0.3s ease',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          border: '1px solid rgba(0, 255, 255, 0.1)'
        }}
      >
        {navLinks.map((link) => (
          <a 
            key={link.name} 
            href={link.href}
            style={{
              color: '#ffffff',
              fontSize: '1.1rem',
              fontWeight: 500,
              position: 'relative',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#00FFFF';
              e.target.style.textShadow = '0 0 10px rgba(0,255,255,0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#ffffff';
              e.target.style.textShadow = 'none';
            }}
          >
            {link.name}
          </a>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navigation;
