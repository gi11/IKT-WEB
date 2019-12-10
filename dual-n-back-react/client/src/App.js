import React from 'react';
import { Switch, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
// import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ScorePage from './pages/ScorePage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/game">
          <HomePage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/scores">
          <ScorePage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
        {/* <PrivateRoute path="/auth_test" component={Layout} /> */}
      </Switch>
    </BrowserRouter>
  );
}

// function PrivateRoute({ component, ...rest }) {
//   return (
//     <Route {...rest} render= {
//         props =>
//           isAuthenticated ? (
//             React.createElement(component, props)
//           ) : (
//               <Redirect to={
//                 {
//                   pathname: "/login",
//                   state: {
//                     from: props.location,
//                   },
//                 }
//               }
//               />
//             )
//       }
//     />
//   );
// }

export default App;
