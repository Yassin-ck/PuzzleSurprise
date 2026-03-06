import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Landing = ({ name, onComplete }) => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      flex: 1
    }}>
      <div className="glass-card" style={{ width: '100%', textAlign: 'center', padding: '3rem 1.5rem', marginBottom: 'auto', marginTop: '10vh' }}>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--bg-gradient)',
            padding: '8px 16px',
            borderRadius: '99px',
            fontSize: '0.9rem',
            color: 'var(--secondary)',
            fontWeight: 600,
            marginBottom: '1.5rem'
          }}>
            {name} <Heart size={14} fill="currentColor" />
          </div>
          <h1 style={{ fontSize: '1.75rem', lineHeight: '1.2' }}>
            Someone made this just for <span style={{ color: 'var(--primary)' }}>you</span>
          </h1>
        </motion.div>
      </div>

      <div style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        paddingBottom: '20vh'
      }}>
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            filter: ['drop-shadow(0 0 20px rgba(236,72,153,0.3))', 'drop-shadow(0 0 40px rgba(236,72,153,0.6))', 'drop-shadow(0 0 20px rgba(236,72,153,0.3))']
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          onClick={onComplete}
          style={{ cursor: 'pointer', outline: 'none', WebkitTapHighlightColor: 'transparent' }}
        >
          <Heart 
            size={120} 
            fill="#ec4899" 
            color="#db2777" 
            strokeWidth={1}
          />
        </motion.div>
      </div>
      
      {/* Background decoration particles */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ position: 'absolute', top: '15%', left: '10%', width: 8, height: 8, background: '#f472b6', borderRadius: '50%', filter: 'blur(2px)' }}
      />
      <motion.div
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        style={{ position: 'absolute', top: '45%', right: '15%', width: 12, height: 12, background: '#a855f7', borderRadius: '50%', filter: 'blur(3px)' }}
      />
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        style={{ position: 'absolute', bottom: '30%', left: '20%', width: 6, height: 6, background: '#fb7185', borderRadius: '50%', filter: 'blur(1px)' }}
      />
    </div>
  );
};

export default Landing;
