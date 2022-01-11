import React from 'react';
import { Layout } from 'antd';
import Routes from '@/router';
import { ContentProps } from '@/components/content/interface';
import './index.less';
import { hot } from 'react-hot-loader/root';

const { Content } = Layout;

const ContentCustom = (props: ContentProps) => {
    return (
        <Content className="g-content" style={{ marginLeft: 20 }}>
            <Routes {...props} />
        </Content>
    );
};

export default hot(ContentCustom);
