import React, { useEffect, useRef, useState } from 'react';
import './Game.css';

const ITEM_TYPES = {
  COIN: 'coin',
  SKULL: 'skull',
  DIAMOND: 'diamond',
};

const Game = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const rand = Math.random();
      let type = ITEM_TYPES.COIN;
      if (rand < 0.2) type = ITEM_TYPES.SKULL;
      else if (rand < 0.35) type = ITEM_TYPES.DIAMOND;

      const newItem = {
        id: Date.now(),
        type,
        x: Math.floor(Math.random() * 300),
        y: 0
      };
      setItems(prev => [...prev, newItem]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fallInterval = setInterval(() => {
      setItems(prev => prev.map(item => ({ ...item, y: item.y + 5 })));
    }, 50);
    return () => clearInterval(fallInterval);
  }, []);

  const handleClick = (id, type) => {
    if (type === ITEM_TYPES.COIN) setScore(prev => prev + 1);
    if (type === ITEM_TYPES.DIAMOND) setScore(prev => prev + 10);
    if (type === ITEM_TYPES.SKULL) setScore(prev => Math.max(0, prev - 5));
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="game-container">
      <h1 className="score">Score: {score}</h1>
      <div ref={canvasRef} className="game-canvas">
        {items.map(item => (
          <div
            key={item.id}
            onClick={() => handleClick(item.id, item.type)}
            className={`item ${item.type}`}
            style={{ left: item.x, top: item.y }}
          />
        ))}
      </div>
    </div>
  );
};

export default Game;