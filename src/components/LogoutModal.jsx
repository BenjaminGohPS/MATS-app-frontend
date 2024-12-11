import React from "react";
import ReactDOM from "react-dom";

const OverLay = (props) => {
  if (!props.isOpen) return null;
  return (
    <>
      <div className="modal-overlay">
        <div className="modal-container">
          <h2 className="text-lg font-semibold text-darkGray mb-2">
            Are you sure you want to log out?
          </h2>
          <div className="modal-footer">
            <button onClick={props.onLogout} className="btn-confirm">
              Logout
            </button>
            <button onClick={props.onClose} className="btn-cancel">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const LogoutModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          onLogout={props.onLogout}
          isOpen={props.isOpen}
          onClose={props.onClose}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default LogoutModal;
