import React from "react";
import Modal from "react-modal";

import IconButton from "Components/IconButton/IconButton";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ConfirmationModal = ({ isOpen, closeModal }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => closeModal(false)}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <h4>Metric created correctly.</h4>
      <div className="Buttons-container">
        <button onClick={() => closeModal(false)} className="Button">
          Ok
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
