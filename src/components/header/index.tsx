import React from 'react';
import { withRouter } from 'react-router-dom';
import './index.less';

function Header(props: any) {
    return (
        <nav className="g-header-nav">
            <div className="g-header-nav-logo" />
        </nav>
    );
}

export default withRouter(Header);
