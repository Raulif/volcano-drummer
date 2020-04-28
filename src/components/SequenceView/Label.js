import React from "react";
import { Label as RechartsLabel } from "recharts";

const Label = ({ value, position, isVertical }) => {
  return (
    <RechartsLabel
      value={value}
      offset={0}
      position={position}
      style={{
        fontSize: "0.8em",
        writingMode: isVertical ? "vertical-lr" : "",
      }}
    />
  );
};

export default Label;
