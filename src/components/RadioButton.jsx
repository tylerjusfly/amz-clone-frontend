import React from 'react';

const RadioButton = ({ btnradio, className, type, children, ...rest }) => {
  return (
    <label btnradio={btnradio} className={`btn btn-${type} ${className}`} {...rest}>
      {children}
    </label>
  );
};

export default RadioButton;
