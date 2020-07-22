import React from "react";
import MetricsGraphics from "react-metrics-graphics";
import "metrics-graphics/dist/metricsgraphics.css";
import { useMediaQuery } from "react-responsive";

import "./Graphic.css";

import { changeDateFormat } from "Functions/dates";

const Graphic = ({ metrics, onlyDay }) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)",
  });
  const showInfo = (data) => {
    const date = changeDateFormat(data.date, onlyDay);
    const value = data.value.toFixed(2);
    return ` ${date}  –  Value: ${value}`;
  };
  return (
    <div className="Graphic">
      <MetricsGraphics
        description=""
        data={metrics.data}
        width={isDesktopOrLaptop ? 800 : 360}
        height={300}
        x_accessor="date"
        y_accessor="value"
        area={false}
        legend={metrics.names}
        legend_target={"none"}
        european_clock={false}
        y_mouseover={showInfo}
        x_mouseover={() => ""}
        outer_padding_percentage={100}
      />
    </div>
  );
};

export default Graphic;
