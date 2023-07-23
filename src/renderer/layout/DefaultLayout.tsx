import React, { useState } from 'react';
import AppSideBar from 'renderer/components/AppSidebar';
import { Layout } from 'antd';
import AppContent from '../components/AppContent';
import routes from '../routes';

const { Content, Sider } = Layout;
const DefaultLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{ height: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <AppSideBar />
      </Sider>

      <Layout>
        <Content style={{ margin: '16px', overflowY: 'auto' }}>
          {/* <Header style={{ padding: 0, background: 'white' }} /> */}
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <AppContent routes={routes} />
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>Roche CI</Footer> */}
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
