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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    handleResize(); // Initialize on mount
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
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
        top: isMobile ? '1.5rem' : '2rem',
        left: 0,
        width: '100vw',
        zIndex: 10000,
        display: 'flex',
        justifyContent: isMobile ? 'flex-end' : 'center',
        paddingRight: isMobile ? '1.5rem' : '0',
        pointerEvents: 'none' // allow clicking through empty space
      }}
    >
      <div 
        className="glass"
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '0' : '2rem',
          padding: isMobile ? '0.75rem' : '1rem 3rem',
          borderRadius: isMobile ? (isOpen ? '20px' : '50%') : '50px',
          background: scrolled || isOpen ? 'rgba(5, 5, 5, 0.85)' : 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px)',
          pointerEvents: 'auto', // re-enable clicks on the bar itself
          transition: 'all 0.3s ease',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          border: '1px solid rgba(0, 255, 255, 0.1)',
          alignItems: isMobile ? 'flex-end' : 'center',
          overflow: 'hidden'
        }}
      >
        {isMobile && (
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
        )}

        <AnimatePresence>
          {(!isMobile || isOpen) && (
            <motion.div
              initial={isMobile ? { height: 0, opacity: 0 } : false}
              animate={isMobile ? { height: 'auto', opacity: 1 } : false}
              exit={isMobile ? { height: 0, opacity: 0 } : false}
              style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? '1.5rem' : '2rem',
                paddingTop: isMobile && isOpen ? '1.5rem' : '0',
                paddingBottom: isMobile && isOpen ? '0.5rem' : '0',
                paddingRight: isMobile && isOpen ? '0.5rem' : '0',
                paddingLeft: isMobile && isOpen ? '2rem' : '0',
                alignItems: isMobile ? 'flex-end' : 'center',
                width: isMobile ? 'max-content' : 'auto',
              }}
            >
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => isMobile && setIsOpen(false)}
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
