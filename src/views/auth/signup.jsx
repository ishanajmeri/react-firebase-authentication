import React, { Component } from 'react';
import { Card, Form, Input, Row, Typography, Button, Alert, Col, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { withFirebase } from '../../services/firebase';

const SignUp = props => {
  const { firebase, history } = props;

  React.useEffect(() => {
    setLoading(false);
    if (firebase.auth.currentUser && firebase.auth.currentUser.emailVerified) {
      history.push('/home');
    } else {
      setLoading(true);
    }
  }, [firebase.auth.currentUser, history]);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const handleFinish = values => {
    console.log(values);
    const { username, email, password, isAdmin } = values;
    const roles = {};
    if (isAdmin !== undefined) {
      roles['ADMIN'] = 'ADMIN';
    }

    props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        return props.firebase.user(authUser.user.uid).set({
          username,
          email,
          roles
        });
      })
      .then(() => {
        props.firebase.doSendEmailVerification();

        props.firebase.doSignOut();
      })
      .then(() => props.history.push('/'))
      .catch(error => {
        console.log(error);
        setError(error.code);
      });
  };
  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col span={14}>
        <br />
        {loading && firebase && (
          <Card bodyStyle={{ padding: '0' }} style={{ boxShadow: '0px 4px 20px 10px rgba(84, 84, 84, 0.1)' }}>
            <Row /* justify="center" */ align="middle" gutter={48}>
              <Col lg={12} md={12} sm={0} xs={0} style={{ overflow: 'hidden' }}>
                <img
                  src={'https://i.picsum.photos/id/1/5616/3744.jpg?hmac=kKHwwU8s46oNettHKwJ24qOlIAsWN9d2TtsXDoCWWsQ'}
                  alt=""
                  height="100%"
                  /* width="100%" */ style={{ height: '80vh' }}
                />
              </Col>
              <Col lg={12} md={12} sm={24} xs={24}>
                <Row justify="center" align="middle">
                  <Col span={16}>
                    <Row>
                      <Col lg={24} md={24} sm={0} xs={0}>
                        <h3 style={{ fontWeight: 'bold' }}>Logo</h3>
                      </Col>
                    </Row>
                    <h2 style={{ fontWeight: 'bold' }}>Create Account</h2>
                    <Form onFinish={handleFinish}>
                      {error !== '' ? (
                        <Form.Item>
                          <Alert message={error} type="error" showIcon />
                        </Form.Item>
                      ) : null}
                      <Form.Item
                        name="username"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your Username!'
                          }
                        ]}
                      >
                        <Input prefix={<UserOutlined />} placeholder="Username" />
                      </Form.Item>
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            type: 'email',
                            message: 'The input is not valid E-mail!'
                          },
                          {
                            required: true,
                            message: 'Please input your E-mail!'
                          }
                        ]}
                      >
                        <Input prefix={<MailOutlined />} placeholder="E-mail" />
                      </Form.Item>

                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your password!'
                          },
                          { min: 6, message: 'At least has 6 letters.' }
                        ]}
                        hasFeedback
                      >
                        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                      </Form.Item>

                      <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: 'Please confirm your password!'
                          },
                          { min: 6, message: 'At least has 6 letters.' },
                          ({ getFieldValue }) => ({
                            validator(rule, value) {
                              if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                              }
                              return Promise.reject('The two passwords that you entered do not match!');
                            }
                          })
                        ]}
                      >
                        <Input.Password prefix={<LockOutlined />} placeholder="Confirm password" />
                      </Form.Item>
                      <Form.Item>
                        <Link style={{ float: 'left' }} to="/forgotpassword">
                          Forgot password?
                        </Link>
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                          Register
                        </Button>
                      </Form.Item>
                    </Form>
                    <Row>
                      <Col span={24}>
                        <span style={{ color: 'grey' }}>Already have an Account ?</span>
                        &nbsp;<a href="/signin">Login</a>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        )}
      </Col>
    </Row>
  );
};

export default withFirebase(SignUp);
