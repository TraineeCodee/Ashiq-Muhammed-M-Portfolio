import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import { isMuted, toggleMute } from '../utils/audioManager';

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
  const [muted, setMuted] = useState(isMuted());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMuteToggle = (e) => {
      setMuted(e.detail.isMuted);
    };
    window.addEventListener('mute_toggle', handleMuteToggle);
    return () => window.removeEventListener('mute_toggle', handleMuteToggle);
  }, []);

  const handleVolumeClick = (e) => {
    e.stopPropagation();
    const newState = toggleMute();
    setMuted(newState);
  };

  return (
    <>
      <style>{`
        .nav-container {
          position: fixed;
          top: 2rem;
          left: 0;
          width: 100vw;
          z-index: 10000;
          display: flex;
          justify-content: center;
          pointer-events: none;
        }
        
        .nav-glass {
          display: flex;
          gap: 2rem;
          padding: 1rem 3rem;
          border-radius: 50px;
          background: ${scrolled ? 'rgba(5, 5, 5, 0.85)' : 'rgba(255, 255, 255, 0.03)'};
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          pointer-events: auto;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          border: 1px solid rgba(0, 255, 255, 0.1);
          align-items: center;
        }

        .mobile-nav-header {
          display: none;
        }

        .hamburger-btn {
          display: none;
          background: transparent;
          border: none;
          color: #fff;
          align-items: center;
          justify-content: center;
          padding: 0.25rem;
          cursor: none;
        }

        .nav-links-desktop {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .nav-links-mobile {
          display: none;
        }

        @media (max-width: 768px) {
          .nav-container {
            top: 1.5rem;
            justify-content: flex-end;
            padding-right: 1.5rem;
          }
          
          .nav-glass {
            flex-direction: column;
            gap: 0;
            padding: 0.75rem;
            border-radius: ${isOpen ? '20px' : '50%'};
            background: ${scrolled || isOpen ? 'rgba(5, 5, 5, 0.85)' : 'rgba(255, 255, 255, 0.03)'};
            align-items: flex-end;
            overflow: hidden;
          }

          .mobile-nav-header {
            display: flex !important;
            gap: 1rem;
            align-items: center;
          }

          .hamburger-btn {
            display: flex;
          }

          .nav-links-desktop {
            display: none;
          }

          .nav-links-mobile {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            padding: 1.5rem 0.5rem 0.5rem 2rem;
            align-items: flex-end;
          }
        }
      `}</style>

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.5 }}
        className="nav-container"
      >
        <div className="nav-glass">
          <div className="mobile-nav-header">
            <button
              onClick={handleVolumeClick}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.25rem',
                cursor: 'none',
              }}
              aria-label="Toggle mute"
            >
              {muted ? <VolumeX size={24} color="#FF00FF" /> : <Volume2 size={24} color="#00FFFF" />}
            </button>
            <button
              className="hamburger-btn"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={28} color="#00FFFF" /> : <Menu size={28} color="#00FFFF" />}
            </button>
          </div>

          <div className="nav-links-desktop">
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
            <button
              onClick={handleVolumeClick}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.25rem',
                marginLeft: '1rem',
                cursor: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#00FFFF';
                e.currentTarget.style.filter = 'drop-shadow(0 0 8px rgba(0,255,255,0.5))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.filter = 'none';
              }}
              aria-label="Toggle mute"
            >
              {muted ? <VolumeX size={20} color="#FF00FF" /> : <Volume2 size={20} color="#00FFFF" />}
            </button>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="nav-links-mobile"
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
    </>
  );
};

export default Navigation;
