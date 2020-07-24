import React from 'react';
import { Switch } from 'react-router-dom';
import RouteWithLayout from './routeWithLayouts';
import MainLayout from '../layout/layout';
import Home from '../views/home/home';
import Main from '../views/main/main';
import SignUp from '../views/auth/signup';
import SignIn from '../views/auth/signin';

const Routes = (props) => {
  return (
    <Switch>
      <RouteWithLayout
        component={Home}
        exact
        layout={MainLayout}
        auth={props.auth}
        path="/home"
      />
      <RouteWithLayout
        component={Main}
        exact
        layout={MainLayout}
        auth={props.auth}
        path="/"
      />
      <RouteWithLayout
        component={SignUp}
        exact
        layout={MainLayout}
        auth={props.auth}
        path="/signup"
      />
      <RouteWithLayout
        component={SignIn}
        exact
        layout={MainLayout}
        auth={props.auth}
        path="/signin"
      />
    </Switch>
  );
};

export default Routes;
