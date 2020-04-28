import React from "react";
import ReactDOM from "react-dom";
import Amplify from "aws-amplify";

import awsExports from "./aws-exports";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { StoreProvider } from "./store";
import * as MonkeyPatchAudioContext from "./MonkeyPatch-AudioContext";

Amplify.configure(awsExports);

const monkeyPatchAudioContext = MonkeyPatchAudioContext;

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
