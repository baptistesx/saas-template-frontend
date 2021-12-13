import { createContext } from "react";

const userContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: (auth) => {},
  email: "",
  setEmail: (email) => {},
});

export default userContext;
