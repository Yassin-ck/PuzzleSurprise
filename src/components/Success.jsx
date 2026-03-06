import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const Success = () => {
  useEffect(() => {
    // Fire confetti when this page loads
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      flex: 1,
      padding: '2rem 1rem'
    }}>
        <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
            style={{ textAlign: 'center', marginBottom: '2rem' }}
        >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '2rem' }}>💖</span>
                <span style={{ fontSize: '2rem' }}>🥰</span>
                <span style={{ fontSize: '2rem' }}>💖</span>
            </div>
            <h1 style={{ color: 'var(--primary)', fontSize: '2rem', marginBottom: '0.5rem' }}>
                Yayy! You said YES! 💖
            </h1>
            <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>
                Knew you'd say yes 😉
            </p>
        </motion.div>

        <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.5, duration: 0.8 }}
             className="glass-card"
             style={{ 
                 padding: '16px',
                 backgroundColor: 'rgba(255, 255, 255, 0.9)'
             }}
        >
            {/* The user provided a screenshot of Dwight celebrating. We can use a tenor GIF or similar */}
            <img 
                src="https://media.giphy.com/media/l0amJzVHIAfl7jMDos/giphy.gif" 
                alt="Celebration"
                style={{
                    width: '100%',
                    maxWidth: '300px',
                    borderRadius: '12px',
                    display: 'block'
                }}
            />
        </motion.div>
    </div>
  );
};

export default Success;
