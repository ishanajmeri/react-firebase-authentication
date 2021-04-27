import React from 'react';
import { Layout } from 'antd';
import Navbar from './navbar/navbar';

const MainLayout = props => {
  const { navbar = true } = props;
  return (
    <div>
      <Layout>
        {navbar ? <Navbar /> : null}
        <main>
          {/* {childern} */}
          {props.children}
        </main>
      </Layout>
    </div>
  );
};

export default MainLayout;
