import React from 'react';

export const CapybaraSVG: React.FC<{ className?: string, emotion?: 'happy' | 'sad' }> = ({ className, emotion = 'happy' }) => {
  return (
    <svg 
      viewBox="0 0 200 200" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Body */}
      <ellipse cx="100" cy="120" rx="70" ry="55" fill="#C19A6B" />
      {/* Head */}
      <rect x="50" y="60" width="80" height="70" rx="30" fill="#C19A6B" />
      
      {/* Ears */}
      <circle cx="60" cy="65" r="10" fill="#8D6E48" />
      <circle cx="120" cy="65" r="10" fill="#8D6E48" />

      {/* Eyes */}
      <circle cx="70" cy="90" r="5" fill="#333" />
      <circle cx="110" cy="90" r="5" fill="#333" />

      {/* Nose/Mouth area */}
      <rect x="75" y="100" width="30" height="20" rx="10" fill="#5C4033" />
      
      {/* Mouth based on emotion */}
      {emotion === 'happy' ? (
         <path d="M 85 115 Q 90 120 95 115" stroke="#333" strokeWidth="2" fill="none" />
      ) : (
         <path d="M 85 120 Q 90 115 95 120" stroke="#333" strokeWidth="2" fill="none" />
      )}
      
      {/* Blush */}
      <circle cx="65" cy="105" r="5" fill="#FFB6C1" opacity="0.6" />
      <circle cx="115" cy="105" r="5" fill="#FFB6C1" opacity="0.6" />

      {/* Feet */}
      <ellipse cx="60" cy="170" rx="10" ry="8" fill="#8D6E48" />
      <ellipse cx="140" cy="170" rx="10" ry="8" fill="#8D6E48" />
      
      {/* Heart Accessory for happy state */}
      {emotion === 'happy' && (
        <path d="M 140 100 C 140 90, 130 90, 130 100 C 130 90, 120 90, 120 100 C 120 115, 140 125, 140 125 C 140 125, 160 115, 160 100 C 160 90, 150 90, 150 100 C 150 90, 140 90, 140 100 Z" fill="#EF4444" transform="rotate(15, 140, 110)" />
      )}
      
      {/* Tear for sad state */}
      {emotion === 'sad' && (
         <path d="M 112 95 Q 115 105 112 110" stroke="#60A5FA" strokeWidth="2" fill="none" />
      )}
    </svg>
  );
};
