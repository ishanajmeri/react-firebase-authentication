import React from 'react';
import { Switch } from 'react-router-dom';
import RouteWithLayout from './routeWithLayouts';
import MainLayout from '../layout/layout';
import Home from '../views/home/home';
import Main from '../views/main/main';
import SignUp from '../views/auth/signup';
import SignIn from '../views/auth/signin';
import ForgotPassword from '../views/auth/forgotPassword';

const Routes = () => {
  return (
    <Switch>
      <RouteWithLayout component={Main} exact layout={MainLayout} path="/" />
      <RouteWithLayout component={Home} exact layout={MainLayout} path="/home" />
      <RouteWithLayout component={SignUp} exact layout={MainLayout} path="/signup" navbar={false} />
      <RouteWithLayout component={SignIn} exact layout={MainLayout} path="/signin" navbar={false} />
      <RouteWithLayout component={ForgotPassword} exact layout={MainLayout} path="/forgotpassword" />
    </Switch>
  );
};

export default Routes;
