import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const Proposal = ({ question, onComplete }) => {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  
  // Evasion logic for the 'No' button
  const handleNoEvasion = () => {
  if (!containerRef.current) return;

  const container = containerRef.current.getBoundingClientRect();
  const btnWidth = 100;
  const btnHeight = 50;

  const maxJumpX = container.width / 2 - btnWidth;
  const maxJumpY = container.height / 2 - btnHeight;

  const xSign = Math.random() < 0.5 ? 1 : -1;
  const ySign = Math.random() < 0.5 ? 1 : -1;

  const jumpX = xSign * (Math.random() * (maxJumpX - 50) + 50);
  const jumpY = ySign * (Math.random() * (maxJumpY - 50) + 50);

  setNoButtonPosition({
    x: jumpX,
    y: jumpY
  });

};

  return (
    <div ref={containerRef} style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      flex: 1,
      padding: '2rem 1rem',
      position: 'relative'
    }}>
        <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                <img 
                    src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Cat%20with%20Wry%20Smile.png" 
                    alt="Cat Smile" 
                    width="80" 
                    height="80"
                />
            </div>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--text-dark)', fontWeight: 700 }}>
                {question}
            </h2>
        </motion.div>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginTop: '1rem' }}>
             {/* The Yes Button */}
            <motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  onClick={onComplete}
  className="btn-primary"
  style={{
    padding: '1rem 2.5rem',
    fontSize: '1.2rem',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    zIndex: 10
  }}
>
  Yes <span>💖</span>
</motion.button>

            {/* The Evasive No Button */}
            <motion.button
                 animate={{ x: noButtonPosition.x, y: noButtonPosition.y }}
                 transition={{ type: "spring", stiffness: 400, damping: 20 }}
                 onMouseEnter={handleNoEvasion}
                 onTouchStart={(e) => {
                     e.preventDefault(); // Prevent accidental click on touch devices
                     handleNoEvasion();
                 }}
                 onClick={handleNoEvasion} // Just in case they click it
                 className="btn-primary"
                 style={{
                     background: '#e5e7eb', // Gray out
                     color: 'var(--text-dark)',
                     boxShadow: 'none',
                     padding: '1rem 2.5rem',
                     fontSize: '1.2rem',
                     position: 'relative', // Need to let it escape layout
                     zIndex: 5
                 }}
            >
                No <span>🙊</span>
            </motion.button>
        </div>

        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            style={{
                marginTop: '4rem',
                color: 'var(--text-light)',
                fontStyle: 'italic',
                fontSize: '0.9rem'
            }}
        >
            Just say Yes already! 🙄
        </motion.p>
    </div>
  );
};

export default Proposal;
