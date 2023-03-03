import React from 'react';

const PageContainer = ({ className = '', children, ...rest }) => {
  return (
    <div className={`container-fluid container-fixed-lg ${className}`} {...rest}>
      {children}
    </div>
  );
};

export default PageContainer;
