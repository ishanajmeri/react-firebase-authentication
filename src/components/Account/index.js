import React from 'react';

import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { withAuthorization, AuthUserContext } from '../Session';

const AccountPage = () => (
  <div>
    <AuthUserContext.Consumer>
      {(authUser) => (
        <div>
          <h1>Account Page</h1>
          <PasswordForgetForm />
          <PasswordChangeForm />
        </div>
      )}
    </AuthUserContext.Consumer>
  </div>
);
const condition = (authUser) => !!authUser;
export default withAuthorization(condition(AccountPage));
