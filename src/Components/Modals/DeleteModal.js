import React from "react";
import Modal from "react-modal";

import { deleteMetric } from "Api/routes";
import { deleteRequest } from "Api/requestFunctions";
import IconButton from "Components/IconButton/IconButton";

import "./Modal.css";

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
      <IconButton
        icon={process.env.PUBLIC_URL + "/images/close.png"}
        alt={"close-modal"}
        onClick={() => closeModal(false)}
        small
      />

      <p>Are you sure you want to delete this metric?</p>

      <div className="Buttons-container">
        <button onClick={removeMetric} className="Button">
          Yes
        </button>
        <button onClick={() => closeModal(false)} className="Button Cancel">
          No
        </button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
