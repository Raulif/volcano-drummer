import React from "react";
import { Slider } from "@material-ui/core";

const marks = [
  { value: 0, label: "0" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
  { value: 150, label: "150" },
  { value: 200, label: "200" },
];

export const BpmSlider = ({ onChange, value }) => (
  <Slider
    aria-labelledby="bpm-slider"
    onChange={onChange}
    min={0}
    max={200}
    value={value}
    marks={marks}
    step={5}
  />
);
