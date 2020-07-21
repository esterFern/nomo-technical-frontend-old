import React, { useState, useEffect } from "react";

import Modal from "react-modal";

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

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)??????????
//Modal.setAppElement("#yourAppElement");????????

const DeleteModal = ({ metric, isOpen, closeModal }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <button onClick={closeModal}>Close</button>

      <p>Are you sure you want to delete this metric?</p>
      <button>Yes</button>
      <button>No</button>
    </Modal>
  );
};

export default DeleteModal;
