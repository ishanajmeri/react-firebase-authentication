import React, { Component } from 'react';
import { Card, Form, Input, Row, Typography, Button, Alert } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { withFirebase } from '../../services/firebase';

class SignIn extends Component {
  state = { error: '' };

  handleFinish = (values) => {
    const { email, password } = values;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => this.props.history.push('/home'))
      .catch((error) => {
        console.log(error);
        this.setState({ error: error.code });
      });
  };
  render() {
    return (
      <Card style={{ paddingLeft: '5%' }}>
        <Row style={{ paddingBottom: '1%' }}>
          <Typography.Text underline strong style={{ fontSize: '22px' }}>
            Sign In
          </Typography.Text>
        </Row>
        <Row>
          <Form onFinish={this.handleFinish}>
            {this.state.error !== '' ? (
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
              <Input prefix={<MailOutlined />} placeholder="E-mail" />
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
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Link style={{ float: 'left' }} to="/forgotpassword">
                Forgot password?
              </Link>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
              >
                Sign In
              </Button>
              or&nbsp;
              <Link to="/signup">Register Now</Link>
            </Form.Item>
          </Form>
        </Row>
      </Card>
    );
  }
}

export default withFirebase(SignIn);
