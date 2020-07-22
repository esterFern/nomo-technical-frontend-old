import React from "react";
import MetricsGraphics from "react-metrics-graphics";
import "metrics-graphics/dist/metricsgraphics.css";

import "./Graphic.css";

import { changeDateFormat } from "Functions/dates";

const Graphic = ({ metrics, onlyDay }) => {
  const showInfo = (data) => {
    const date = changeDateFormat(data.date, onlyDay);
    const value = data.value.toFixed(2);
    return ` ${date}  –  Value: ${value}`;
  };
  return (
    <div className="Graphic">
      <MetricsGraphics
        // title="Metrics"

        description=""
        data={metrics.data}
        width={700}
        height={300}
        x_accessor="date"
        y_accessor="value"
        area={false}
        legend={metrics.names}
        legend_target={"none"}
        // point_size={10}
        //colors={["#ff9d00"]}
        european_clock={false}
        //mouseover={showInfo}
        y_rollover_format={showInfo}
        x_rollover_format={() => ""}
        outer_padding_percentage={100}
        //show_rollover_text={false}
      />
    </div>
  );
};

export default Graphic;
