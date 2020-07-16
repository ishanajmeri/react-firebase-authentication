import React, { Component } from 'react';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import { Link, withRouter } from 'react-router-dom';
import { Form, Input, Button, Alert, Card, Row } from 'antd';
import { compose } from 'recompose';

const SignInPage = () => {
  return (
    <Row justify="center">
      <Card>
        <h1>SignIn</h1>
        <SignInForm />
        <PasswordForgetLink />
        <SignUpLink />
      </Card>
    </Row>
  );
};

class SignInFormBase extends Component {
  state = {
    error: null,
  };
  onSubmit = (value) => {
    const { email, password } = value;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.history.push('/');
      })
      .catch((error) => {
        this.setState({ error: error.code });
      });
  };
  render() {
    return (
      <Form onFinish={this.onSubmit}>
        {this.state.error !== null ? (
          <Form.Item>
            <Alert message={this.state.error} type="error" showIcon />
          </Form.Item>
        ) : null}
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input placeholder="E-mail" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            { min: 6, message: 'At least has 6 letters.' },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

const SignUpLink = () => (
  <p>
    Don't have an account?<Link to="/signup">Sign Up</Link>
  </p>
);
export default SignInPage;
