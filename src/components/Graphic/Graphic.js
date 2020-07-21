import React from "react";
import "./Graphic.css";
import MetricsGraphics from "react-metrics-graphics";
import "metrics-graphics/dist/metricsgraphics.css";

function Graphic({ metrics }) {
  console.log("METRICS IN GRAPHICS", metrics);
  return (
    <div className="Graphic">
      <MetricsGraphics
        // title="Metrics"
        description=""
        data={[[{ value: 3, date: new Date("2020-07-21") }]]}
        width={700}
        height={250}
        x_accessor="date"
        y_accessor="value"
        area={false}
        //legend={metrics.name}
        // point_size={10}
        outer_padding_percentage={100}
      />
    </div>
  );
}

export default Graphic;
