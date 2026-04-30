import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "What services do you specialize in?",
    answer: "I specialize in Unity Game Development, UI/UX Design, Graphic Design, and creating modern, high-performance interactive experiences tailored to your needs."
  },
  {
    question: "What tools do you primarily use?",
    answer: "For development, I primarily use Unity and C#. For design, I leverage Figma, Adobe Photoshop, and Illustrator to craft the perfect user experience."
  },
  {
    question: "How long does a typical project take?",
    answer: "Timelines vary based on project scope and complexity. However, my 'Build, Reflect, Improve' methodology ensures rapid iteration and consistent on-time delivery."
  },
  {
    question: "Do you offer revision rounds?",
    answer: "Absolutely. I believe in a highly collaborative process and offer revision rounds to ensure the final product perfectly aligns with your vision."
  },
  {
    question: "How do we get started?",
    answer: "Simply reach out via the Contact Terminal below. We'll schedule a quick chat to understand your goals, project scope, and how we can best collaborate."
  }
];

const FAQItem = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass"
      style={{
        marginBottom: '1rem',
        borderRadius: '16px',
        overflow: 'hidden',
        border: `1px solid ${isOpen ? 'rgba(0, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.05)'}`,
        transition: 'border-color 0.3s ease'
      }}
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'transparent',
          border: 'none',
          color: '#ffffff',
          fontSize: '1.2rem',
          fontWeight: 500,
          textAlign: 'left',
          cursor: 'pointer'
        }}
      >
        <span>{faq.question}</span>
        <motion.span 
          animate={{ rotate: isOpen ? 45 : 0 }}
          style={{ fontSize: '1.5rem', color: isOpen ? '#FF00FF' : '#00FFFF' }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div style={{ 
              padding: '0 2rem 2rem 2rem', 
              color: '#a0a0a0', 
              fontSize: '1.1rem',
              lineHeight: 1.6
            }}>
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  return (
    <section style={{ 
      minHeight: '80vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '6rem 2rem',
      position: 'relative',
      zIndex: 20
    }}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        <h2 style={{ fontSize: '3rem', color: '#ffffff', letterSpacing: '-1px' }}>Questions, Answers</h2>
        <p style={{ fontSize: '1.2rem', color: '#a0a0a0', marginTop: '1rem' }}>Get quick answers to your most pressing questions.</p>
        <div style={{ width: '60px', height: '3px', background: 'linear-gradient(to right, #00FFFF, #FF00FF)', margin: '1.5rem auto 0' }}></div>
      </motion.div>

      <div style={{ maxWidth: '800px', width: '100%' }}>
        {faqs.map((faq, index) => (
          <FAQItem key={index} faq={faq} index={index} />
        ))}
      </div>
    </section>
  );
};

export default FAQ;
