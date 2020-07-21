import React, { useState, useEffect } from "react";
import "./Main.css";
import Form from "../../components/Form/Form";
import Graphic from "../../components/Graphic/Graphic";
import { getRequest } from "../../api/requestFunctions";
import { getMetrics } from "../../api/routes";
import ToggleAverage from "../../components/ToggleAverage/ToggleAverage";
import { Link } from "react-router-dom";

const Main = () => {
  const [metrics, setMetrics] = useState([]);
  const [average, setAverage] = useState("minute");

  useEffect(() => {
    const request = async () => await requestNewData();
  });

  const requestNewData = async () => {
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
  };

  const setGraphicData = (metrics) => {
    let names = [];
    let data = [];
    let index = -1;
    metrics.forEach((m) => {
      const dateArr = m.timestamp.split(" ");
      const date = `${dateArr[0].split("-").reverse().join("-")} ${dateArr[1]}`;
      if (!names.includes(m.name)) {
        names.push(m.name);
        console.log("TIMESTAMP", m.timestamp);

        console.log("DATE SPLIT", date);
        data.push([{ date: new Date(date), value: m.value }]);
        index = index + 1;
      } else {
        data[index] = [
          ...data[index],
          { date: new Date(date), value: m.value },
        ];
      }
    });

    console.log("SET DATA", data, names);

    //setMetrics(data);
  };

  // [[
  //   { date: new Date("2014-10-31 10:23:00"), value: 100 },
  //   { date: new Date("2014-11-01"), value: 6 },
  //   { date: new Date("2014-11-02"), value: 18 },
  // ],
  // [
  //   { date: new Date("2014-11-01"), value: 20 },
  //   { date: new Date("2014-11-03"), value: 5 },
  // ]]
  return (
    <div className="Main">
      <h1>New metric</h1>
      <Form requestNewData={requestNewData} />
      <h1>View metrics</h1>
      <Link to="/metrics">Manage metrics</Link>
      {metrics.length === 0 ? (
        <p>No metrics to show</p>
      ) : (
        <div>
          <ToggleAverage
            selected={average}
            changeAverage={(type) => {
              console.log("PRESSED BUTTON");
              setAverage(type);
              requestNewData();
            }}
          />
          <Graphic metrics={metrics} />
        </div>
      )}
    </div>
  );
};

export default Main;
