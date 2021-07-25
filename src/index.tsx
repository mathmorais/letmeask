import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { config } from "./services/firebase/config";
import { firebaseConnection } from "./services/firebase/connection";
firebaseConnection.initializeApp(config);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
