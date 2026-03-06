import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Landing from './components/Landing';
import PuzzleComponent from './components/PuzzleComponent';
import Message from './components/Message';
import Proposal from './components/Proposal';
import Success from './components/Success';
import Creator from './components/Creator';
import './index.css';

function App() {
  const [stage, setStage] = useState('loading');
  const [config, setConfig] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    const photo = params.get('photo');
    const question = params.get('question');
    const grid = params.get('grid');

    if (name && photo && question && grid) {
      // Configuration found, enter viewer mode
      setConfig({
        name,
        photo,
        question,
        grid: parseInt(grid, 10),
      });
      setStage('landing');
    } else {
      // No config found, enter creator mode
      setStage('creator');
    }
  }, []);

  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  const handleNextStage = (next) => {
    setStage(next);
  };

  if (stage === 'loading') return null;

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {stage === 'creator' && (
          <motion.div
            key="creator"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <Creator />
          </motion.div>
        )}

        {stage === 'landing' && (
          <motion.div
            key="landing"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <Landing name={config.name} onComplete={() => handleNextStage('puzzle')} />
          </motion.div>
        )}
        
        {stage === 'puzzle' && (
          <motion.div
            key="puzzle"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <PuzzleComponent 
               imageUrl={config.photo} 
               gridSize={config.grid} 
               name={config.name} 
               onComplete={() => handleNextStage('message')} 
            />
          </motion.div>
        )}
        
        {stage === 'message' && (
           <motion.div
            key="message"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <Message   imageUrl={imageUrl}
 onComplete={() => handleNextStage('proposal')} />
          </motion.div>
        )}

        {stage === 'proposal' && (
          <motion.div
            key="proposal"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <Proposal question={config.question} onComplete={() => handleNextStage('success')} />
          </motion.div>
        )}

        {stage === 'success' && (
          <motion.div
            key="success"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
          >
             <Success />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
