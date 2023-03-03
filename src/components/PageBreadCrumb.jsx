import React from 'react';
import '../assets/css/breadcrumb.css';

const PageBreadCrumb = ({ className, children, ...rest }) => {
  return (
    <ol className={`breadcrumb ${className}`} {...rest}>
      {children}
    </ol>
  );
};
export default PageBreadCrumb;
