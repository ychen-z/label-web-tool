import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import useFetch from '@/hooks/common/useFetch';
import { getTextAll } from '@/axios';
import TextTable from './components/table';
import AddModal from './modal/add';
import './index.less';

export default function Text(props) {
    const { read, setTextLength } = props;
    const textIdss = localStorage
        .getItem('textIds')
        ?.split(',')
        .map(item => (item = Number(item)));
    const { data, dispatch: getTextTableData } = useFetch(getTextAll, { page: 0, size: Infinity });
    const [selectedKeys, setSelectedKeys] = useState(textIdss);
    const [, setSelectedRows] = useState([]);

    useEffect(() => {
        if (setTextLength) {
            setTextLength(selectedKeys?.length || 0);
        }
    }, [selectedKeys, setTextLength]);

    return (
        <div className="text-page">
            <section className="m-list">
                {!read && (
                    <div className="u-operation">
                        <AddModal type="ADD" refresh={getTextTableData}>
                            <Button type="primary">+ 新增</Button>
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
