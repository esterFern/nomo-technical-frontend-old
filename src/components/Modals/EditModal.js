import React from "react";
import Modal from "react-modal";

import EditForm from "Components/Form/EditForm";
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

const EditModal = ({ metric, isOpen, closeModal }) => {
  console.log("METRIC IN DELETE MODEL", metric);
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
      <h3>Edit metric</h3>
      <EditForm metric={metric} closeModal={closeModal} />
    </Modal>
  );
};

export default EditModal;
