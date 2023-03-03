import React from 'react';

const Card = ({ className, type, style, children, title, ...props }) => {
  return (
    <div className={`card ${type} share full-width ${className}`} style={style} {...props}>
      {children}
    </div>
  );
};

export default Card;
