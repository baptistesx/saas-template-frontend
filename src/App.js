import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./views/Home";
import WorkawayMessaging from "./views/WorkawayMessaging";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/workaway-messaging">
          <WorkawayMessaging />
        </Route>

        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
