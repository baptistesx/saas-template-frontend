import { green, purple } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth"; // Firebase v9+
import "firebase/firestore";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider, FirestoreProvider, useFirebaseApp } from "reactfire";
import "./App.css";
import AdminRoute from "./components/AdminRoute";
import CheckedRoute from "./components/CheckedRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPanel from "./views/AdminPanel";
import Dashboard from "./views/Dashboard";
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
  const app = useFirebaseApp(); // a parent component contains a `FirebaseAppProvider`
  const firestoreInstance = getFirestore(app);
  const auth = getAuth(app);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState("");

  const [user, setUser] = useState({ loggedIn: false });
  const [error, setError] = useState("");

  const defaultUser = { loggedIn: false, email: "" };

  const UserContext = React.createContext({});
  const UserProvider = UserContext.Provider;
  const UserConsumer = UserContext.Consumer;

  function onAuthStateChange(callback) {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        callback({ loggedIn: true, email: user.email });
      } else {
        callback({ loggedIn: false });
      }
    });
  }

  const login = (email, password) =>
    new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then(async () => {
          // Check if user already registered
          const q = query(
            collection(firestoreInstance, "users"),
            where("email", "==", email)
          );

          const querySnapshot = await getDocs(q);

          if (querySnapshot.docs.length > 0) {
            resolve({
              isNewUser: false,
              data: querySnapshot.docs[0].data(),
              id: querySnapshot.docs[0].id,
            });
          } else {
            resolve({ error: true, message: "This user doesn't exist" });
            // return { error: true, message: "This user doesn't exist" };
          }
        })
        .catch((error) => {
          setError(error.code);
          reject(error);
        });
    });
  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  // const requestLogin = useCallback((email, password) => {
  //   console.log("will login with:", email, password);
  //   login(email, password).catch((error) => setError(error.code));
  //   console.log("aaa");
  // });

  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestoreInstance}>
        <UserProvider value={user}>
          {/* <userContext.Provider
            value={{
              isLoggedIn,
              setIsLoggedIn,
              email,
              setEmail,
              isAdmin,
              setIsAdmin,
            }}
          > */}
          <ThemeProvider theme={theme}>
            <Router>
              <Switch>
                <ProtectedRoute
                  exact
                  path="/workaway-messaging"
                  component={WorkawayMessaging}
                />

                <CheckedRoute exact path="/signup" component={SignUp} />

                <Route
                  exact
                  path="/"
                  render={(props) => <SignIn onClick={login} error={error} />}
                  // element={}
                  // element={<SignIn onClick={test} error={error} />}
                />

                <CheckedRoute
                  exact
                  path="/reset-password"
                  component={ResetPassword}
                />

                <ProtectedRoute exact path="/dashboard" component={Dashboard} />

                <AdminRoute exact path="/admin-panel" component={AdminPanel} />

                {/* <CheckedRoute exact path="/" component={Home} /> */}

                <Route path="/*" component={NotFound} />
              </Switch>
            </Router>
          </ThemeProvider>
          {/* </userContext.Provider> */}
        </UserProvider>
      </FirestoreProvider>
    </AuthProvider>
  );
}

export default App;
