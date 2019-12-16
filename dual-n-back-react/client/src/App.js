import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import ScorePage from "./pages/ScorePage";
import GamePage from "./pages/GamePage";

import { useAuthState } from "./context/AuthContext";

function App() {
  var { isAuthenticated } = useAuthState();

  //Redirects to /login if not authenticated
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

  return (
    <Switch>
      <Route exact path="/" component={HomePage}/>
      <AuthRoute path="/game" component={GamePage} />
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
      <Redirect from="/home" to="/"/>
      <Route path="*" component={NotFoundPage}/>
    </Switch>
  );
}

export default App;
