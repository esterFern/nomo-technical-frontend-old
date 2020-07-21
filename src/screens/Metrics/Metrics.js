import React, { useState, useEffect } from "react";
import "./Metrics.css";
import { getRequest } from "../../api/requestFunctions";
import { getMetrics } from "../../api/routes";
import DeleteModal from "../../components/Modals/DeleteModal";
import EditModal from "../../components/Modals/EditModal";
import { Link } from "react-router-dom";

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
    return metrics.map((m) => {
      return (
        <div className="MetricContainer">
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
    <div className="Metrics">
      <h1 className={"Title"}>Manage metrics</h1>
      <Link to="/">Back</Link>
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
