import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { Form, Input, Button, Alert, Card, Row } from 'antd';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

const SignUpPage = () => {
  return (
    <Card>
      <Row justify="center">
        <h1>SignUp</h1>
      </Row>
      <Row justify="center">
        <SignUpForm />
      </Row>
    </Card>
  );
};

class SignUpFormBase extends Component {
  state = {
    error: null,
  };
  handleFinish = (value) => {
    const { username, email, password } = value;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
        });
      })
      .then(() => {
        this.props.history.push('/home');
      })
      .catch((error) => {
        this.setState({ error: error.code });
      });
  };
  render() {
    return (
      <Form onFinish={this.handleFinish}>
        {this.state.error !== null ? (
          <Form.Item>
            <Alert message={this.state.error} type="error" showIcon />
          </Form.Item>
        ) : null}
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input placeholder="Username" />
        </Form.Item>
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

        <Form.Item
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            { min: 6, message: 'At least has 6 letters.' },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  'The two passwords that you entered do not match!'
                );
              },
            }),
          ]}
        >
          <Input.Password
            // prefix={<LockOutlined />}
            placeholder="Confirm password"
          />
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

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);
export default SignUpPage;

export { SignUpForm };
