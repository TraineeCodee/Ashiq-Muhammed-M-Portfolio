import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Award, ArrowLeft, HelpCircle } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState('main'); // 'main', 'profile', 'skills', 'works', 'secrets'
  const [xpClaimed, setXpClaimed] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "🤖 AI SYSTEM ONLINE: Welcome to VibeBot. I am Ashiq's natural language dialogue model. Ask me anything, claim hidden XP, or explore options below!"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Dialog tree configuration
  const menus = {
    main: [
      { text: '🧑 Profile & Info', action: 'menu_profile', xp: 5 },
      { text: '🛠️ Skills & Tech', action: 'menu_skills', xp: 5 },
      { text: '🎮 Works & Links', action: 'menu_works', xp: 5 },
      { text: '🔑 Quest Secrets', action: 'menu_secrets', xp: 5 }
    ],
    profile: [
      { text: 'About Ashiq 👤', action: 'about_ashiq', xp: 8 },
      { text: 'Why Hire Him? 🤝', action: 'why_hire', xp: 8 },
      { text: 'Location 📍', action: 'location', xp: 5 },
      { text: '🏠 Back to Main', action: 'back_main', xp: 2 }
    ],
    skills: [
      { text: 'Unity & C# 🎮', action: 'skill_unity', xp: 8 },
      { text: 'Design Stack 🎨', action: 'skill_design', xp: 8 },
      { text: 'Technical Art 📦', action: 'skill_techart', xp: 8 },
      { text: '🏠 Back to Main', action: 'back_main', xp: 2 }
    ],
    works: [
      { text: 'GitHub Repos 💻', action: 'link_github', xp: 10 },
      { text: 'Drive Designs 📁', action: 'link_drive', xp: 10 },
      { text: '🏠 Back to Main', action: 'back_main', xp: 2 }
    ],
    secrets: [
      { text: 'Unlock 50 XP 🔑', action: 'claim_xp', xp: 0 },
      { text: 'Cursor Game Help ❓', action: 'cursor_help', xp: 5 },
      { text: '🏠 Back to Main', action: 'back_main', xp: 2 }
    ]
  };

  // Helper: Simulated Streaming Text
  const streamBotResponse = (fullText) => {
    // Add temporary typing state
    setMessages((prev) => [
      ...prev,
      { id: 'typing', sender: 'bot', text: '', isTyping: true }
    ]);

    setTimeout(() => {
      const msgId = Date.now();
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== 'typing'),
        { id: msgId, sender: 'bot', text: '' }
      ]);

      // If it's a JSX object, render it immediately
      if (typeof fullText !== 'string') {
        setMessages((prev) =>
          prev.map((m) => (m.id === msgId ? { ...m, text: fullText } : m))
        );
        return;
      }

      let currentIndex = 0;
      const interval = setInterval(() => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === msgId ? { ...m, text: fullText.slice(0, currentIndex + 1) } : m
          )
        );
        currentIndex++;
        if (currentIndex >= fullText.length) {
          clearInterval(interval);
        }
      }, 15); // Fast, smooth character typing
    }, 600); // 600ms delay to simulate "thinking"
  };

  const handleMenuClick = (option) => {
    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: option.text
    };
    setMessages((prev) => [...prev, userMsg]);

    // Dispatch exploration XP (if > 0)
    if (option.xp > 0) {
      window.dispatchEvent(
        new CustomEvent('add_cursor_xp', {
          detail: { amount: option.xp, text: `Exploration Bonus! +${option.xp} XP` }
        })
      );
    }

    let replyText = '';
    let nextMenu = currentMenu;

    switch (option.action) {
      // Main categories transitions
      case 'menu_profile':
        replyText = "🧑 Quest: Profile Info unlocked! Select a topic to learn more about Ashiq's background:";
        nextMenu = 'profile';
        break;
      case 'menu_skills':
        replyText = "🛠️ Quest: Skills & Tech stack unlocked! Select a skill block to inspect:";
        nextMenu = 'skills';
        break;
      case 'menu_works':
        replyText = "🎮 Quest: Works & Projects unlocked! Access direct asset/code links below:";
        nextMenu = 'works';
        break;
      case 'menu_secrets':
        replyText = "🔑 Quest: Secrets unlocked! Claim secret codes or get instructions to level up:";
        nextMenu = 'secrets';
        break;

      // Profile category replies
      case 'about_ashiq':
        replyText = "👤 Ashiq Muhammed M is a Unity Game Developer and Graphic/UI Designer. He bridges technical backend systems (C# scripting, mechanics) with gorgeous front-end design aesthetics.";
        break;
      case 'why_hire':
        replyText = "🤝 Why Hire Ashiq? He is a Unity Cinemachine & Timeline cinematic expert, specializes in low-poly 3D assets/animations, and has a professional philosophy of 'Build, Reflect, Improve' to deliver polished products.";
        break;
      case 'location':
        replyText = "📍 Ashiq is based in Kerala, India, and works with clients globally on high-end interactive games and applications.";
        break;

      // Skills category replies
      case 'skill_unity':
        replyText = "🎮 Unity Specialist: Expert in C# gameplay architectures, scripting custom mechanics, and managing complex camera systems (Cinemachine) and cinematics (Timeline).";
        break;
      case 'skill_design':
        replyText = "🎨 Design Expertise: Highly proficient in Figma for wireframing/mockups, and Adobe Photoshop for digital art/UI assets.";
        break;
      case 'skill_techart':
        replyText = "📦 Technical Art: Experienced in Low-poly 3D modeling, integrating animation rigs, and designing responsive gamified HUD interfaces.";
        break;

      // Links category replies
      case 'link_github':
        replyText = (
          <div>
            💻 Inspect Ashiq's source code repositories on GitHub:
            <br /><br />
            <a 
              href="https://github.com/TraineeCodee?tab=repositories" 
              target="_blank" 
              rel="noreferrer" 
              style={{ color: '#00FFFF', textDecoration: 'underline', fontWeight: 700, cursor: 'none' }}
            >
              GitHub Repositories List →
            </a>
          </div>
        );
        break;
      case 'link_drive':
        replyText = (
          <div>
            📁 Inspect Ashiq's digital designs and art samples:
            <br /><br />
            <a 
              href="https://drive.google.com/drive/folders/1u8LKZf7xujbc5mO9N8Hq7Yb-a9JoJdND?usp=drive_link" 
              target="_blank" 
              rel="noreferrer" 
              style={{ color: '#FF00FF', textDecoration: 'underline', fontWeight: 700, cursor: 'none' }}
            >
              Google Drive Portfolio Samples →
            </a>
          </div>
        );
        break;

      // Secrets category replies
      case 'claim_xp':
        if (xpClaimed) {
          replyText = "🔑 You have already claimed this secret quest XP reward! Keep dragging the cursor to find more gems!";
        } else {
          setXpClaimed(true);
          window.dispatchEvent(
            new CustomEvent('add_cursor_xp', {
              detail: { amount: 50, text: 'Secret Claimed! +50 XP 🚀' }
            })
          );
          replyText = "🎉 SECRET QUEST UNLOCKED: Cheat Code 'VIBECODER777' activated! +50 XP successfully awarded to your Custom Cursor stats! level up in the bottom-right corner!";
        }
        break;
      case 'cursor_help':
        replyText = "❓ Cursor Game Info:\n1. Drag mouse/finger to draw glowing particle trails.\n2. Collect floating diamond gems to get +20 XP (they are magnetically attracted when close).\n3. Hover over links/cards to trigger multiplier combos!";
        break;

      // Back to main
      case 'back_main':
        replyText = "🏠 Returned to Main Menu. Inspect another quest block:";
        nextMenu = 'main';
        break;

      default:
        replyText = "Dialog error. Resetting menu...";
        nextMenu = 'main';
    }

    streamBotResponse(replyText);
    setCurrentMenu(nextMenu);
  };

  // Advanced natural-language intent parser
  const getIntelligentReply = (query) => {
    // Random elements to make response feel fresh and non-robotic
    const greetingsIntros = ["Hello Player! 👾", "Hey! 🚀", "Greetings explorer!", "Welcome! 👋"];
    const greetingsOutros = ["How can I help you on your quest today?", "What would you like to inspect?", "Ask me anything!"];
    
    const randomGreetIntro = greetingsIntros[Math.floor(Math.random() * greetingsIntros.length)];
    const randomGreetOutro = greetingsOutros[Math.floor(Math.random() * greetingsOutros.length)];

    // Normalize input
    const text = query.trim().toLowerCase();

    // 1. Secrets / Cheat code
    if (text.includes('cheat') || text.includes('secret') || text.includes('code') || text.includes('xp') || text.includes('777')) {
      if (xpClaimed) {
        return "🔑 You have already claimed your secret quest reward! Explore other buttons to raise your score!";
      }
      setXpClaimed(true);
      window.dispatchEvent(
        new CustomEvent('add_cursor_xp', {
          detail: { amount: 50, text: 'Secret Claimed! +50 XP 🚀' }
        })
      );
      return "🎉 SECRET UNLOCKED! You found the hidden trigger! I have dispatched +50 XP to your custom cursor levels. Watch the bar level-up in the bottom-right corner!";
    }

    // 2. Projects & Links
    if (text.includes('project') || text.includes('game') || text.includes('work') || text.includes('drive') || text.includes('github') || text.includes('link') || text.includes('sample')) {
      return (
        <div>
          🎮 Ashiq specializes in creating detailed 3D games and technical art.
          <br /><br />
          Access his works:
          <div style={{ marginTop: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <a 
              href="https://github.com/TraineeCodee?tab=repositories" 
              target="_blank" 
              rel="noreferrer" 
              style={{ color: '#00FFFF', textDecoration: 'underline', fontWeight: 600, cursor: 'none' }}
            >
              GitHub Code Repositories 💻
            </a>
            <a 
              href="https://drive.google.com/drive/folders/1u8LKZf7xujbc5mO9N8Hq7Yb-a9JoJdND?usp=drive_link" 
              target="_blank" 
              rel="noreferrer" 
              style={{ color: '#FF00FF', textDecoration: 'underline', fontWeight: 600, cursor: 'none' }}
            >
              Google Drive Design Samples 📁
            </a>
          </div>
        </div>
      );
    }

    // 3. Contacts
    if (text.includes('contact') || text.includes('hire') || text.includes('email') || text.includes('phone') || text.includes('mail') || text.includes('number') || text.includes('locate') || text.includes('kerala')) {
      return (
        <div>
          ✉️ Let's connect!
          <br /><br />
          Email: <a href="mailto:ashiq.muhammed.designer@gmail.com" style={{ color: '#00FFFF', textDecoration: 'underline', cursor: 'none' }}>ashiq.muhammed.designer@gmail.com</a>
          <br />
          Phone: <a href="tel:+918848427429" style={{ color: '#FF00FF', textDecoration: 'underline', cursor: 'none' }}>+91 88484 27429</a>
          <br /><br />
          Based in Kerala, India. Working globally!
        </div>
      );
    }

    // 4. Skills & Tech
    if (text.includes('skill') || text.includes('expert') || text.includes('unity') || text.includes('c#') || text.includes('design') || text.includes('figma') || text.includes('photoshop') || text.includes('shader') || text.includes('art')) {
      return "🛠️ Ashiq's technical expertise: Unity Gameplay Systems, advanced C# scripting, Cinemachine camera dynamics, Timeline cinematics, Figma mockups, and Adobe Photoshop designs. Use the 'Skills & Tech' option below to explore details!";
    }

    // 5. About / Identity
    if (text.includes('who') || text.includes('about') || text.includes('name') || text.includes('ashiq') || text.includes('bio')) {
      return "👤 Ashiq Muhammed M is a Unity Game Developer and Graphic/UI Designer. He bridges technical backend systems (C# scripting, mechanics) with gorgeous front-end design aesthetics. Select 'Profile & Info' for details!";
    }

    // 6. Greetings
    if (text.includes('hi') || text.includes('hello') || text.includes('hey') || text.includes('yo') || text.includes('greetings')) {
      return `${randomGreetIntro} I am VibeBot, ready to answer questions about Ashiq's portfolio. ${randomGreetOutro}`;
    }

    // Default fallbacks
    return "🧠 I've processed your message, but it didn't match any specific portfolio keyword. Feel free to type about 'skills', 'projects', 'contact' or use the quest categories below to navigate!";
  };

  const handleCustomSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText;
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: userText
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Stream reply from natural-language model
    const replyText = getIntelligentReply(userText);
    streamBotResponse(replyText);
  };

  return (
    <>
      {/* 1. Chatbot Floating Bubble Button */}
      <div 
        style={{
          position: 'fixed',
          bottom: '2rem',
          left: '2rem',
          zIndex: 9999,
          pointerEvents: 'auto'
        }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)' }}
          whileTap={{ scale: 0.95 }}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'rgba(5, 5, 5, 0.65)',
            border: '2px solid #00FFFF',
            color: '#00FFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'none',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)'
          }}
        >
          {isOpen ? (
            <X size={26} />
          ) : (
            <div style={{ position: 'relative', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Spinning loading indicator ring */}
              <motion.div
                style={{
                  position: 'absolute',
                  inset: '-6px',
                  borderRadius: '50%',
                  border: '2px dashed #00FFFF',
                  opacity: 0.8
                }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
              />
              {/* Cyber Spider Vector Icon */}
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#00FFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 5px rgba(0, 255, 255, 0.6))' }}>
                <circle cx="12" cy="13" r="3" />
                <circle cx="12" cy="8" r="2" />
                <circle cx="12" cy="4" r="1" />
                <path d="M10 8a5 5 0 0 0-6-3" />
                <path d="M9 11a6 6 0 0 0-6 3" />
                <path d="M9 14a6 6 0 0 0-5 5" />
                <path d="M14 8a5 5 0 0 1 6-3" />
                <path d="M15 11a6 6 0 0 1 6 3" />
                <path d="M15 14a6 6 0 0 1 5 5" />
              </svg>
            </div>
          )}
        </motion.button>
      </div>

      {/* 2. Chat Panel Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 260, damping: 25 }}
            className="glass"
            style={{
              position: 'fixed',
              bottom: '6.5rem',
              left: '2rem',
              width: '360px',
              height: '500px',
              zIndex: 9998,
              borderRadius: '24px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 15px 40px rgba(0,0,0,0.6)',
              border: '1px solid rgba(0, 255, 255, 0.2)',
              pointerEvents: 'auto',
              fontFamily: 'Space Grotesk'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '1.2rem',
              background: 'rgba(0, 255, 255, 0.05)',
              borderBottom: '1px solid rgba(0, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }} >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Bot size={22} color="#00FFFF" style={{ filter: 'drop-shadow(0 0 4px rgba(0,255,255,0.4))' }} />
                <div>
                  <h4 style={{ color: '#fff', fontSize: '1.1rem', margin: 0, fontWeight: 700 }}>VibeBot</h4>
                  <span style={{ color: '#00FFFF', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>AI Companion</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                style={{ background: 'none', border: 'none', color: '#888', cursor: 'none', display: 'flex', alignItems: 'center' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Messages */}
            <div style={{
              flex: 1,
              padding: '1.2rem',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              scrollBehavior: 'smooth'
            }}>
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  style={{
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    background: msg.sender === 'user' ? 'rgba(0, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                    border: msg.sender === 'user' ? '1px solid rgba(0, 255, 255, 0.3)' : '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: msg.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                    padding: '0.8rem 1rem',
                    color: msg.sender === 'user' ? '#fff' : '#dfdfdf',
                    fontSize: '0.88rem',
                    lineHeight: 1.45,
                    whiteSpace: 'pre-line',
                    wordBreak: 'break-word',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {msg.isTyping ? (
                    <div style={{ display: 'flex', gap: '0.3rem', padding: '0.2rem 0', alignSelf: 'flex-start' }}>
                      <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} style={{ width: '6px', height: '6px', background: '#00FFFF', borderRadius: '50%' }} />
                      <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.15 }} style={{ width: '6px', height: '6px', background: '#00FFFF', borderRadius: '50%' }} />
                      <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.3 }} style={{ width: '6px', height: '6px', background: '#00FFFF', borderRadius: '50%' }} />
                    </div>
                  ) : (
                    msg.text
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Dynamic RPG Dialogue Chips */}
            <div style={{
              padding: '0.6rem 1rem',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.45rem',
              background: 'rgba(5, 5, 5, 0.2)',
              borderTop: '1px solid rgba(255,255,255,0.03)'
            }}>
              {menus[currentMenu].map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleMenuClick(q)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '20px',
                    color: '#a0a0a0',
                    padding: '0.45rem 0.9rem',
                    fontSize: '0.78rem',
                    cursor: 'none',
                    transition: 'all 0.2s',
                    fontWeight: 500
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#00FFFF';
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.background = 'rgba(0, 255, 255, 0.06)';
                    e.currentTarget.style.boxShadow = '0 0 8px rgba(0, 255, 255, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.color = '#a0a0a0';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {q.text}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form 
              onSubmit={handleCustomSend}
              style={{
                padding: '1rem',
                borderTop: '1px solid rgba(0, 255, 255, 0.1)',
                display: 'flex',
                gap: '0.6rem',
                background: 'rgba(5, 5, 5, 0.45)'
              }}
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about skills, projects..."
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '0.6rem 1rem',
                  color: '#fff',
                  fontSize: '0.9rem',
                  outline: 'none',
                  fontFamily: 'Space Grotesk'
                }}
              />
              <button 
                type="submit"
                style={{
                  background: '#00FFFF',
                  border: 'none',
                  borderRadius: '12px',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#050505',
                  cursor: 'none',
                  boxShadow: '0 0 10px rgba(0,255,255,0.3)'
                }}
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
