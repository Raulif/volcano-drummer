import React from "react";

import { sequenceReducer } from "./reducers";

export const Store = React.createContext();

const initialState = {
  currentSequence: undefined,
  sequences: [],
  sequencePlaying: false,
};

export const StoreProvider = (props) => {
  const [state, dispatch] = React.useReducer(sequenceReducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
