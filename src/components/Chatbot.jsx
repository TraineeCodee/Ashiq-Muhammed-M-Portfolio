import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "👋 Hi! I'm VibeBot, Ashiq's AI companion. Ask me anything about his game development skills, design samples, or type a secret code!"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [cheated, setCheated] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Predefined quick questions
  const quickQuestions = [
    { text: 'Tell me about his Skills 🛠️', value: 'skills' },
    { text: 'Show his Projects 🎮', value: 'projects' },
    { text: 'Get Contact Details ✉️', value: 'contact' },
    { text: 'Secret Cheat Code 🔑', value: 'cheat' }
  ];

  const handleSend = (textToSend) => {
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Trigger bot reply after a small delay
    setTimeout(() => {
      const replyText = getBotReply(textToSend.toLowerCase());
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: replyText
        }
      ]);
    }, 600);
  };

  const getBotReply = (query) => {
    // 1. Secret / Cheat Code
    if (query.includes('cheat') || query.includes('secret') || query.includes('code') || query.includes('777')) {
      if (cheated) {
        return "You've already claimed this secret code! Move around to grab more XP gems instead! 😉";
      }
      setCheated(true);
      
      // Dispatch XP reward to the custom cursor!
      window.dispatchEvent(
        new CustomEvent('add_cursor_xp', {
          detail: { amount: 50, text: 'VibeBot Reward! +50 XP 🚀' }
        })
      );
      
      return "🔑 Cheat Code Activated: VIBECODER777! Awarded +50 XP to your Cursor Game stats! Check your level in the bottom-right corner! 🔥";
    }

    // 2. Skills
    if (query.includes('skill') || query.includes('expert') || query.includes('engine') || query.includes('c#') || query.includes('unity') || query.includes('figma') || query.includes('photoshop')) {
      return "🛠️ Ashiq is a high-skilled Unity Developer & Graphic Designer. He works with: Unity (C# Expert), Animation Integration, Cinemachine camera systems, Figma, Photoshop, and UI/UX design!";
    }

    // 3. Projects
    if (query.includes('project') || query.includes('game') || query.includes('showcase') || query.includes('sample')) {
      return "🎮 Ashiq specializes in creating detailed 3D games and technical art. You can check out his showcase links and designs inside the 'Technical Art' and 'Experience' sections on this page!";
    }

    // 4. Contact
    if (query.includes('contact') || query.includes('mail') || query.includes('phone') || query.includes('hire') || query.includes('email') || query.includes('locate') || query.includes('kerala')) {
      return "✉️ Let's connect! Email: ashiq.muhammed.designer@gmail.com | Phone: +91 88484 27429. He is based in Kerala, India, and works globally!";
    }

    // 5. Greetings
    if (query.includes('hi') || query.includes('hello') || query.includes('hey') || query.includes('yo') || query.includes('vibe')) {
      return "Hello player! 👾 I'm ready to answer any questions you have about Ashiq's game engineering work or design portfolio.";
    }

    // Default reply
    return "I'm still learning! Ask me about 'skills', 'projects', 'contact details', or type 'cheat' for a gaming secret! 🎮";
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
            cursor: 'none', // custom gamepad cursor
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)'
          }}
        >
          {isOpen ? <X size={26} /> : <MessageSquare size={26} />}
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
              width: '350px',
              height: '480px',
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
                    maxWidth: '80%',
                    background: msg.sender === 'user' ? 'rgba(0, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                    border: msg.sender === 'user' ? '1px solid rgba(0, 255, 255, 0.3)' : '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: msg.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                    padding: '0.8rem 1rem',
                    color: msg.sender === 'user' ? '#fff' : '#dfdfdf',
                    fontSize: '0.9rem',
                    lineHeight: 1.4,
                    wordBreak: 'break-word'
                  }}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick choices options menu */}
            <div style={{
              padding: '0.5rem 1rem',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.4rem',
              borderTop: '1px solid rgba(255,255,255,0.03)'
            }}>
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q.value)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '20px',
                    color: '#a0a0a0',
                    padding: '0.4rem 0.8rem',
                    fontSize: '0.75rem',
                    cursor: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#00FFFF';
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.background = 'rgba(0, 255, 255, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.color = '#a0a0a0';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  }}
                >
                  {q.text}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputText);
              }}
              style={{
                padding: '1rem',
                borderTop: '1px solid rgba(0, 255, 255, 0.1)',
                display: 'flex',
                gap: '0.6rem',
                background: 'rgba(5, 5, 5, 0.4)'
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
