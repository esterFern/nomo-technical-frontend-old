import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Modal from "react-modal";

import "./App.css";

import Main from "Screens/Main/Main";
import Metrics from "Screens/Metrics/Metrics";

function App() {
  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/" exact={true}>
          <Main />
        </Route>
        <Route path="/metrics" exact={true}>
          <Metrics />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
