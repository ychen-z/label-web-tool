import React from 'react';
import XLSX from 'xlsx';
import { message } from 'antd';
import IconSet from '@/components/icon';

// 导出
export default function Export(props) {
    const export_event = () => {
        // console.log(this.state.dataSource[0].data);
        var filename = `字典-${new Date().getTime()}.xls`;
        const { data } = props;
        const loadData: Array<Array<string>> = data.data.map((value: { name: string; label: string; abbreviations?: any }) => [
            value['label'],
            value['name'],
            ...value['abbreviations']
        ]);
        loadData.unshift(['标签', '全称', '别名']);
        var sheetName = 'Sheet1';
        var wb = XLSX.utils.book_new(),
            ws = XLSX.utils.aoa_to_sheet(loadData);
        console.log(ws);
        XLSX.utils.book_append_sheet(wb, ws, sheetName);
        XLSX.writeFile(wb, filename);
        message.success('字典导出成功!', 1);
    };
    return (
        <a onClick={export_event}>
            <IconSet type="icon-daochu" /> 导出
        </a>
    );
}
