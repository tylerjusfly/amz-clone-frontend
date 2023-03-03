import React, { useState } from 'react';
import { notifyError, notifySuccess } from '../../services/notify';
import { request } from '../../services/utilities';

const Category = () => {
  const [categoryName, setCategoryName] = useState('');

  console.log(categoryName);

  const createCategory = async () => {
    try {
      const rs = await request('products/category/create', 'POST', true, { name: categoryName });
      if (rs.type === 'Success') {
        console.log(rs);
        notifySuccess('category successfully created');
      } else {
        notifyError(rs.message);
      }
    } catch (error) {
      notifyError(error.message || 'error creating category');
    }
  };
  return (
    <div>
      <h1>Category</h1>
      <input type="text" onChange={(e) => setCategoryName(e.target.value)} />
      <button onClick={createCategory}> Send To Back</button>
    </div>
  );
};

export default Category;
