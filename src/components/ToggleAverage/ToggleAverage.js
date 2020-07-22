import React from "react";
import "./ToggleAverage.css";

function ToggleAverage({ selected, changeAverage }) {
  return (
    <div className="Toggle">
      <p>Change average:</p>
      <button
        onClick={() => changeAverage("minute")}
        className={
          selected === "minute" ? "SelectedToggleButton" : "ToggleButton"
        }
      >
        Minute
      </button>
      <button
        onClick={() => changeAverage("hour")}
        className={
          selected === "hour" ? "SelectedToggleButton" : "ToggleButton"
        }
      >
        Hour
      </button>
      <button
        onClick={() => changeAverage("day")}
        className={selected === "day" ? "SelectedToggleButton" : "ToggleButton"}
      >
        Day
      </button>
    </div>
  );
}

export default ToggleAverage;
