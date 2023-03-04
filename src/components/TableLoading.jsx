import React from 'react';

import searchingGIF from '../assets/images/waiting.gif';

const TableLoading = () => {
  return (
    <div className="loading-block">
      <img alt="searching" src={searchingGIF} />
    </div>
  );
};

export default TableLoading;
