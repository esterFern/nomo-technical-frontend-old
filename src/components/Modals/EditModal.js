import React, { useState, useEffect } from "react";

import Modal from "react-modal";
import EditForm from "../Form/EditForm";

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

const EditModal = ({ metric, isOpen, closeModal }) => {
  console.log("METRIC IN DELETE MODEL", metric);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => closeModal(false)}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <button onClick={() => closeModal(false)}>Close</button>
      <EditForm metric={metric} closeModal={closeModal} />
    </Modal>
  );
};

export default EditModal;
