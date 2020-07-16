import React, { Component } from 'react';
import Routes from './routes/Routes';
import withAuthentication from './services/auth/withAuthentication';

class App extends Component {
  state = {};
  render() {
    return <Routes />;
  }
}

export default withAuthentication(App);
