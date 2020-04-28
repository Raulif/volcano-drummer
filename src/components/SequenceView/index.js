import React from "react";
import { Grid } from "@material-ui/core";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
} from "recharts";

import Label from "./Label";
import AxisTick from "./AxisTick";
import { getData, getXAxisDomainDataMax } from "./utils";

const SequenceView = ({ sequence }) => {
  const { id, steps } = sequence;
  const data = getData(steps);
  return (
    <Grid container space={2}>
      <Grid item xs={12}>
        <p>Sequence</p>
      </Grid>
      <Grid item xs={12}>
        <ScatterChart width={350} height={200}>
          <Tooltip />
          <CartesianGrid verticalPoints={[-50]} />

          <XAxis
            type="number"
            dataKey="length"
            name="length"
            tick={<AxisTick textAnchor="end" isTime />}
            label={Label({ value: "min", position: "insideBottom" })}
            domain={[0, getXAxisDomainDataMax]}
          />
          <YAxis
            type="number"
            dataKey="bpm"
            name="bpm"
            tick={<AxisTick textAnchor="end" />}
            label={Label({
              value: "BPM",
              position: "insideLeft",
              isVertical: true,
            })}
            width={40}
            domain={[0, 200]}
          />

          <Scatter
            name={id}
            data={data}
            fill="white"
            stroke="#3f51b5"
            line={<Line stroke="#3f51b5" type="stepBefore" />}
          />
        </ScatterChart>
      </Grid>
    </Grid>
  );
};

export { SequenceView };
