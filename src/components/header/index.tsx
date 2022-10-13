import React from 'react';
import { Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { casLogout } from '@/axios';
import './index.less';

function Header(props: any) {
  const logout = () => {
    casLogout().then(res => {
      //:TODO: 重定向到
      // window.open('xxx');
    });
  };
  const userName = localStorage.getItem('user') || '专家';

  return (
    <nav className="g-header-nav">
      <div className="g-header-nav-logo" />
      <div className="g-header-nav-title">电厂关键设备知识图谱</div>
      <Menu mode="horizontal" className="g-header-nav-login">
        <Menu.SubMenu title={<span className="avatar">Hi，{userName || '--'}</span>}>
          <Menu.Item key="logout">
            <span onClick={logout}>
              <LogoutOutlined />
              退出登录
            </span>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </nav>
  );
}

export default withRouter(Header);
