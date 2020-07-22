import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Metrics.css";

import { getRequest } from "Api/requestFunctions";
import { getMetrics } from "Api/routes";
import DeleteModal from "Components/Modals/DeleteModal";
import EditModal from "Components/Modals/EditModal";

const Metrics = () => {
  const [metrics, setMetrics] = useState([]);
  const [metricInfo, setMetricInfo] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  useEffect(() => {
    getAllMetrics();
  }, []);

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
    return metrics.map((m, i) => {
      return (
        <div className="MetricContainer" key={i}>
          <div className="MetricInfo">
            <p>{m.name}</p>
            <p>{m.value}</p>
            <p>{m.timestamp}</p>
          </div>
          <div className="MetricButtons">
            <button
              onClick={() => {
                setMetricInfo(m);
                setEditModal(true);
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                setMetricInfo(m);
                setDeleteModal(true);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      );
    });
  };
  return (
    <div id={"Metrics-screen"}>
      <h1 className={"Title"}>Manage metrics</h1>
      <Link to="/" className={"Link"}>
        Back
      </Link>
      <div className="MetricContainer">
        <div className="MetricTitles">
          <p>Name</p>
          <p>Value</p>
          <p>Timestamp</p>
        </div>
      </div>

      {renderMetrics()}

      <EditModal
        metric={metricInfo}
        isOpen={editModal}
        closeModal={(changes) => {
          if (changes) getAllMetrics();
          setEditModal(false);
        }}
      />

      <DeleteModal
        metric={metricInfo}
        isOpen={deleteModal}
        closeModal={(changes) => {
          if (changes) getAllMetrics();
          setDeleteModal(false);
        }}
      />
    </div>
  );
};

export default Metrics;
