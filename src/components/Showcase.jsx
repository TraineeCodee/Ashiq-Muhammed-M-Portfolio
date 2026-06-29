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
    <section id="project" className="showcase-section">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        <h2 className="showcase-title">Project Showcase</h2>
        <div style={{ width: '60px', height: '3px', background: 'linear-gradient(to right, #00FFFF, #FF00FF)', margin: '1.5rem auto 0' }}></div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="showcase-grid"
      >
        {/* Card 1 */}
        <motion.a 
          href="https://trainee-code.itch.io/" 
          target="_blank" 
          rel="noreferrer"
          variants={itemVariants} 
          className="glass showcase-card"
        >
          <Gamepad2 color="#00FFFF" />
          <h3>Game Dev Portfolio</h3>
          <p>
            A collection of physics-based mechanics, level designs, and interactive prototypes built in Unity.
          </p>
        </motion.a>

        {/* Card 2 */}
        <motion.div variants={itemVariants} className="glass showcase-card">
          <Globe color="#FF00FF" />
          <h3>Live Builds</h3>
          <p>
            Playable web builds and interactive prototypes.
          </p>
          <a href="https://trainee-code.itch.io" target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: '1.5rem', color: '#00FFFF', fontWeight: 'bold' }}>
            Visit trainee-code.itch.io →
          </a>
        </motion.div>

        {/* Card 3 */}
        <motion.div variants={itemVariants} className="glass showcase-card">
          <PenTool color="#00FFFF" />
          <h3>Graphic Design</h3>
          <p>
            Specialized in UI/UX for games, digital branding, and technical asset creation utilizing Figma and Adobe Suite.
          </p>
          <a href="https://drive.google.com/drive/folders/1u8LKZf7xujbc5mO9N8Hq7Yb-a9JoJdND?usp=drive_link" target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: '1.5rem', color: '#00FFFF', fontWeight: 'bold' }}>
            View Design Samples →
          </a>
        </motion.div>

        {/* Card 4 */}
        <motion.div variants={itemVariants} className="glass showcase-card">
          <Boxes color="#FF00FF" />
          <h3>Technical Art</h3>
          <p>
            Low-poly 3D modeling, Unity Timeline cinematics, Cinemachine camera systems, animation integration.
          </p>
        </motion.div>

        {/* Card 5 */}
        <motion.div variants={itemVariants} className="glass showcase-card">
          <Code2 color="#00FFFF" />
          <h3>Tech Stack</h3>
          <ul>
            <li><strong>Engine:</strong> Unity (C# Expert)</li>
            <li><strong>Design:</strong> Figma, Photoshop</li>
            <li><strong>Systems:</strong> Data Structures, Cybersecurity</li>
          </ul>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Showcase;
