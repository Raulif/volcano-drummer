import React from "react";
import { toMSS } from "../../utils";

const getTimeTickValue = (value) =>
  value % 30 ? Math.round(value / 30) * 30 : value;

const AxisTick = ({ x, y, payload, textAnchor, isTime }) => {
  const fontSize = "0.8em";
  const value = isTime ? toMSS(getTimeTickValue(payload.value)) : payload.value;
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        style={{ fontSize }}
        textAnchor={textAnchor}
        dy={isTime ? "1em" : fontSize}
        fill="#666"
      >
        {value}
      </text>
    </g>
  );
};

export default AxisTick;
