/* eslint-disable react/require-default-props */
import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

interface Props {
    type: string;
    mode?: 'svg' | 'span';
    style?: React.CSSProperties;
    className?: string;
    onClick?: (event: React.MouseEvent) => void;
}

const IconSvg = createFromIconfontCN({
    scriptUrl: ['//at.alicdn.com/t/font_2718552_cqxp2b9f42d.js']
});

const IconFont = (props: Props) => {
    const { type, mode = 'svg', ...res } = props;
    return mode === 'svg' ? <IconSvg type={type} {...res} /> : <span className={`iconfont ${type}`} {...res} />;
};

export default IconFont;
