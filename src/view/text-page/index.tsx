import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import useFetch from '@/hooks/common/useFetch';
import { getTextAll } from '@/axios';
import TextTable from './components/table';
import AddModal from './modal/add';
import './index.less';

const dicIds = (localStorage.getItem('dicIds') || '').split(',').map(item => (item = Number(item)));
export default function Text(props) {
    const { read } = props;

    const { data, dispatch: getTextTableData } = useFetch(getTextAll, { page: 0, size: Infinity });
    const [selectedKeys, setSelectedKeys] = useState<number[]>(dicIds);
    const [, setSelectedRows] = useState([]);

    // useEffect(() => {
    //     localStorage.setItem('dicIds', selectedKeys.join(','));
    // }, [selectedKeys]);

    return (
        <div className="text-page">
            <section className="m-list">
                {!read && (
                    <div className="u-operation">
                        <AddModal type="ADD" refresh={getTextTableData}>
                            <Button type="primary">导入</Button>
                        </AddModal>
                    </div>
                )}
                <TextTable
                    read={read}
                    dataSource={data?.content}
                    refresh={getTextTableData}
                    selectedKeys={selectedKeys}
                    setSelectedKeys={setSelectedKeys}
                    setSelectedRows={setSelectedRows}
                />
            </section>
        </div>
    );
}
