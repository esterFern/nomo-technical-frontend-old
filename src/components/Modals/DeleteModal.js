import React from "react";
import Modal from "react-modal";

import { deleteMetric } from "Api/routes";
import { deleteRequest } from "Api/requestFunctions";

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

const DeleteModal = ({ metric, isOpen, closeModal }) => {
  const removeMetric = async () => {
    try {
      const body = { id: metric.id };
      console.log("BODY TO PASS", body);
      await deleteRequest(deleteMetric, body);
      closeModal(true);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else alert(error);
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => closeModal(false)}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <button onClick={() => closeModal(false)}>Close</button>

      <p>Are you sure you want to delete this metric?</p>
      <button onClick={removeMetric}>Yes</button>
      <button onClick={() => closeModal(false)}>No</button>
    </Modal>
  );
};

export default DeleteModal;
