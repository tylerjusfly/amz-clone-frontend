import React, { useEffect, useState } from 'react';
import { notifyError, notifySuccess } from '../../services/notify';
import { request } from '../../services/utilities';
import Button from '../../components/Button';
import PageContainer from '../../components/PageContainer';
import Label from '../../components/Label';
import Input from '../../components/Input';
import TableLoading from '../../components/TableLoading';
import moment from 'moment/moment';

const Category = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(categories);

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

  const getAllCategory = async () => {
    try {
      const url = 'products/category/all';
      const rs = await request(url, 'GET', true);
      if (rs.type === 'Success') {
        setCategories(rs.result);
      }
    } catch (error) {
      notifyError(error.message || 'error fetching categories');
    }
  };

  useEffect(() => {
    if (loading) {
      getAllCategory();
      setLoading(false);
    }
  }, []);

  return (
    <PageContainer>
      <div className="col-md-4">
        <div className="form-group">
          <Label className="label-md">Category</Label>
          <Input type="text" placeholder="Create A Product Category" className="form-control input-md" onChange={(e) => setCategoryName(e.target.value)} />
        </div>
      </div>
      <Button type="primary" utilclass="m-r-5 m-b-10" iconposition="left" onClick={createCategory}>
        <i className="pg-icon">tick</i>
        <span className="">Submit</span>
      </Button>

      {/* Show Table */}

      <div className="row">
        <div className="col-lg-8">
          <div className="card card-transparent">
            <div className="card-header ">
              <div className="card-title">Pages detailed view table</div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <div id="detailedTable_wrapper" className="dataTables_wrapper no-footer">
                  {loading ? (
                    <TableLoading />
                  ) : (
                    <table className="table table-hover table-condensed table-detailed dataTable no-footer" id="detailedTable" role="grid">
                      <thead>
                        <tr role="row">
                          <th style={{ width: '166px' }} className="sorting_disabled" rowSpan="1" colSpan="1">
                            Title
                          </th>
                          <th style={{ width: '166px' }} className="sorting_disabled" rowSpan="1" colSpan="1">
                            Price
                          </th>
                          <th style={{ width: '165px' }} className="sorting_disabled" rowSpan="1" colSpan="1">
                            Last Update
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.map((item, index) => (
                          <tr key={index}>
                            <td className="v-align-middle semi-bold">{item.name}</td>
                            <td className="v-align-middle semi-bold">{item.slug}</td>
                            <td className="v-align-middle">{moment(item.createdAt).format('DD-MM-YYYY')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Category;
