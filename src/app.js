import React from 'react';
import { withAuthentication } from './services/auth';
import Routes from './routes/Routes';

const App = props => {
  const { firebase } = props;
  React.useEffect(() => {
    let exp;
    if (typeof window !== 'undefined') {
      exp = window.localStorage.getItem('exp');
    }
    console.log(exp);
    // if (exp > new Date()) console.log('expired');
    setTimeout(() => {
      firebase.doSignOut();
      // console.log('time');
      window.localStorage.removeItem('exp');
    }, exp);
  });
  return (
    <div>
      <Routes />
    </div>
  );
};

export default withAuthentication(App);
