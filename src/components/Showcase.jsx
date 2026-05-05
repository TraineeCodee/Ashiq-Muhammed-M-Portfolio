import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Globe, PenTool, Boxes, Code2 } from 'lucide-react';

const Showcase = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="project" style={{ minHeight: '100vh', padding: '6rem 2rem', position: 'relative', background: 'transparent' }}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        <h2 style={{ fontSize: '3rem', color: '#ffffff', letterSpacing: '-1px' }}>Project Showcase</h2>
        <div style={{ width: '60px', height: '3px', background: 'linear-gradient(to right, #00FFFF, #FF00FF)', margin: '1.5rem auto 0' }}></div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        {/* Card 1 */}
        <motion.a 
          href="https://trainee-code.itch.io/" 
          target="_blank" 
          rel="noreferrer"
          variants={itemVariants} 
          className="glass" 
          style={{ padding: '3rem', display: 'block', textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
        >
          <Gamepad2 size={50} color="#00FFFF" style={{ marginBottom: '2rem' }} />
          <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Game Dev Portfolio</h3>
          <p style={{ color: '#a0a0a0', fontSize: '1.2rem', lineHeight: 1.6 }}>
            A collection of physics-based mechanics, level designs, and interactive prototypes built in Unity.
          </p>
        </motion.a>

        {/* Card 2 */}
        <motion.div variants={itemVariants} className="glass" style={{ padding: '3rem' }}>
          <Globe size={50} color="#FF00FF" style={{ marginBottom: '2rem' }} />
          <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Live Builds</h3>
          <p style={{ color: '#a0a0a0', fontSize: '1.2rem', lineHeight: 1.6 }}>
            Playable web builds and interactive prototypes.
          </p>
          <a href="https://trainee-code.itch.io" target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: '1.5rem', color: '#00FFFF', fontWeight: 'bold' }}>
            Visit trainee-code.itch.io →
          </a>
        </motion.div>

        {/* Card 3 */}
        <motion.div variants={itemVariants} className="glass" style={{ padding: '3rem' }}>
          <PenTool size={50} color="#00FFFF" style={{ marginBottom: '2rem' }} />
          <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Graphic Design</h3>
          <p style={{ color: '#a0a0a0', fontSize: '1.2rem', lineHeight: 1.6 }}>
            Specialized in UI/UX for games, digital branding, and technical asset creation utilizing Figma and Adobe Suite.
          </p>
          <a href="https://drive.google.com/drive/folders/1u8LKZf7xujbc5mO9N8Hq7ীব-a9JoJdND" target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: '1.5rem', color: '#00FFFF', fontWeight: 'bold' }}>
            View Design Samples →
          </a>
        </motion.div>

        {/* Card 4 */}
        <motion.div variants={itemVariants} className="glass" style={{ padding: '3rem' }}>
          <Boxes size={50} color="#FF00FF" style={{ marginBottom: '2rem' }} />
          <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Technical Art</h3>
          <p style={{ color: '#a0a0a0', fontSize: '1.2rem', lineHeight: 1.6 }}>
            Low-poly 3D modeling, advanced shader graph implementation, and interactive HUD designs.
          </p>
        </motion.div>

        {/* Card 5 */}
        <motion.div variants={itemVariants} className="glass" style={{ padding: '3rem' }}>
          <Code2 size={50} color="#00FFFF" style={{ marginBottom: '2rem' }} />
          <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Tech Stack</h3>
          <ul style={{ color: '#a0a0a0', fontSize: '1.2rem', lineHeight: 1.8, listStyle: 'none' }}>
            <li><strong>Engine:</strong> Unity (C# Expert)</li>
            <li><strong>Design:</strong> Figma, Photoshop, Illustrator</li>
            <li><strong>Systems:</strong> Data Structures, Cybersecurity</li>
          </ul>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Showcase;
