import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Layout, Button } from 'antd';

class Navbar extends Component {
  render() {
    return (
      <Layout.Header>
        <Row>
          <Col>
            <NavLink to="/">
              <img src="favicon.ico" alt="" style={{ height: '30%' }} />
            </NavLink>
            <Button type="link">
              <NavLink to="/">Home</NavLink>
            </Button>
          </Col>
          <Col>
            <Button type="link">
              <NavLink to="/main">Landing</NavLink>
            </Button>
            <Button type="link">
              <NavLink to="/account">Account</NavLink>
            </Button>
            <Button type="link">
              <NavLink to="/admin">Admin</NavLink>
            </Button>
            <Button type="link">
              <NavLink to="/signin">signIn</NavLink>
            </Button>
            <Button type="link">
              <NavLink to="/signup">SignUp</NavLink>
            </Button>
          </Col>
        </Row>
      </Layout.Header>
    );
  }
}

export default Navbar;
