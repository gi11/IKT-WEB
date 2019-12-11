import React from "react";
import { decode } from "base-64";

var AuthStateContext = React.createContext();
var AuthDispatchContext = React.createContext();

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true, currentUser: getCurrentUser() };
    case "LOGIN_FAILURE":
      return { ...state, isAuthenticated: false, currentUser: null};
    case "LOGOUT_SUCCESS":
      return { ...state, isAuthenticated: false, currentUser: null };
    case "REGISTER_SUCCESS":
      return { ...state, isAuthenticated: false, currentUser: null };
    case "REGISTER_FAILURE":
      return { ...state, isAuthenticated: false, currentUser: null };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function tokenToUser(token) {
  if (token == null) {
    return null;
  } else {
    const decoded = decode(token.split(".")[1]);
    const payload = JSON.parse(decoded);
    const user = {
      id: payload._id,
      username: payload.username
    };
    return user;
  }
}

function checkIfAuthenticated() {
  return !!localStorage.getItem("dualnback_id_token");
}

function getCurrentUser() {
  return tokenToUser(localStorage.getItem("dualnback_id_token"));
}

function AuthProvider({ children }) {
  var [state, dispatch] = React.useReducer(authReducer, {
    isAuthenticated: checkIfAuthenticated(),
    currentUser: getCurrentUser()
  });

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

function useAuthState() {
  var context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
}

function useAuthDispatch() {
  var context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider");
  }
  return context;
}

function logOut(dispatch, history) {
  localStorage.removeItem("dualnback_id_token");
  dispatch({ type: "LOGOUT_SUCCESS" });
  history.push("/home");
}

export { AuthProvider, useAuthState, useAuthDispatch, logOut };
