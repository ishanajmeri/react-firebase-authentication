import React from 'react';
import AuthUserContext from './context';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../firebase/context';

const withAuthorization = (condition) => (Component) => {
  class withAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        (authUser) => {
          if (!condition(authUser)) {
            this.props.history.push('/signin');
          }
        },
        () => this.props.history.push('/signin')
      );
    }
    componentWillUnmount() {
      this.listener();
    }
    render() {
      console.log('withauthorization');
      return (
        <AuthUserContext.Consumer>
          {(authUser) =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }
  return withRouter(withFirebase(withAuthorization));
};

export default withAuthorization;
