import React, { useReducer } from "react";
import { AuthContext } from "./auth-context";

//checking if user already exists in local storage otherwise null in initial state
const userInfo = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : { userInfo: null };

const initialAuthState = userInfo;
console.log(initialAuthState);
//auth reducer function
const authReducer = (state, action) => {
  if (action.type === "SET_USER") {
    // console.log(action.type);
    const newUser = action.user;
    // console.log(newUser);
    return newUser;
  } else return state;
};

//auth Provider function
const AuthProvider = (props) => {
  const [authState, dispatchAuthAction] = useReducer(
    authReducer,
    initialAuthState
  );

  const setUserHandler = (user) => {
    dispatchAuthAction({ type: "SET_USER", user: user });
  };

  const authContext = {
    user: authState,
    setUser: setUserHandler,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
