import React from 'react';
import { Card, Form, Input, Row, Button, Alert, Col } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { withFirebase } from '../../services/firebase';

const SignIn = props => {
  const { firebase, history } = props;
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(false);
    if (firebase.auth.currentUser && firebase.auth.currentUser.emailVerified) {
      history.push('/home');
    } else {
      setLoading(true);
    }
  }, [firebase.auth.currentUser, history]);

  const handleFinish = values => {
    const { email, password } = values;

    props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        if (!props.firebase.auth.currentUser.emailVerified) {
          console.log(props.firebase.auth.currentUser.emailVerified);
          props.firebase.doSignOut();
          window.localStorage.removeItem('exp');
          setError("you havn't verify your email address");
        } else {
          firebase.sessions().push({
            userId: props.firebase.auth.currentUser.uid,
            timeIn: firebase.serverValue.TIMESTAMP,
          });
          // const time = new Date(new Date().getTime() + 60000 * 2) - new Date();
          // window.localStorage.removeItem('exp');
          // window.localStorage.setItem('exp', time);
          props.history.push('/home');
        }
      })
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
                    <h2 style={{ fontWeight: 'bold' }}>Login Account</h2>
                    <Form onFinish={handleFinish}>
                      {error !== '' ? (
                        <Form.Item>
                          <Alert message={error} type="error" showIcon />
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
                        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                      </Form.Item>
                      <Form.Item>
                        <Link style={{ float: 'left' }} to="/forgotpassword">
                          Forgot password?
                        </Link>
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                          Sign In
                        </Button>
                        or&nbsp;
                        <Link to="/signup">Register Now</Link>
                      </Form.Item>
                    </Form>
                    <br />
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

export default withFirebase(SignIn);
