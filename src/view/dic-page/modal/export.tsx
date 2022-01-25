import React from 'react';
import XLSX from 'xlsx';
import { message } from 'antd';
import IconSet from '@/components/icon';

// 导出
export default function Export(props) {
    const export_event = () => {
        // console.log(this.state.dataSource[0].data);
        // 调用导出接口
    };
    return (
        <a onClick={export_event}>
            <IconSet type="icon-daochu" /> 导出
        </a>
    );
}
