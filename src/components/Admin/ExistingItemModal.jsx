import React, { useState } from 'react';
import axios from 'axios';
import ConfirmDelete from './ConfirmDelete';

const ExistingItemModal = (props) => {
  const { id, name, price, description, closeOpenItem, removeListItems, updateListItems } = props;
  const [editItem, toggleEditItem] = useState(false);
  const [productName, editProductName] = useState(name);
  const [productPrice, editProductPrice] = useState(price);
  const [productDesc, editProductDesc] = useState(description);
  const [confirmDeleteShow, toggleConfirmDeleteShow] = useState(false);
  // const [showErrMsg, toggleShowErrMsg] = useState(false);
  // const [errMsg, errMsgValue] = useState('');
  const canelEdit = () => {
    editProductName(name);
    editProductPrice(price)
    editProductDesc(description);
  }

  const submitDeletion = () => {
    axios.delete(`http://geekfinds.com/products/${id}`)
    .then((res) => {
      const { data } = res;
      if(data !== "NULL" && data.length > 0) {
        toggleEditItem(false);
        toggleConfirmDeleteShow(false);
        closeOpenItem();
        removeListItems(id);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const submitChanges = () => {
    if(productName === name && productPrice === price && productDesc === description) {
      return false;
    }
    axios.put(`http://geekfinds.com/products/${id}`,{
      name: productName,
      price: productPrice,
      description: productDesc
    })
    .then((res) => {
      const { data } = res;
      toggleEditItem(false);
      closeOpenItem();
      updateListItems(data);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  return (
    <>
      <div className="modal fade show" style={{display: (confirmDeleteShow ? 'none' : 'block')}} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Review/Edit Item</h5>
            </div>
            <div className="modal-body">
              {
                !editItem ?
                <>
                  <h6>
                  <i
                    className="fa fa-pencil pull-right cursor"
                    onClick={()=>{toggleEditItem(true)}}
                  />
                  {name}
                  <br />
                  <small>${price}</small>
                </h6>
                <p>{description}</p>
              </>
              :
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
              }
            </div>
            <div className="modal-footer">
            {
            !editItem ?
              <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={closeOpenItem}
              >
                Close
              </button>
              :
              <>
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  disabled={confirmDeleteShow}
                  onClick={()=>{toggleConfirmDeleteShow(true);}}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  disabled={confirmDeleteShow}
                  onClick={()=>{submitChanges();}}
                >
                  Save Changes
                </button>
                <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    disabled={confirmDeleteShow}
                    onClick={()=>{toggleEditItem(false); canelEdit();}}
                >
                  Cancel
                </button>
              </>
            }
            </div>
          </div>
        </div>
      </div>
      {
        !confirmDeleteShow ?
        <></>
        :
        <ConfirmDelete
          {...props}
          submitDeletion={submitDeletion}
          toggleConfirmDeleteShow={() => {toggleConfirmDeleteShow(false)}}
        />
      }
    </>
  )
}

export default ExistingItemModal;
