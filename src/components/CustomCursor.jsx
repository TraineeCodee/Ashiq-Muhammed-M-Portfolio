import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Sparkles, Trophy } from 'lucide-react';
import { playGem, playHover, playLevelUp, playClick } from '../utils/audioManager';


const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [score, setScore] = useState(() => {
    return parseInt(localStorage.getItem('cursor_score') || '0', 10);
  });
  const [xp, setXp] = useState(() => {
    return parseInt(localStorage.getItem('cursor_xp') || '0', 10);
  });
  const [level, setLevel] = useState(() => {
    return parseInt(localStorage.getItem('cursor_level') || '1', 10);
  });

  const [particles, setParticles] = useState([]);
  const [gems, setGems] = useState([]);
  const [popups, setPopups] = useState([]);
  const [combo, setCombo] = useState(0);
  const [isTouch, setIsTouch] = useState(false);

  const lastPos = useRef({ x: 0, y: 0 });
  const loopRef = useRef(null);
  const gemsRef = useRef([]);
  const comboTimer = useRef(null);

  // Detect touch screen capabilities on mount
  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Sync ref with state for use inside animation loop
  useEffect(() => {
    gemsRef.current = gems;
  }, [gems]);

  // Level Names mapping
  const levelNames = {
    1: 'Pixel Cadet',
    2: 'Cursor Runner',
    3: 'Arcade Hopper',
    4: 'UI Slayer',
    5: 'Unity Knight',
    6: 'Vibe Master'
  };

  const getLevelName = (lvl) => levelNames[lvl] || 'Console Legend';

  // Persistence helpers
  // Dynamic max XP calculation based on Level (e.g., Level 1 needs 100 XP, Level 2 needs 150 XP, etc.)
  const getXpNeeded = (lvl) => 100 + (lvl - 1) * 50;

  const addXp = (amount, sourceText = '') => {
    setXp((prevXp) => {
      let newXp = prevXp + amount;
      let newLevel = level;
      let needed = getXpNeeded(newLevel);
      
      // Level Up condition (XP required increases with level)
      while (newXp >= needed) {
        newXp -= needed;
        newLevel += 1;
        needed = getXpNeeded(newLevel);
        // Level up popup
        triggerPopup(`Level Up! ${getLevelName(newLevel)}`, position.x, position.y - 40, '#00FFFF');
        playLevelUp();
      }

      setLevel(newLevel);
      localStorage.setItem('cursor_level', newLevel.toString());
      localStorage.setItem('cursor_xp', newXp.toString());
      return newXp;
    });

    setScore((prevScore) => {
      const newScore = prevScore + amount;
      localStorage.setItem('cursor_score', newScore.toString());
      return newScore;
    });

    if (sourceText) {
      triggerPopup(sourceText, position.x, position.y, amount > 15 ? '#FF00FF' : '#00FFFF');
    }
  };

  const triggerPopup = (text, x, y, color = '#00FFFF') => {
    const id = Math.random();
    setPopups((prev) => [...prev, { id, text, x, y, color }]);
    setTimeout(() => {
      setPopups((prev) => prev.filter((p) => p.id !== id));
    }, 1000);
  };

  // Listen to external XP awards (like from VibeBot chatbot interactions)
  useEffect(() => {
    const handleExternalXp = (e) => {
      if (e.detail && e.detail.amount) {
        // Dispatch popup near screen center if cursor position is out of view
        const px = position.x > 0 ? position.x : window.innerWidth / 2;
        const py = position.y > 0 ? position.y : window.innerHeight / 2;
        addXp(e.detail.amount, e.detail.text || '');
      }
    };
    window.addEventListener('add_cursor_xp', handleExternalXp);
    return () => window.removeEventListener('add_cursor_xp', handleExternalXp);
  }, [level, xp, position]);

  // Spawn retro game XP gems
  useEffect(() => {
    const spawnGem = () => {
      if (gemsRef.current.length >= 4) return;

      const newGem = {
        id: Math.random(),
        x: Math.random() * (window.innerWidth - 100) + 50,
        y: Math.random() * (window.innerHeight - 100) + 50,
        color: Math.random() > 0.5 ? '#00FFFF' : '#FF00FF',
        size: Math.random() * 8 + 8,
        pulseSpeed: Math.random() * 2 + 1,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.5 + 0.2
      };

      setGems((prev) => [...prev, newGem]);
    };

    const interval = setInterval(spawnGem, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMove = (x, y) => {
      setPosition({ x, y });

      if (isTouch) {
        // Optimize mobile: do not spawn particles or update state on swipe/touch move
        lastPos.current = { x, y };
        return;
      }

      // Spawn trail particle if pointer moves far enough
      const dist = Math.hypot(x - lastPos.current.x, y - lastPos.current.y);
      const minDistance = 20;
      
      if (dist > minDistance) {
        const id = Math.random();
        const p = {
          id,
          x,
          y,
          color: Math.random() > 0.5 ? '#00FFFF' : '#FF00FF',
          size: 6,
          maxLife: 25,
          life: 25
        };
        setParticles((prev) => [...prev.slice(-25), p]);
        lastPos.current = { x, y };

        // Award trace points for exploring
        if (Math.random() > 0.95) {
          addXp(1, '+1 Move XP');
        }
      }
    };

    const onMouseMove = (e) => {
      handleMove(e.clientX, e.clientY);
    };

    const onTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    if (isTouch) {
      window.addEventListener('touchstart', onTouchMove);
      window.addEventListener('touchmove', onTouchMove);
    } else {
      window.addEventListener('mousemove', onMouseMove);
    }

    return () => {
      if (isTouch) {
        window.removeEventListener('touchstart', onTouchMove);
        window.removeEventListener('touchmove', onTouchMove);
      } else {
        window.removeEventListener('mousemove', onMouseMove);
      }
    };
  }, [position, isTouch]);

  // Hook hover rewards to elements
  useEffect(() => {
    const handleElementHover = (e) => {
      if (isTouch) return;
      playHover();
      // Combo multiplier on hovers
      setCombo((c) => {
        const nextCombo = c + 1;
        clearTimeout(comboTimer.current);
        comboTimer.current = setTimeout(() => setCombo(0), 1500); // reset combo after 1.5s
        
        let xpReward = 5;
        let bonusText = `Hover! +5 XP`;
        if (nextCombo > 2) {
          xpReward += nextCombo * 2;
          bonusText = `Combo x${nextCombo}! +${xpReward} XP`;
        }

        addXp(xpReward, bonusText);
        return nextCombo;
      });
    };

    // Attach listener to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .glass:not(.no-hover-xp), .skills-card:not(.no-hover-xp)');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleElementHover);
    });

    return () => {
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleElementHover);
      });
    };
  }, [position]);

  // Global click sound handler for interactive elements
  useEffect(() => {
    const handleGlobalClick = (e) => {
      const target = e.target;
      if (target && target.closest && target.closest('a, button, [role="button"], input, select, textarea, summary, .skills-card')) {
        playClick();
      }
    };
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  // Main game animation loop (trail fading & gem magnetic attraction)
  useEffect(() => {
    const updateLoop = () => {
      // 1. Fade particles (only if they exist)
      setParticles((prev) => {
        if (prev.length === 0) return prev;
        return prev
          .map((p) => ({ ...p, life: p.life - 1 }))
          .filter((p) => p.life > 0);
      });

      // 2. Magnetic collection logic for Gems
      setGems((prev) => {
        if (prev.length === 0) return prev;
        return prev
          .map((gem) => {
            const dx = position.x - gem.x;
            const dy = position.y - gem.y;
            const dist = Math.hypot(dx, dy);

            // Magnetic attraction range (150px)
            if (dist < 150) {
              const speed = (150 - dist) * 0.1; // accelerate closer
              return {
                ...gem,
                x: gem.x + (dx / dist) * speed,
                y: gem.y + (dy / dist) * speed,
                isAttracted: true
              };
            }

            // Normal idle float movement
            const newAngle = gem.angle + 0.02;
            return {
              ...gem,
              x: gem.x + Math.cos(newAngle) * gem.speed,
              y: gem.y + Math.sin(newAngle) * gem.speed,
              angle: newAngle,
              isAttracted: false
            };
          })
          .filter((gem) => {
            const dist = Math.hypot(position.x - gem.x, position.y - gem.y);
            // Collect gem if it collides with cursor
            if (dist < 22) {
              // Particle burst on collect
              spawnBurst(gem.x, gem.y, gem.color);
              addXp(20, 'Gem Collected! +20 XP');
              playGem();
              return false; // delete gem
            }
            return true;
          });
      });

      loopRef.current = requestAnimationFrame(updateLoop);
    };

    loopRef.current = requestAnimationFrame(updateLoop);
    return () => cancelAnimationFrame(loopRef.current);
  }, [position]);

  const spawnBurst = (x, y, color) => {
    const burstCount = 8;
    const burstParticles = [];
    for (let i = 0; i < burstCount; i++) {
      const angle = (i / burstCount) * Math.PI * 2;
      const speed = Math.random() * 3 + 2;
      const id = Math.random();
      const p = {
        id,
        x,
        y,
        color,
        size: Math.random() * 4 + 3,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 20,
        maxLife: 20
      };
      burstParticles.push(p);
    }
    setParticles((prev) => [...prev, ...burstParticles]);
  };

  return (
    <>
      {/* Global CSS to disable default cursor ONLY on non-touch (mouse) devices */}
      {!isTouch && (
        <style>{`
          body, a, button, [role="button"] {
            cursor: none !important;
          }
        `}</style>
      )}

      <div 
        className="glass no-hover-xp" 
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 9999,
          padding: '1.2rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          minWidth: '220px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          border: '1px solid rgba(0, 255, 255, 0.15)',
          pointerEvents: 'auto',
          fontSize: '0.9rem',
          fontFamily: 'Space Grotesk'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#00FFFF', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Trophy size={16} /> Lvl {level}
          </span>
          <span style={{ color: '#a0a0a0', fontSize: '0.8rem' }}>{getLevelName(level)}</span>
        </div>

        {/* XP Bar */}
        <div style={{ background: 'rgba(255,255,255,0.05)', height: '6px', borderRadius: '3px', overflow: 'hidden', position: 'relative' }}>
          <div style={{ width: `${(xp / getXpNeeded(level)) * 100}%`, height: '100%', background: 'linear-gradient(to right, #00FFFF, #FF00FF)', transition: 'width 0.3s' }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#888' }}>
          <span>XP: {xp}/{getXpNeeded(level)}</span>
          <span style={{ color: '#fff' }}>Score: {score}</span>
        </div>

        {/* Combo Tracker */}
        {combo > 1 && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ 
              color: '#FF00FF', 
              fontSize: '0.75rem', 
              textAlign: 'center', 
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              textShadow: '0 0 5px rgba(255,0,255,0.3)'
            }}
          >
            Combo x{combo}! 🔥
          </motion.div>
        )}
      </div>

      {/* 2. Custom Gamepad Pointer (only on desktop/mouse devices) */}
      {!isTouch && (
        <div
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
            pointerEvents: 'none',
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.05s ease-out'
          }}
        >
          {/* Glowing Cursor Center */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
            <Gamepad2 
              size={26} 
              color={combo > 2 ? '#FF00FF' : '#00FFFF'} 
              style={{ 
                transform: 'translate(-50%, -50%)',
                filter: `drop-shadow(0 0 8px ${combo > 2 ? '#FF00FF' : '#00FFFF'})`,
                transition: 'color 0.2s'
              }} 
            />
          </div>
        </div>
      )}

      {/* 3. Glowing XP Trace Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'fixed',
            left: p.x,
            top: p.y,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            borderRadius: '50%',
            opacity: p.life / p.maxLife,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 999990,
            boxShadow: `0 0 10px ${p.color}`,
            // If the particle has velocity (burst particles), apply translation
            marginLeft: p.vx ? `${(p.maxLife - p.life) * p.vx}px` : 0,
            marginTop: p.vy ? `${(p.maxLife - p.life) * p.vy}px` : 0,
          }}
        />
      ))}

      {/* 4. Magnetic Floating XP Gems */}
      {gems.map((gem) => (
        <div
          key={gem.id}
          style={{
            position: 'fixed',
            left: gem.x,
            top: gem.y,
            width: `${gem.size}px`,
            height: `${gem.size}px`,
            border: `2px solid ${gem.color}`,
            background: 'rgba(5, 5, 5, 0.4)',
            boxShadow: gem.isAttracted 
              ? `0 0 25px ${gem.color}` 
              : `0 0 12px ${gem.color}`,
            transform: 'translate(-50%, -50%) rotate(45deg)',
            pointerEvents: 'none',
            zIndex: 999995,
            transition: gem.isAttracted ? 'none' : 'box-shadow 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Inner glowing pixel spark */}
          <div style={{ width: '4px', height: '4px', background: '#fff', borderRadius: '50%' }} />
        </div>
      ))}

      {/* 5. XP Floating Score Popups */}
      <AnimatePresence>
        {popups.map((popup) => (
          <motion.div
            key={popup.id}
            initial={{ opacity: 0, y: 0, scale: 0.8 }}
            animate={{ opacity: 1, y: -45, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              left: popup.x + 15,
              top: popup.y - 15,
              color: popup.color,
              fontFamily: 'Space Grotesk',
              fontWeight: 800,
              fontSize: '0.85rem',
              zIndex: 999998,
              pointerEvents: 'none',
              textShadow: '0 0 6px rgba(0,0,0,0.8), 0 0 4px rgba(0,255,255,0.4)',
            }}
          >
            {popup.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
};

export default CustomCursor;
