import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Row, Col, Layout, Button, Typography } from 'antd';

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
              <NavLink to="/">Landing</NavLink>
            </Button>
            <Button type="link">
              <NavLink to="/">Account</NavLink>
            </Button>
            <Button type="link">
              <NavLink to="/">Admin</NavLink>
            </Button>
            <Button type="link">
              <NavLink to="/">signIn</NavLink>
            </Button>
            <Button type="link">
              <NavLink to="/">SignUp</NavLink>
            </Button>
          </Col>
        </Row>
      </Layout.Header>
    );
  }
}

export default Navbar;
