import { createContext } from "react";

const userContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: (auth) => {},
  email: "",
  setEmail: (email) => {},
  isAdmin: "",
  setIsAdmin: (isAdmin) => {},
});

export default userContext;
