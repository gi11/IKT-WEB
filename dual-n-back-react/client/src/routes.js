import React from 'react';
import { Route } from 'react-router';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

export default (
    <Route>
      <Route path="login" component={LoginPage}/>
      <Route path="/" component={HomePage}>
        <Route path="*" component={NotFoundPage}/>
      </Route>
    </Route>
  );