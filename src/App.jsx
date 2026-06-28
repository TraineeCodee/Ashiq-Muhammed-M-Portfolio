import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Details from './components/Details';
import Skills from './components/Skills';
import Showcase from './components/Showcase';
import Experience from './components/Experience';
import WhyChooseMe from './components/WhyChooseMe';
import FAQ from './components/FAQ';
import InteractiveBackground from './components/InteractiveBackground';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import { Mail, Phone, AtSign, Code, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import './index.css';

function App() {
  const [progress, setProgress] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    let timer;
    if (progress < 100) {
      timer = setTimeout(() => {
        setProgress((prev) => {
          const increment = Math.floor(Math.random() * 12) + 6;
          return Math.min(100, prev + increment);
        });
      }, Math.random() * 120 + 40);
    }
    return () => clearTimeout(timer);
  }, [progress]);

  const getLoadingText = (p) => {
    if (p < 25) return 'BOOTING CONSOLE MODULE...';
    if (p < 55) return 'GENERATING XP DIAMONDS...';
    if (p < 80) return 'STAGING UNITY TIMELINES...';
    if (p < 99) return 'BOOTING VIBE CURSOR...';
    return 'CONSOLE BOOT SUCCESS!';
  };

  return (
    <>
      <CustomCursor />
      <Navigation />
      <InteractiveBackground />

      {/* Cinematic Preloader Curtain */}
      <motion.div 
        initial={{ y: 0 }}
        animate={{ y: isStarted ? '-100vh' : 0 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: 'fixed',
          top: 0, left: 0, width: '100vw', height: '100vh',
          background: '#050505',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2.5rem',
          pointerEvents: isStarted ? 'none' : 'auto'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '90%', maxWidth: '350px' }}>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ 
              fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)', 
              color: '#00FFFF', 
              fontFamily: 'Space Grotesk', 
              letterSpacing: '4px',
              textShadow: '0 0 15px rgba(0, 255, 255, 0.4)',
              textAlign: 'center',
              textTransform: 'uppercase',
              fontWeight: 700
            }}
          >
            {getLoadingText(progress)}
          </motion.div>

          <div style={{ color: '#fff', fontSize: '2rem', fontWeight: 800, fontFamily: 'Space Grotesk' }}>
            {progress}%
          </div>

          {/* Progress bar */}
          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(0,255,255,0.1)' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(to right, #00FFFF, #FF00FF)', transition: 'width 0.15s ease-out' }} />
          </div>
        </div>

        {/* Start Game Button */}
        {progress === 100 && (
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: [0.96, 1.04, 0.96], opacity: 1 }}
            transition={{ 
              scale: { repeat: Infinity, duration: 1.5, ease: 'easeInOut' },
              opacity: { duration: 0.4 }
            }}
            onClick={() => setIsStarted(true)}
            style={{
              background: 'rgba(0, 255, 255, 0.1)',
              border: '1px solid #00FFFF',
              borderRadius: '50px',
              color: '#00FFFF',
              padding: '0.8rem 2.2rem',
              fontSize: '1.1rem',
              fontWeight: 700,
              fontFamily: 'Space Grotesk',
              letterSpacing: '2px',
              boxShadow: '0 0 25px rgba(0, 255, 255, 0.25)',
              textTransform: 'uppercase',
              pointerEvents: 'auto',
              cursor: 'none'
            }}
          >
            Press Start
          </motion.button>
        )}
      </motion.div>

      {/* Main Content Entrance Animation */}
      <motion.main
        initial={{ opacity: 0, y: 50, scale: 0.98 }}
        animate={{ opacity: isStarted ? 1 : 0, y: isStarted ? 0 : 50, scale: isStarted ? 1 : 0.98 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      >
        <Hero />
        <Details />
        <Skills />
        <Showcase />
        <Experience />
        <WhyChooseMe />
        <FAQ />
        
        {/* Contact Terminal Footer */}
        <section id="contact" style={{
          minHeight: '50vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4rem 2rem',
          position: 'relative',
          zIndex: 20
        }}>
          <div className="glass" style={{
            padding: '4rem',
            textAlign: 'center',
            maxWidth: '800px',
            width: '100%'
          }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '3rem' }}>Drifting Contact Terminal</h2>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
              <a href="mailto:ashiq3107u@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 2rem', background: 'rgba(0, 255, 255, 0.1)', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.3s', fontSize: '1.2rem' }}>
                <Mail /> ashiq3107u@gmail.com
              </a>
              <a href="tel:+916235891584" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 2rem', background: 'rgba(255, 0, 255, 0.1)', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.3s', fontSize: '1.2rem' }}>
                <Phone /> +91 6235891584
              </a>
              <a href="https://linkedin.com/in/ashiq-muhammed-m-" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 2rem', background: 'rgba(0, 255, 255, 0.1)', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.3s', fontSize: '1.2rem' }}>
                <AtSign /> LinkedIn
              </a>
              <a href="https://github.com/TraineeCodee" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 2rem', background: 'rgba(255, 0, 255, 0.1)', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.3s', fontSize: '1.2rem' }}>
                <Code /> GitHub
              </a>
              <a href="https://wa.me/916235891584" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 2rem', background: 'rgba(0, 255, 255, 0.1)', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.3s', fontSize: '1.2rem' }}>
                <MessageCircle /> WhatsApp
              </a>
            </div>
            
            <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', color: '#a0a0a0', fontSize: '1rem' }}>
              &copy; {new Date().getFullYear()} Ashiq Muhammed M. All Rights Reserved.
            </div>
          </div>
        </section>
      </motion.main>
    </>
  );
}

export default App;
