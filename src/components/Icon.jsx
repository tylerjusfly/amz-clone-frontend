import React from 'react';

const Icon = ({ className, children, ...rest }) => {
  return (
    <i className={`pg-icon ${className}`} {...rest}>
      {children}
    </i>
  );
};

export default Icon;
