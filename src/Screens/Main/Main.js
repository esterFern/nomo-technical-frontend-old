import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

import "./Main.css";

import Form from "Components/Form/Form";
import Graphic from "Components/Graphic/Graphic";
import { getRequest } from "Api/requestFunctions";
import { getMetrics } from "Api/routes";
import ToggleAverage from "Components/ToggleAverage/ToggleAverage";

const Main = () => {
  const [metrics, setMetrics] = useState({ data: [], names: [] });
  const [average, setAverage] = useState("minute");

  const setGraphicData = useCallback((metrics) => {
    let names = [];
    let data = [];
    let index = -1;
    metrics.forEach((m) => {
      let date;
      const dateArr = m.timestamp.split(" ");
      if (dateArr.length > 1) {
        date = `${dateArr[0].split("/").reverse().join("/")} ${dateArr[1]}`;
      } else {
        date = `${dateArr[0].split("/").reverse().join("/")}`;
      }

      if (!names.includes(m.name)) {
        names.push(m.name);
        data.push([{ date: new Date(date), value: m.value }]);
        index = index + 1;
      } else {
        data[index] = [
          ...data[index],
          { date: new Date(date), value: m.value },
        ];
      }
    });

    setMetrics({ data, names });
  }, []);

  const requestNewData = useCallback(async () => {
    try {
      const response = await getRequest(getMetrics, average);
      if (response.data.data.length > 0) setGraphicData(response.data.data);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else alert(error);
    }
  }, [average, setGraphicData]);

  useEffect(() => {
    requestNewData();
  }, [requestNewData]);

  return (
    <div className="Main">
      <h1>Metrics registration</h1>
      <div className="Form-section">
        <h2>New metric</h2>
        <Form requestNewData={requestNewData} />
      </div>

      <div className={"Graphic-section"}>
        <h2>View metrics</h2>
        <Link to="/metrics" className={"Link"}>
          Manage metrics
        </Link>
        {metrics.data.length === 0 ? (
          <p className={"Not-found-message"}>No metrics to show</p>
        ) : (
          <div className="Container">
            <ToggleAverage
              selected={average}
              changeAverage={(type) => {
                setAverage(type);
                requestNewData();
              }}
            />
            <Graphic metrics={metrics} onlyDay={average === "day"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
