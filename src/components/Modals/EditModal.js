import React from "react";
import Modal from "react-modal";

import EditForm from "Components/Form/EditForm";

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
