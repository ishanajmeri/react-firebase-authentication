import React, { Component } from 'react';
import { Button, Form, Input } from 'antd';
class DefaultLoginToggle extends Component {
  state = {};
  handleFinish = (value) => {
    this.props.onLink(value.password);
  };
  render() {
    const { onlyOneLeft, isEnabled, signInMethod, onUnlink } = this.props;
    console.log(isEnabled, 'default');
    return isEnabled ? (
      <Button
        type="primary"
        onClick={() => onUnlink(signInMethod.id)}
        disabled={onlyOneLeft}
      >
        Deactivate {signInMethod.id}
      </Button>
    ) : (
      <Form onFinish={this.handleFinish}>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
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
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Link {signInMethod.id}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default DefaultLoginToggle;
