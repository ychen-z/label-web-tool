import React from 'react';
import { Divider } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import './index.less';

function Header(props: any) {
  const userName = localStorage.getItem('user');

  const onLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('roleType');
    location.href = '/api/logout';
  };

  return (
    <nav className="g-header-nav">
      <div className="g-header-nav-logo" />
      <div className="g-header-nav-title">电厂关键设备知识图谱</div>
      <div className="g-header-nav-login">
        <span className="avatar">Hi，{userName || '--'}</span>
        <Divider type="vertical" />
        <a onClick={onLogout}>
          <LogoutOutlined />
          退出登录
        </a>
      </div>
    </nav>
  );
}

export default withRouter(Header);
