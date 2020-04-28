import React from "react";
import { Slider } from "@material-ui/core";
import moment from "moment";

const getTimeLabel = (secs) => {
  return moment(secs * 1000).format("m:ss");
};

const getMarks = () => {
  let value = 0;
  const marks = [];
  while (value <= 300) {
    const step = { value, label: getTimeLabel(value) };
    marks.push(step);
    value += 60;
  }
  return marks;
};

export const LengthSlider = ({ onChange, value }) => (
  <Slider
    aria-labelledby="length-slider"
    onChange={onChange}
    min={0}
    max={300}
    value={value}
    marks={getMarks()}
    step={1}
  />
);
