import React from 'react';
import { motion } from 'framer-motion';

const Message = ({ onComplete, imageUrl }) => {  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      flex: 1,
      padding: '2rem 1rem'
    }}>
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '1.5rem' }}
        >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.5rem' }}>💖</span>
                <span style={{ fontSize: '1.5rem' }}>✨</span>
                <span style={{ fontSize: '1.5rem' }}>💜</span>
            </div>
            <h2 style={{ color: 'var(--primary)', fontSize: '1.4rem', fontWeight: 600 }}>
                A Special Message For You
            </h2>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card"
            style={{ 
                width: '100%', 
                maxWidth: '340px',
                textAlign: 'center', 
                backgroundColor: 'rgba(255, 240, 248, 0.7)',
                borderColor: 'rgba(255, 192, 226, 0.5)'
            }}
        >
            <p style={{ 
                fontStyle: 'italic', 
                color: 'var(--text-dark)', 
                lineHeight: 1.6,
                fontSize: '1.05rem',
                fontFamily: 'serif' 
            }}>
                "Every moment with you feels like a beautiful dream I never want to wake up from. You are my forever and always."
            </p>
        </motion.div>

        <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        style={{ 
            marginTop: '3rem',
            width: '100px',
            height: '100px',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
        }}
        >
        <img 
            src={imageUrl}
            alt="Memory"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        </motion.div>

        <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            onClick={onComplete}
            className="btn-primary"
            style={{ 
                marginTop: '3rem', 
                width: '80%', 
                maxWidth: '250px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px'
            }}
        >
            Continue <span>💖</span>
        </motion.button>
    </div>
  );
};

export default Message;
