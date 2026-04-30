import React from 'react';
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
  return (
    <>
      <CustomCursor />
      <Navigation />
      <InteractiveBackground />

      {/* Cinematic Preloader Curtain */}
      <motion.div 
        initial={{ y: 0 }}
        animate={{ y: '-100vh' }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.8 }}
        style={{
          position: 'fixed',
          top: 0, left: 0, width: '100vw', height: '100vh',
          background: '#050505',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <motion.div 
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.6 }}
          style={{ 
            fontSize: '1.5rem', 
            color: '#00FFFF', 
            fontFamily: 'Space Grotesk', 
            letterSpacing: '10px',
            textShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
          }}
        >
          SYSTEM INITIATING
        </motion.div>
      </motion.div>

      {/* Main Content Entrance Animation */}
      <motion.main
        initial={{ opacity: 0, y: 50, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 1.2 }}
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
