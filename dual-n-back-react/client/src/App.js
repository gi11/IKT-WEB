import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import ScorePage from './pages/ScorePage';

import { useAuthState } from "./context/AuthContext";

function App() {
  var { isAuthenticated } = useAuthState();

  return (
    <Switch>
      <Route path="/home">
        <HomePage />
      </Route>
      <Route path="/game">
        <HomePage />
      </Route>
      <AuthRoute path="/profile" component={ProfilePage} />
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/register">
        <RegisterPage />
      </Route>
      <Route path="/scores">
        <ScorePage />
      </Route>
      <Route path="/">
        <NotFoundPage />
      </Route>
    </Switch>
  );

  function AuthRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
        }
      />
    );
  }
}

export default App;
