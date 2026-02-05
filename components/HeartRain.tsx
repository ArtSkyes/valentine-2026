import React, { useEffect, useState } from 'react';

interface Heart {
  id: number;
  left: string;
  duration: string;
  delay: string;
}

export const HeartRain: React.FC = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      duration: `${Math.random() * 2 + 3}s`,
      delay: `${Math.random() * 5}s`,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart-rain text-pink-400 opacity-70"
          style={{
            left: heart.left,
            animationDuration: heart.duration,
            animationDelay: heart.delay,
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
};
