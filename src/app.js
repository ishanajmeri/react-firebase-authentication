import React, { Component } from 'react';
import Routes from './routes/Routes';
import { withAuthentication } from './services/auth';

class App extends Component {
  state = {};
  render() {
    return (
      <div>
        <Routes />
      </div>
    );
  }
}

export default withAuthentication(App);
