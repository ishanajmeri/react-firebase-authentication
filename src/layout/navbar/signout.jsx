import { Button } from 'antd';
import React from 'react';
import { withFirebase } from '../../services/firebase';

const SignOutButton = ({ firebase }) => {
  return (
    <Button
      type="primary"
      onClick={() => {
        firebase.doSignOut();
        window.localStorage.removeItem('exp');
      }}
    >
      Sign Out
    </Button>
  );
};

export default withFirebase(SignOutButton);
