import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../firebase/context';

const withAuthentication = (Component) => {
  class withAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: JSON.parse(localStorage.getItem('authUser')),
      };
    }
    componentDidMount() {
      // this.listener = this.props.firebase.onAuthUserListener(
      //   (authUser) => {
      //     localStorage.setItem('authUser', JSON.stringify(authUser));
      //   },
      //   () => {
      //     localStorage.removeItem('authUser');
      //     this.setState({ authUser: null });
      //   }
      // );
    }
    componentWillUnmount() {
      this.listener();
    }
    render() {
      console.log(
        JSON.parse(localStorage.getItem('authUser')),
        'withauthentication'
      );
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }
  return withFirebase(withAuthentication);
};

export default withAuthentication;
