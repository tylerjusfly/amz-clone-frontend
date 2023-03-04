import React from 'react';

const Input = ({ className, type, ...rest }) => {
  return <input className={className} type={`${type}`} {...rest} />;
};

export default Input;
