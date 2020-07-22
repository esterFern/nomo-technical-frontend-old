import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Metrics.css";

import { getRequest } from "Api/requestFunctions";
import { getMetrics } from "Api/routes";
import DeleteModal from "Components/Modals/DeleteModal";
import EditModal from "Components/Modals/EditModal";
import Metric from "Components/Metric/Metric";

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
      else setMetrics([]);
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
        <Metric
          metric={m}
          index={i}
          onClick={(modal) => {
            setMetricInfo(m);
            if (modal === "edit") {
              setEditModal(true);
            } else {
              setDeleteModal(true);
            }
          }}
        />
      );
    });
  };
  return (
    <div id={"Metrics-screen"}>
      <h1 className={"Title"}>Manage metrics</h1>
      <Link to="/" className={"Link"}>
        Back
      </Link>

      {metrics.length === 0 ? (
        <p className={"Not-found-message"}>No metrics</p>
      ) : (
        <div>
          <div className="Metric-columns">
            <div className="Metric-titles">
              <p>Name</p>
              <p>Value</p>
              <p>Timestamp</p>
            </div>
          </div>
          {renderMetrics()}
        </div>
      )}

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
