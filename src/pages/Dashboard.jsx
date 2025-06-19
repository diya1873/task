import React, { useState, useEffect } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  UserSwitchOutlined,
  HomeOutlined,
  LogoutOutlined,
  TeamOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Drawer } from 'antd';
import { useNavigate, Outlet } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: <span style={{ fontSize: collapsed ? '12px' : '16px' }}>الرئيسية</span>,
      onClick: () => {
        navigate('/dashboard');
        setMobileMenuVisible(false);
      },
    },
    {
      key: 'users',
      icon: <UserOutlined />,
      label: <span style={{ fontSize: collapsed ? '12px' : '16px' }}>المستخدمين</span>,
      onClick: () => {
        navigate('/dashboard/users');
        setMobileMenuVisible(false);
      },
    },
    {
      key: 'user-groups',
      icon: <TeamOutlined />,
      label: <span style={{ fontSize: collapsed ? '12px' : '16px' }}>مجموعات المستخدمين</span>,
      onClick: () => {
        navigate('/dashboard/user-groups');
        setMobileMenuVisible(false);
      },
    },
    {
      key: 'branches',
      icon: <ShopOutlined />,
      label: <span style={{ fontSize: collapsed ? '12px' : '16px' }}>الفروع</span>,
      onClick: () => {
        navigate('/dashboard/branches');
        setMobileMenuVisible(false);
      },
    },
  ];

  const logoutItem = {
    key: 'logout',
    icon: <LogoutOutlined />,
    label: <span style={{ fontSize: collapsed ? '12px' : '16px' }}>تسجيل الخروج</span>,
    onClick: handleLogout,
    style: { marginTop: 'auto' },
  };

  return (
    <Layout style={{ direction: 'rtl', minHeight: '100vh' }}>
      {!isMobile && (
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div
            style={{
              color: 'white',
              fontSize: collapsed ? '24px' : '20px',
              textAlign: 'center',
              padding: '16px',
              transition: 'all 0.3s ease',
            }}
          >
            {collapsed ? <UserSwitchOutlined /> : 'FUTEC-SOFT'}
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['home']}
            items={[...menuItems, logoutItem]}
            style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          />
        </Sider>
      )}

      {isMobile && (
        <Drawer
          title="FUTEC-SOFT"
          placement="right"
          open={mobileMenuVisible}
          onClose={() => setMobileMenuVisible(false)}
          width="80vw"
          styles={{
            body: { padding: 0 },
            header: { textAlign: 'right' },
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['home']}
            items={[...menuItems, logoutItem]}
            style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          />
        </Drawer>
      )}

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', justifyContent: 'flex-start' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => {
              if (isMobile) {
                setMobileMenuVisible(true);
              } else {
                setCollapsed(!collapsed);
              }
            }}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>

        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
