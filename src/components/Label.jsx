import React from 'react';

const Label = ({ className, children, ...rest }) => {
  return (
    <label className={className} {...rest}>
      {children}
    </label>
  );
};

export default Label;
