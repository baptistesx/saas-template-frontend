import { green, purple } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import CheckedRoute from "./components/CheckedRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import userContext from "./utils/userContext";
import Dashboard from "./views/Dashboard";
import Home from "./views/Home";
import NotFound from "./views/NotFound";
import ResetPassword from "./views/ResetPassword";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <userContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        email,
        setEmail,
      }}
    >
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <ProtectedRoute
              exact
              path="/workaway-messaging"
              component={WorkawayMessaging}
            />

            <CheckedRoute exact path="/signup" component={SignUp} />

            <CheckedRoute exact path="/signin" component={SignIn} />

            <CheckedRoute
              exact
              path="/reset-password"
              component={ResetPassword}
            />

            <ProtectedRoute exact path="/dashboard" component={Dashboard} />

            <CheckedRoute exact path="/" component={Home} />

            <Route path="/*" component={NotFound} />
          </Switch>
        </Router>
      </ThemeProvider>
    </userContext.Provider>
  );
}

export default App;
