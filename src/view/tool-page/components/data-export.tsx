import React from 'react';
import IconSet from '@/components/icon';

// 导出
export default function Export() {
    return (
        <a href="/api/textCluster/export" target="_blank">
            <IconSet type="icon-daochu" /> 数据导出
        </a>
    );
}
