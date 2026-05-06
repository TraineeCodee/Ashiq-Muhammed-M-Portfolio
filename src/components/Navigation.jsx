import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

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
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.5 }}
      style={{
        position: 'fixed',
        top: '1.5rem',
        left: 0,
        width: '100vw',
        zIndex: 10000,
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '2rem',
        pointerEvents: 'none' // allow clicking through empty space
      }}
    >
      <div 
        className="glass"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          padding: '0.75rem',
          borderRadius: isOpen ? '20px' : '50%',
          background: scrolled || isOpen ? 'rgba(5, 5, 5, 0.85)' : 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px)',
          pointerEvents: 'auto', // re-enable clicks on the bar itself
          transition: 'all 0.3s ease',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          border: '1px solid rgba(0, 255, 255, 0.1)',
          alignItems: 'flex-end',
          overflow: 'hidden'
        }}
      >
        <button
          onClick={toggleMenu}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.25rem',
            cursor: 'none'
          }}
        >
          {isOpen ? <X size={28} color="#00FFFF" /> : <Menu size={28} color="#00FFFF" />}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                paddingTop: '1.5rem',
                paddingBottom: '0.5rem',
                paddingRight: '0.5rem',
                paddingLeft: '2rem',
                alignItems: 'flex-end',
                width: 'max-content',
              }}
            >
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    color: '#ffffff',
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    position: 'relative',
                    transition: 'color 0.3s ease',
                    whiteSpace: 'nowrap'
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
