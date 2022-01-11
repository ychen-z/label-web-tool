import React from 'react';
import { withRouter } from 'react-router-dom';
import Icon from '@ant-design/icons';
import { Logo } from '@/assets/icon';
import './index.less';

function Header(props: any) {
    return (
        <nav className="g-header-nav">
            <Icon style={{ textAlign: 'left' }} component={Logo} />
            实体抽取工具
        </nav>
    );
}

export default withRouter(Header);
