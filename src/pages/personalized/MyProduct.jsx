import React, { useCallback, useEffect, useState } from 'react';
import Input from '../../components/Input';
import Label from '../../components/Label';
import PageContainer from '../../components/PageContainer';
import { request } from '../../services/utilities';

const MyProduct = () => {
  const [defaultTextFields, setDefaultTextFields] = useState([false, false, false, false, false, false]);
  const [categories, setCategories] = useState([]);

  const fetchCategories = useCallback(async () => {
    try {
      const url = `products/category/all`;
      const rs = await request(url, 'GET', true);
      if (rs.type === 'Success') {
        setCategories(rs.result);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <PageContainer>
      <div className="row">
        <div className="col-lg-6">
          <div className="card card-default">
            <div className="card-header ">
              <div className="card-title">Create Products</div>
            </div>
            <div className="card-body">
              <form className="" role="form">
                <div
                  className={`form-group form-group-default required ${defaultTextFields[0] ? 'focused' : ''}`}
                  onClick={() => setDefaultTextFields([true, false, false, false, false])}
                >
                  <Label>Product Name</Label>
                  <Input type="email" className={`form-control ${defaultTextFields[0] ? 'focus-visible' : ''}`} required="" />
                </div>
                {/* Another  */}
                <div className="row clearfix">
                  <div className="col-md-6">
                    <div className="form-group form-group-default">
                      <label>Category</label>
                      <select
                        // style={{ height: '42px' }}
                        id="status"
                        className="form-control"
                        name="status"
                        // onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="">Select A Category...</option>
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group form-group-default">
                      <label>Is Available</label>
                      <select
                        id="available"
                        className="form-control"
                        name="available"
                        // onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row clearfix">
                  <div className="col-md-6">
                    <div
                      className={`form-group form-group-default required ${defaultTextFields[1] ? 'focused' : ''}`}
                      onClick={() => setDefaultTextFields([false, true, false, false, false])}
                    >
                      <label>Price</label>
                      <input type="text" className={`form-control ${defaultTextFields[1] ? 'focus-visible' : ''}`} name="lastName" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div
                      className={`form-group form-group-default required ${defaultTextFields[2] ? 'focused' : ''}`}
                      onClick={() => setDefaultTextFields([false, false, true, false, false])}
                    >
                      <label>Brand</label>
                      <input type="text" className={`form-control ${defaultTextFields[2] ? 'focus-visible' : ''}`} name="brand" />
                    </div>
                  </div>
                </div>
                <div
                  className={`form-group form-group-default required ${defaultTextFields[3] ? 'focused' : ''}`}
                  onClick={() => setDefaultTextFields([false, false, false, true, false])}
                >
                  <Label>Product Description</Label>
                  <Input type="email" className={`form-control ${defaultTextFields[3] ? 'focus-visible' : ''}`} required="" />
                </div>
                <div className="row clearfix">
                  <div className="col-md-6">
                    <div
                      className={`form-group form-group-default required ${defaultTextFields[4] ? 'focused' : ''}`}
                      onClick={() => setDefaultTextFields([false, false, false, false, true])}
                    >
                      <label>color</label>
                      <input type="text" className={`form-control ${defaultTextFields[4] ? 'focus-visible' : ''}`} name="color" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div
                      className={`form-group form-group-default required ${defaultTextFields[5] ? 'focused' : ''}`}
                      onClick={() => setDefaultTextFields([false, false, false, false, false, true])}
                    >
                      <label>Product Unit</label>
                      <input type="text" className={`form-control ${defaultTextFields[5] ? 'focus-visible' : ''}`} name="brand" />
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <button aria-label="" className="btn btn-primary pull-right btn-lg btn-block" type="submit">
                    Create Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default MyProduct;
