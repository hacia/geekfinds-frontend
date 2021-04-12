import React, { useState } from 'react';
import axios from 'axios';

const CreateItemModal = (props) => {
  const { toggleShowCreateItem, addNewItemToList } = props;
  const [productName, editProductName] = useState('');
  const [productPrice, editProductPrice] = useState('');
  const [productDesc, editProductDesc] = useState('');
  // const [showErrMsg, toggleShowErrMsg] = useState(false);
  // const [errMsg, errMsgValue] = useState('');

  const submitCreateNewItem = () => {
    if(!productName || !productDesc || !productPrice) {
      return false;
    }
    axios.post(`http://geekfinds.com/products/`,{
      name: productName,
      price: productPrice,
      description: productDesc
    })
    .then((res) => {
      const { data } = res;
      toggleShowCreateItem(false);
      addNewItemToList(data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <>
      <div className="modal fade show" style={{display:'block'}} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Review/Edit Item</h5>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="productName" className="form-label">Product Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="productName"
                    aria-describedby="productHelp"
                    value={productName}
                    onChange={(e)=>{
                      editProductName(e.currentTarget.value)
                    }}
                  />
                  <div id="productHelp" className="form-text">
                    <small>
                      <em>
                        Product name as seen in listing/searches.
                      </em>
                    </small>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="product_price" className="form-label">Product Price</label>
                  <input
                    type="text"
                    className="form-control"
                    id="product_price"
                    value={productPrice}
                    onChange={(e)=>{
                      editProductPrice(e.currentTarget.value)
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="product_desc" className="form-label">Product Description</label>
                  <textarea
                    className="form-control"
                    id="product_desc"
                    rows="3"
                    value={productDesc}
                    onChange={(e)=>{
                      editProductDesc(e.currentTarget.value)
                    }}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success btn-sm"
                onClick={()=>{submitCreateNewItem();}}
              >
                Create Item
              </button>
              <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={()=>{toggleShowCreateItem(false);}}
              >
                Nevermind
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateItemModal;
