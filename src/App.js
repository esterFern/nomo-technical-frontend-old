import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Main from "./screens/Main/Main";
import Metrics from "./screens/Metrics/Metrics";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/metrics">
          <Metrics />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
