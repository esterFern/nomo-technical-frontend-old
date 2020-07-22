import React from "react";

import "./Metric.css";

import IconButton from "Components/IconButton/IconButton";

const Metric = ({ metric, index, onClick }) => {
  return (
    <div className="Metric-columns" key={index}>
      <div className="Metric-info">
        <p>{metric.name}</p>
        <p>{metric.value}</p>
        <p>{metric.timestamp}</p>
      </div>
      <div className="Metric-buttons">
        <IconButton
          onClick={() => onClick("edit")}
          alt={"edit"}
          icon={process.env.PUBLIC_URL + "/images/edit.png"}
        />
        <IconButton
          onClick={() => onClick("delete")}
          alt={"delete"}
          icon={process.env.PUBLIC_URL + "/images/delete.png"}
        />
      </div>
    </div>
  );
};

export default Metric;
