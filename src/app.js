import React from 'react';
import { withAuthentication } from './services/auth';
import Routes from './routes/Routes';

const App = props => {
  const { firebase } = props;
  function getToken() {
    let time = false;
    if (firebase.auth.currentUser) {
      console.log(firebase);
      const uid = firebase.auth.currentUser.uid;
      firebase
        .sessions()
        .orderByChild('userId')
        .equalTo(uid)
        .limitToLast(1)
        .on('value', snapshot => {
          const sessionObject = snapshot.val();
          if (!sessionObject) return false;
          console.log(sessionObject, 'sessionObject');
          try {
            const session = Object.keys(sessionObject).map(key => ({
              ...sessionObject[key],
            }));
            // console.log(session[0].timeIn);
            console.log(session, 'session');
            time = session[0].timeIn;
          } catch (err) {
            throw new Error(err);
          }
        });
    }
    return time;
  }
  let time = getToken();

  let timerId = setInterval(() => {
    if (!time) {
      time = getToken();
      console.log('time', time + 6000 * 2 <= new Date().getTime(), time, new Date().getTime());
      if (time + 6000 * 2 <= new Date().getTime()) {
        console.log('time1');
        firebase.doSignOut();
        clearInterval(timerId);
      }
    }
  }, 10000);

  // if (exp) {
  //   setTimeout(() => {
  //     firebase.doSignOut();
  //     console.log('time');
  //     window.localStorage.removeItem('exp');
  //   }, exp);
  // }

  return (
    <div>
      <Routes />
    </div>
  );
};

export default withAuthentication(App);
