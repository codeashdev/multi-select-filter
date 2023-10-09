import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="app-container">
      <div className="card">
        {children}
      </div>
    </div>
  );
}

export default Card;
