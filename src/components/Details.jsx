import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Target, Zap } from 'lucide-react';

const Details = () => {
  // We'll use a simple state to track mouse position for a dynamic 3D tilt effect on the image
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [lvl, setLvl] = useState('1');
  const [xp, setXp] = useState('0');
  const [score, setScore] = useState('0');
  const [maxXp, setMaxXp] = useState('100');

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isFlipped) {
      const currentLvl = parseInt(localStorage.getItem('cursor_level') || '1');
      setLvl(currentLvl.toString());
      setXp(localStorage.getItem('cursor_xp') || '0');
      setScore(localStorage.getItem('cursor_score') || '0');
      setMaxXp((100 + (currentLvl - 1) * 50).toString());
    }
  }, [isFlipped]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top;  // y position within the element
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (max 15 degrees)
    const rotateXValue = ((y - centerY) / centerY) * -15;
    const rotateYValue = ((x - centerX) / centerX) * 15;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section id="about" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: isMobile ? '3rem 1.2rem' : '5rem 2rem',
      position: 'relative',
      zIndex: 20
    }}>
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: isMobile ? '2.5rem' : '4rem',
        alignItems: 'center'
      }}>
        
        {/* Dynamic Profile / Attribute Card Side */}
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
            perspective: '1000px',
            width: '100%',
            maxWidth: '400px',
            margin: '0 auto'
          }}
        >
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{
              rotateX,
              rotateY: isFlipped ? 180 + rotateY : rotateY,
            }}
            transition={{ type: 'spring', stiffness: 180, damping: 20, mass: 0.8 }}
            style={{
              width: '100%',
              aspectRatio: isMobile ? 'auto' : '3/4',
              minHeight: isMobile ? '590px' : 'auto',
              borderRadius: '24px',
              position: 'relative',
              transformStyle: 'preserve-3d',
              cursor: 'none'
            }}
          >
            {/* Front Side: Profile Picture */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              zIndex: isFlipped ? 0 : 2,
              transformStyle: 'preserve-3d'
            }}>
              {/* Glow Layer */}
              <div style={{
                position: 'absolute',
                inset: '-5px',
                background: 'linear-gradient(45deg, #00FFFF, #FF00FF)',
                borderRadius: '28px',
                filter: 'blur(20px)',
                opacity: 0.5,
                transform: 'translateZ(-20px)'
              }} />
              
              {/* Image Layer */}
              <div className="glass" style={{
                width: '100%',
                height: '100%',
                borderRadius: '24px',
                padding: '10px',
                transform: 'translateZ(20px)'
              }}>
                <img 
                  src="/me.jpeg" 
                  alt="Ashiq Muhammed M"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '16px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    filter: 'contrast(1.1) brightness(0.9)'
                  }}
                />
              </div>
            </div>

            {/* Back Side: Player Attribute Card */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg) translateZ(20px)',
              zIndex: isFlipped ? 2 : 0,
              transformStyle: 'preserve-3d'
            }}>
              {/* Pulsing Backside Glow Layer */}
              <motion.div 
                animate={{ 
                  opacity: [0.4, 0.65, 0.4],
                  scale: [0.99, 1.02, 0.99]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 4, 
                  ease: 'easeInOut' 
                }}
                style={{
                  position: 'absolute',
                  inset: '-5px',
                  background: 'linear-gradient(45deg, #FF00FF, #00FFFF)',
                  borderRadius: '28px',
                  filter: 'blur(20px)',
                  transform: 'translateZ(-20px)'
                }} 
              />

              <div className="glass no-hover-xp" style={{
                width: '100%',
                height: '100%',
                borderRadius: '24px',
                padding: isMobile ? '1.2rem 1rem' : '2rem 1.6rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid rgba(0, 255, 255, 0.25)',
                boxShadow: '0 0 25px rgba(0, 255, 255, 0.1)',
                color: '#fff',
                fontFamily: 'Space Grotesk',
                overflow: 'hidden',
                position: 'relative'
              }}>
                {/* Holographic Sheen Sweep Effect */}
                <motion.div
                  initial={{ x: '-100%', y: '-100%' }}
                  animate={isFlipped ? { x: '100%', y: '100%' } : { x: '-100%', y: '-100%' }}
                  transition={{ repeat: Infinity, repeatDelay: 3.5, duration: 1.8, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0) 70%)',
                    pointerEvents: 'none',
                    zIndex: 3
                  }}
                />

                {/* Card Title */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.6rem', zIndex: 2 }}>
                  <span style={{ fontSize: '0.78rem', color: '#00FFFF', letterSpacing: '2px', fontWeight: 700, textTransform: 'uppercase' }}>Character Sheet</span>
                  <span style={{ fontSize: '0.8rem', color: '#FF00FF', fontWeight: 700, border: '1px solid rgba(255,0,255,0.3)', padding: '2px 8px', borderRadius: '4px', background: 'rgba(255,0,255,0.05)' }}>LVL {lvl}</span>
                </div>

                {/* Name & Class */}
                <div style={{ marginTop: '0.5rem', zIndex: 2 }}>
                  <h4 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, letterSpacing: '-0.5px' }}>Ashiq Muhammed M</h4>
                  <span style={{ fontSize: '0.78rem', color: '#a0a0a0' }}>Unity Specialist / UI Knight</span>
                </div>

                {/* Overall Skill Bar */}
                <div style={{ margin: '0.4rem 0', zIndex: 2 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.15rem' }}>
                    <span style={{ color: '#FFD700', fontWeight: 700 }}>Overall Mastery (OVL)</span>
                    <span style={{ color: '#FFD700', fontWeight: 700 }}>87%</span>
                  </div>
                  <div style={{ width: '100%', height: '5px', background: 'rgba(255,215,0,0.1)', borderRadius: '3px', overflow: 'hidden', border: '1px solid rgba(255,215,0,0.15)' }}>
                    <div style={{ width: '87%', height: '100%', background: 'linear-gradient(to right, #FFD700, #FFA500)' }} />
                  </div>
                </div>

                {/* Attributes bars (2-Column Grid) */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: isMobile ? '0.5rem 0.6rem' : '0.6rem 0.8rem',
                  margin: '0.4rem 0',
                  zIndex: 2
                }}>
                  {/* Skill 1 */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '0.1rem' }}>
                      <span style={{ color: '#dfdfdf' }}>🎮 Game Dev</span>
                      <span style={{ color: '#00FFFF', fontWeight: 700 }}>88%</span>
                    </div>
                    <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: '88%', height: '100%', background: 'linear-gradient(to right, #00FFFF, #FF00FF)' }} />
                    </div>
                  </div>
                  {/* Skill 2 */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '0.1rem' }}>
                      <span style={{ color: '#dfdfdf' }}>🎨 UI/UX Design</span>
                      <span style={{ color: '#FF00FF', fontWeight: 700 }}>88%</span>
                    </div>
                    <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: '88%', height: '100%', background: 'linear-gradient(to right, #FF00FF, #00FFFF)' }} />
                    </div>
                  </div>
                  {/* Skill 3 */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '0.1rem' }}>
                      <span style={{ color: '#dfdfdf' }}>⚙️ Tech Art</span>
                      <span style={{ color: '#00FFFF', fontWeight: 700 }}>86%</span>
                    </div>
                    <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: '86%', height: '100%', background: 'linear-gradient(to right, #00FFFF, #FF00FF)' }} />
                    </div>
                  </div>
                  {/* Skill 4 */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '0.1rem' }}>
                      <span style={{ color: '#dfdfdf' }}>💻 Programming</span>
                      <span style={{ color: '#FF00FF', fontWeight: 700 }}>80%</span>
                    </div>
                    <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: '80%', height: '100%', background: 'linear-gradient(to right, #FF00FF, #00FFFF)' }} />
                    </div>
                  </div>
                  {/* Skill 5 */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '0.1rem' }}>
                      <span style={{ color: '#dfdfdf' }}>🧩 Prob Solving</span>
                      <span style={{ color: '#00FFFF', fontWeight: 700 }}>84%</span>
                    </div>
                    <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: '84%', height: '100%', background: 'linear-gradient(to right, #00FFFF, #FF00FF)' }} />
                    </div>
                  </div>
                  {/* Skill 6 */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '0.1rem' }}>
                      <span style={{ color: '#dfdfdf' }}>🤝 Teamwork</span>
                      <span style={{ color: '#FF00FF', fontWeight: 700 }}>94%</span>
                    </div>
                    <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: '94%', height: '100%', background: 'linear-gradient(to right, #FF00FF, #00FFFF)' }} />
                    </div>
                  </div>
                  {/* Skill 7 */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '0.1rem' }}>
                      <span style={{ color: '#dfdfdf' }}>🚀 Leadership</span>
                      <span style={{ color: '#00FFFF', fontWeight: 700 }}>88%</span>
                    </div>
                    <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: '88%', height: '100%', background: 'linear-gradient(to right, #00FFFF, #FF00FF)' }} />
                    </div>
                  </div>
                  {/* Skill 8 */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '0.1rem' }}>
                      <span style={{ color: '#dfdfdf' }}>📢 Communication</span>
                      <span style={{ color: '#FF00FF', fontWeight: 700 }}>90%</span>
                    </div>
                    <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: '90%', height: '100%', background: 'linear-gradient(to right, #FF00FF, #00FFFF)' }} />
                    </div>
                  </div>
                </div>

                {/* Real-time Player Quest Stats */}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#a0a0a0', background: 'rgba(255,255,255,0.02)', padding: '0.45rem 0.8rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', zIndex: 2 }}>
                  <span>YOUR XP: <strong style={{ color: '#00FFFF' }}>{xp}/{maxXp}</strong></span>
                  <span>SCORE: <strong style={{ color: '#FF00FF' }}>{score} PTS</strong></span>
                </div>

                {/* Rating Card Footer */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '0.5rem 0.8rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', zIndex: 2 }}>
                  <span style={{ fontSize: '0.75rem', color: '#a0a0a0' }}>Quest Rating:</span>
                  <span style={{ fontSize: '0.88rem', color: '#FFD700', fontWeight: 800, letterSpacing: '1px', textShadow: '0 0 5px rgba(255,215,0,0.3)' }}>OVERALL 87%</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Toggle Stats Flip Button */}
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            style={{
              background: 'rgba(0, 255, 255, 0.08)',
              border: '1px solid rgba(0, 255, 255, 0.25)',
              borderRadius: '30px',
              color: '#00FFFF',
              padding: '0.5rem 1.5rem',
              fontSize: '0.82rem',
              fontWeight: 700,
              fontFamily: 'Space Grotesk',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              cursor: 'none',
              transition: 'all 0.2s',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#00FFFF';
              e.currentTarget.style.background = 'rgba(0, 255, 255, 0.12)';
              e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 255, 255, 0.25)';
              e.currentTarget.style.background = 'rgba(0, 255, 255, 0.08)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
            }}
          >
            {isFlipped ? 'View Portrait 👤' : 'View Stats Card 📊'}
          </button>
        </motion.div>

        {/* Text Details Side */}
        <motion.div 
          className="glass"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{
            padding: isMobile ? '2.2rem 1.5rem' : '4rem',
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? '2rem' : '3rem'
          }}
        >
          <motion.div variants={itemVariants} style={{ display: 'flex', gap: isMobile ? '1.2rem' : '2rem', alignItems: 'flex-start' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width={isMobile ? 32 : 40} height={isMobile ? 32 : 40} viewBox="0 0 24 24" fill="none" stroke="#00FFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <div>
              <h3 style={{ fontSize: isMobile ? '1.5rem' : '2rem', marginBottom: '0.5rem' }}>About Me</h3>
              <p style={{ fontSize: isMobile ? '1.05rem' : '1.2rem', color: '#a0a0a0', lineHeight: 1.6 }}>
                I am a Unity developer and UI/UX designer focused on building interactive experiences and game systems. I enjoy creating intuitive interfaces, smooth user flows, and visually engaging designs that combine creativity with performance.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} style={{ display: 'flex', gap: isMobile ? '1.2rem' : '2rem', alignItems: 'flex-start' }}>
            <MapPin size={isMobile ? 32 : 40} color="#FF00FF" style={{ flexShrink: 0 }} />
            <div>
              <h3 style={{ fontSize: isMobile ? '1.5rem' : '2rem', marginBottom: '0.5rem' }}>Location</h3>
              <p style={{ fontSize: isMobile ? '1.05rem' : '1.2rem', color: '#a0a0a0', lineHeight: 1.6 }}>
                Based in Kerala, India. Working globally on high-impact interactive systems.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} style={{ display: 'flex', gap: isMobile ? '1.2rem' : '2rem', alignItems: 'flex-start' }}>
            <Target size={isMobile ? 32 : 40} color="#00FFFF" style={{ flexShrink: 0 }} />
            <div>
              <h3 style={{ fontSize: isMobile ? '1.5rem' : '2rem', marginBottom: '0.5rem' }}>Focus</h3>
              <p style={{ fontSize: isMobile ? '1.05rem' : '1.2rem', color: '#a0a0a0', lineHeight: 1.6 }}>
                Bridging complex technical backend logic with highly creative, fluid visual systems. 
                The intersection where hardcore programming meets beautiful aesthetics.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} style={{ display: 'flex', gap: isMobile ? '1.2rem' : '2rem', alignItems: 'flex-start' }}>
            <Zap size={isMobile ? 32 : 40} color="#FF00FF" style={{ flexShrink: 0 }} />
            <div>
              <h3 style={{ fontSize: isMobile ? '1.5rem' : '2rem', marginBottom: '0.5rem' }}>Philosophy</h3>
              <p style={{ fontSize: isMobile ? '1.05rem' : '1.2rem', color: '#a0a0a0', lineHeight: 1.6 }}>
                Life isn't about being perfect. It's about iteration: "Build, Reflect, Improve."
              </p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Details;
