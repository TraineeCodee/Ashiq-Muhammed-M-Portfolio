import React, { useState, useEffect, useRef } from 'react';
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
import Chatbot from './components/Chatbot';
import { Mail, Phone, AtSign, Code, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';

function App() {
  const [progress, setProgress] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [coins, setCoins] = useState([]);
  const [coinsCollected, setCoinsCollected] = useState(0);
  const progressRef = useRef(0);

  // Sync ref with progress changes to prevent stale closures
  useEffect(() => {
    progressRef.current = progress;
    if (progress >= 100) {
      setCoins([]);
    }
  }, [progress]);

  // Progressive background loading simulation (snappy load rate)
  useEffect(() => {
    let timer;
    if (progress < 100) {
      timer = setTimeout(() => {
        setProgress((prev) => {
          const increment = Math.floor(Math.random() * 4) + 2; // 2% to 5%
          return Math.min(100, prev + increment);
        });
      }, Math.random() * 100 + 80); // 80ms to 180ms (average 130ms)
    }
    return () => clearTimeout(timer);
  }, [progress]);

  // Spawn pixel coins during load screen
  useEffect(() => {
    if (isStarted) {
      setCoins([]);
      return;
    }

    const spawnInterval = setInterval(() => {
      // Clear interval if progress reaches 100
      if (progressRef.current >= 100) {
        clearInterval(spawnInterval);
        setCoins([]);
        return;
      }

      // Limit active coins on screen to 5
      setCoins((prev) => {
        if (prev.length >= 5) return prev;
        const newCoin = {
          id: Math.random(),
          x: Math.random() * 70 + 15, // 15% to 85% width
          y: Math.random() * 50 + 20, // 20% to 70% height
          xp: 15
        };
        return [...prev, newCoin];
      });
    }, 1000); // spawn fast to keep up with loading speed

    return () => clearInterval(spawnInterval);
  }, [isStarted]);

  const handleCoinClick = (coinId, coinXp) => {
    setCoins((prev) => prev.filter((c) => c.id !== coinId));
    setCoinsCollected((prev) => prev + 1);
    setProgress((p) => Math.min(100, p + 12)); // Boosts loading speed by 12% per coin!

    // Dispatch XP reward to the custom cursor stats!
    window.dispatchEvent(
      new CustomEvent('add_cursor_xp', {
        detail: { amount: coinXp, text: `Loading Quest! +${coinXp} XP 🪙` }
      })
    );
  };

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
      <Chatbot />
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
          background: 'radial-gradient(circle at center, #12121c 0%, #030305 100%)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2.5rem',
          pointerEvents: isStarted ? 'none' : 'auto',
          overflow: 'hidden'
        }}
      >
        {/* Ambient Drifting Blurs (Cyber Arcade Vibes) */}
        <motion.div 
          animate={{ x: [-60, 60, -60], y: [-30, 30, -30] }}
          transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
          style={{ position: 'absolute', width: '380px', height: '380px', borderRadius: '50%', background: 'rgba(0, 255, 255, 0.05)', filter: 'blur(90px)', top: '10%', left: '10%', pointerEvents: 'none', zIndex: 1 }}
        />
        <motion.div 
          animate={{ x: [60, -60, 60], y: [30, -30, 30] }}
          transition={{ repeat: Infinity, duration: 15, ease: 'easeInOut' }}
          style={{ position: 'absolute', width: '380px', height: '380px', borderRadius: '50%', background: 'rgba(255, 0, 255, 0.05)', filter: 'blur(90px)', bottom: '10%', right: '10%', pointerEvents: 'none', zIndex: 1 }}
        />

        {/* Scrolling Grid Background (Tron/Cyberpunk aesthetics) */}
        <motion.div 
          animate={{ backgroundPositionY: ['0px', '40px'] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            zIndex: 1,
            pointerEvents: 'none',
            opacity: 0.8
          }}
        />

        {/* Faint Retro CRT Scanline Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.15) 50%)',
          backgroundSize: '100% 4px',
          zIndex: 2,
          pointerEvents: 'none',
          opacity: 0.5
        }} />

        {/* Floating clicker coins during load screen */}
        <AnimatePresence>
          {coins.map((coin) => (
            <motion.div
              key={coin.id}
              onClick={() => handleCoinClick(coin.id, coin.xp)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, y: [0, -10, 0] }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ 
                y: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
                scale: { duration: 0.2 }
              }}
              style={{
                position: 'absolute',
                left: `${coin.x}%`,
                top: `${coin.y}%`,
                width: '46px',
                height: '46px',
                background: 'rgba(255, 215, 0, 0.12)',
                border: '2px solid #FFD700',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'none',
                boxShadow: '0 0 15px rgba(255, 215, 0, 0.3)',
                zIndex: 10000,
                pointerEvents: 'auto'
              }}
            >
              {/* Inner pixel gold star */}
              <svg width="20" height="20" viewBox="0 0 9 9" fill="#FFD700">
                <rect x="4" y="1" width="1" height="1" />
                <rect x="3" y="2" width="3" height="1" />
                <rect x="2" y="3" width="5" height="1" />
                <rect x="1" y="4" width="7" height="1" />
                <rect x="2" y="5" width="5" height="1" />
                <rect x="3" y="6" width="3" height="1" />
                <rect x="4" y="7" width="1" height="1" />
              </svg>
            </motion.div>
          ))}
        </AnimatePresence>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '90%', maxWidth: '350px', zIndex: 10 }}>
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

          {/* Progress bar with pixel invader riding it */}
          <div style={{ width: '100%', position: 'relative', marginTop: '1.5rem' }}>
            {/* Pixel Space Invader */}
            <motion.div
              style={{
                position: 'absolute',
                bottom: '18px',
                left: `${progress}%`,
                transform: 'translateX(-50%)',
                transition: 'left 0.15s ease-out',
                pointerEvents: 'none'
              }}
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 0.5, ease: 'easeInOut' }}
            >
              <svg width="24" height="18" viewBox="0 0 11 8" fill="#00FFFF" style={{ filter: 'drop-shadow(0 0 6px rgba(0, 255, 255, 0.8))' }}>
                <rect x="2" y="0" width="1" height="1" />
                <rect x="8" y="0" width="1" height="1" />
                <rect x="3" y="1" width="1" height="1" />
                <rect x="7" y="1" width="1" height="1" />
                <rect x="2" y="2" width="7" height="1" />
                <rect x="1" y="3" width="2" height="1" />
                <rect x="4" y="3" width="3" height="1" />
                <rect x="8" y="3" width="2" height="1" />
                <rect x="0" y="4" width="11" height="1" />
                <rect x="0" y="5" width="1" height="1" />
                <rect x="2" y="5" width="7" height="1" />
                <rect x="10" y="5" width="1" height="1" />
                <rect x="0" y="6" width="1" height="1" />
                <rect x="2" y="6" width="1" height="1" />
                <rect x="8" y="6" width="1" height="1" />
                <rect x="10" y="6" width="1" height="1" />
                <rect x="3" y="7" width="2" height="1" />
                <rect x="6" y="7" width="2" height="1" />
              </svg>
            </motion.div>

            {/* Retro LED Block Progress Bar */}
            <div style={{ width: '100%', height: '14px', background: 'rgba(255,255,255,0.03)', border: '2px solid rgba(0,255,255,0.2)', padding: '2px', display: 'flex', alignItems: 'center' }}>
              <div 
                style={{ 
                  width: `${progress}%`, 
                  height: '100%', 
                  backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 6px, #050505 6px, #050505 8px), linear-gradient(to right, #00FFFF, #FF00FF)`,
                  transition: 'width 0.15s ease-out' 
                }} 
              />
            </div>
          </div>

          {/* Interactive loader quest help text */}
          {progress < 100 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ 
                fontSize: '0.75rem', 
                color: '#FFD700', 
                fontFamily: 'Space Grotesk', 
                letterSpacing: '1.5px', 
                textAlign: 'center',
                textTransform: 'uppercase',
                fontWeight: 600,
                marginTop: '1rem',
                textShadow: '0 0 8px rgba(255, 215, 0, 0.3)'
              }}
            >
              🪙 Click floating pixel coins to boost speed & claim XP!
            </motion.div>
          ) : (
            <div style={{ fontSize: '0.8rem', color: '#00FFFF', fontFamily: 'Space Grotesk', fontWeight: 600, letterSpacing: '1px', marginTop: '1rem' }}>
              Quest Complete! {coinsCollected} Coins Secured.
            </div>
          )}
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
