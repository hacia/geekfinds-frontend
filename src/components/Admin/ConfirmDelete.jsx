import React from 'react';

const ConfirmDelete = (props) => {
  const { name, submitDeletion, toggleConfirmDeleteShow } = props;
  return (
    <div className="modal fade show" style={{display: 'block'}} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Delete</h5>
          </div>
          <div className="modal-body">
            This will delete "{name}"
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-sm btn-danger"
              onClick={submitDeletion}
            >
              Yes, Delete
            </button>
            <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={toggleConfirmDeleteShow}
            >
              Nevermind
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDelete;
