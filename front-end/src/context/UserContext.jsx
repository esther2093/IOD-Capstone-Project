import React, { useState, useContext, createContext } from "react";
import { useCookies } from "react-cookie";

//create context
const UserContext = createContext();

export const UserProvider = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]); // get cookies and helper functions empty array is dependencies

  // store the current user in state at the top level
  const [currentUser, setCurrentUser] = useState(cookies.user ? cookies.user : {});

  // sets user object in state, shared via context
  const handleUpdateUser = (user) => {
    if (user.email) {
      setCookie("user", JSON.stringify(user), { path: "/", maxAge: 60 * 60 * 24 * 2 });
    } else {
      removeCookie("user");
    }
    setCurrentUser(user);
  };
 // sending current user and update user function via value prop to all children at every level
  return <UserContext.Provider value={{ currentUser, handleUpdateUser }}>{props.children}</UserContext.Provider>;
};
//custom hook to access context 
export const useUserContext = () => {
  return useContext(UserContext);
};
