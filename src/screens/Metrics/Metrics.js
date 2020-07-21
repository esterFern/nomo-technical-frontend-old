import React, { useState, useEffect } from "react";
import "./Metrics.css";
import { getRequest } from "../../api/requestFunctions";
import { getMetrics } from "../../api/routes";
import Modal from "react-modal";
import Form from "../../components/Form/Form";
import EditForm from "../../components/Form/EditForm";

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

const Metrics = () => {
  const [metrics, setMetrics] = useState([]);
  const [metricInfo, setMetricInfo] = useState({});
  useEffect(() => {
    getAllMetrics();
  }, []);

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const openModal = (metric) => {
    console.log("METRIC BEFORE OPEN MODAL", metric);
    setMetricInfo(metric);
    setIsOpen(true);
  };

  const afterOpenModal = () => {};

  const closeModal = () => {
    setIsOpen(false);
    setMetricInfo({});
  };

  const getAllMetrics = async () => {
    try {
      const response = await getRequest(getMetrics);
      if (response.data.data.length > 0) setMetrics(response.data.data);
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

  const renderMetrics = () => {
    return metrics.map((m) => {
      return (
        <div className="MetricContainer">
          <div className="MetricInfo">
            <p>{m.name}</p>
            <p>{m.value}</p>
            <p>{m.timestamp}</p>
          </div>
          <div className="MetricButtons">
            <button onClick={() => openModal(m)}>Edit</button>
            <button>Delete</button>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="Metrics">
      <h1 className={"Title"}>Manage metrics</h1>
      <div className="MetricContainer">
        <div className="MetricTitles">
          <p>Name</p>
          <p>Value</p>
          <p>Timestamp</p>
        </div>
      </div>

      {renderMetrics()}

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <EditForm metric={metricInfo} />
      </Modal>
    </div>
  );
};

export default Metrics;
