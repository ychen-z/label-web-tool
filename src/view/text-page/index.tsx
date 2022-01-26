import React, { useState } from 'react';
import { Button } from 'antd';
import useFetch from '@/hooks/common/useFetch';
import { getTextAll } from '@/axios';
import TextTable from './components/table';
import AddModal from './modal/add';
import './index.less';

export default function Dictionary(props) {
    const { data, dispatch: getTextTableData } = useFetch(getTextAll, { page: 0, size: Infinity });
    const [selectedKeys, setSelectedKeys] = useState([]);
    return (
        <div className="text-page">
            <section className="m-list">
                <div className="u-operation">
                    <AddModal type="ADD" refresh={getTextTableData}>
                        <Button type="primary">导入</Button>
                    </AddModal>
                </div>
                <TextTable dataSource={data?.content} refresh={getTextTableData} selectedKeys={selectedKeys} setSelectedKeys={setSelectedKeys} />
            </section>
        </div>
    );
}
