import React from 'react';
import { withRouter } from 'react-router-dom';
import './index.less';

function Header(props: any) {
    return (
        <nav className="g-header-nav">
            <div className="g-header-nav-logo" />
            <div className="g-header-nav-title">实体抽取工具</div>
        </nav>
    );
}

export default withRouter(Header);
