import React from 'react';
import { withRouter } from 'react-router-dom';
import './index.less';

function Header(props: any) {
  return (
    <nav className="g-header-nav" style={{ display: 'none' }}>
      <div className="g-header-nav-logo" />
      <div className="g-header-nav-title">电厂关键设备知识图谱</div>
    </nav>
  );
}

export default withRouter(Header);
