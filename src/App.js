import { blue, green } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import AdminRoute from "./components/routes/AdminRoute";
import NotSignedInRoute from "./components/routes/NotSignedInRoute";
import PremiumRoute from "./components/routes/PremiumRoute";
import SignedInRoute from "./components/routes/SignedInRoute";
import AdminPanel from "./views/AdminPanel";
import ResetPassword from "./views/auth/ResetPassword";
import SignIn from "./views/auth/SignIn";
import SignUp from "./views/auth/SignUp";
import Dashboard from "./views/Dashboard";
import Home from "./views/Home";
import NotFound from "./views/NotFound";
import WorkawayBot from "./views/workawayBot/WorkawayBot";

//TODO: replace localStorage with Context
//TODO: create custom hooks, example: useAuth

const theme = createTheme({
  palette: {
    primary: {
      main: blue[900],
      mainGradient: "linear-gradient(to right, #0d47a1, #2196f3)",
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
          <NotSignedInRoute exact path="/" component={Home} />
          <NotSignedInRoute exact path="/signup" component={SignUp} />
          <NotSignedInRoute exact path="/signin" component={SignIn} />
          <NotSignedInRoute
            exact
            path="/reset-password"
            component={ResetPassword}
          />

          <SignedInRoute exact path="/dashboard" component={Dashboard} />

          <PremiumRoute
            exact
            path="/workaway-bot"
            component={WorkawayBot}
          />

          <AdminRoute exact path="/admin-panel" component={AdminPanel} />

          <Route path="/*" component={NotFound} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
