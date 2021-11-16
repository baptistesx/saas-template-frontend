import { green, purple } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./views/Home";
import WorkawayMessaging from "./views/WorkawayMessaging";

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
    success: {
      main: green[500],
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
