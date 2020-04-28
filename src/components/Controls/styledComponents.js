import styled from "styled-components";
import { Button, Grid } from "@material-ui/core";

export const Container = styled(Grid)`
  min-height: 100px;
  display: flex;
  justify-content: space-between;
`;

export const ColumnGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const PlusMinusButton = styled(Button)`
  background-color: light-grey;
  border: 1px solid lightgrey;
  width: 100px;
  font-weight: bold;
`;

export const TextWrapper = styled(Grid)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const GridItem = styled(Grid).attrs({ item: true, xs: 12 })`
  margin: 8px 0;
`;

export const SliderWrapper = styled.div`
  padding: 0 15px;
`;
