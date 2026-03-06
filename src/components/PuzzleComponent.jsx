import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PuzzleComponent = ({ imageUrl, gridSize, name, onComplete }) => {
  const [tiles, setTiles] = useState([]);
  const [isSolved, setIsSolved] = useState(false);

  // Initialize the puzzle
  useEffect(() => {
    // 0 is the empty tile
    let initialTiles = Array.from({ length: gridSize * gridSize }, (_, i) => i);
    // Shuffle the tiles until solvable and not already solved
    do {
      initialTiles = initialTiles.sort(() => Math.random() - 0.5);
    } while (isSolvedState(initialTiles) || !isSolvable(initialTiles));
    
    // For testing purposes, we might want to make it easy. But let's leave proper shuffle.
    // If you want to make it 1 move away for easy dev:
    // setTiles([1, 2, 3, 4, 5, 0, 7, 8, 6]);
    setTiles(initialTiles);
  }, []);

    useEffect(() => {
      const img = new Image();
      img.src = imageUrl;
    }, [imageUrl]);

  const isSolvable = (arr) => {
    let inversions = 0;
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] && arr[j] && arr[i] > arr[j]) inversions++;
      }
    }
    return inversions % 2 === 0;
  };

  const isSolvedState = (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
        // Solved state: 1, 2, 3 ... 8, 0
      if (arr[i] !== i + 1) return false;
    }
    return arr[arr.length - 1] === 0;
  };

  const handleTileClick = (index) => {
    if (isSolved) return;
    const emptyIndex = tiles.indexOf(0);
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    const emptyRow = Math.floor(emptyIndex / gridSize);
    const emptyCol = emptyIndex % gridSize;

    const isAdjacent = 
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow);

    if (isAdjacent) {
      const newTiles = [...tiles];
      newTiles[emptyIndex] = tiles[index];
      newTiles[index] = 0;
      setTiles(newTiles);

      if (isSolvedState(newTiles)) {
        setIsSolved(true);
        setTimeout(() => {
          onComplete();
        }, 2500); // Wait 2.5s before moving to next stage
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '2rem 1rem' }}>
      
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
         <h2 onClick={() => { setIsSolved(true); setTimeout(onComplete, 2500); }} style={{ color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}>{name}'s Puzzle</h2>
         <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginTop: '0.5rem', fontStyle: 'italic' }}>
            Solve this to unveil a surprise ✨
         </p>
      </div>

      <div style={{
        position: 'relative',
        width: 'min(90vw, 320px)',
        height: 'min(90vw, 320px)',
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: '16px',
        padding: '8px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
      }}>
        {tiles.map((tile, index) => {
          if (tile === 0 && !isSolved) return null; // Don't render empty tile unless solved

          const visualTile = isSolved && tile === 0 ? gridSize * gridSize : tile;
          
          const row = Math.floor(index / gridSize);
          const col = index % gridSize;
          
          // Original row/col of this visualTile in solved state (1-indexed mapping to 0-indexed coords)
          // 1 is at 0,0. 2 is at 0,1. 8 is at 2,1. 9 (0) is at 2,2.
          const originalRow = Math.floor((visualTile - 1) / gridSize);
          const originalCol = (visualTile - 1) % gridSize;

          const boardSize = 320;
          const tileSpacing = 4;
          const tileSize = (boardSize - tileSpacing * gridSize * 2) / gridSize;
          const bgSize = tileSize * gridSize;

          return (
            <motion.div
              layout
             key={tile + "-" + index}
              onClick={() => handleTileClick(index)}
              initial={false}
              animate={{
                x: col * (tileSize + tileSpacing * 2),
                y: row * (tileSize + tileSpacing * 2),
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={{
            position: 'absolute',
            width: `${tileSize}px`,
            height: `${tileSize}px`,
            borderRadius: '8px',
            cursor: isSolved ? 'default' : 'pointer',
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: `${boardSize}px ${boardSize}px`,
            backgroundPosition: `${-originalCol * tileSize}px ${-originalRow * tileSize}px`,
            boxShadow: isSolved ? 'none' : '0 2px 8px rgba(0,0,0,0.15)',
            border: isSolved ? 'none' : '2px solid rgba(255,255,255,0.8)',
            touchAction: "manipulation"
          }}
            />
          );
        })}
        
        {/* Full Image overlay when solved for a smooth transition */}
        <AnimatePresence>
            {isSolved && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    style={{
                        position: 'absolute',
                        top: 8, left: 8, right: 8, bottom: 8,
                        borderRadius: '8px',
                        backgroundImage: `url(${imageUrl})`,
                        backgroundSize: '100% 100%',
                        zIndex: 10,
                        boxShadow: '0 0 20px rgba(217, 70, 239, 0.5)'
                    }}
                />
            )}
        </AnimatePresence>
      </div>
      
      <div style={{ marginTop: '2rem', height: '2rem' }}>
        {isSolved && (
            <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ color: 'var(--primary)', fontWeight: 'bold' }}
            >
                Perfect! 💖
            </motion.p>
        )}
      </div>

    </div>
  );
};

export default PuzzleComponent;
