import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import useFetch from '@/hooks/common/useFetch';
import { getDicAll } from '@/axios';
import Dictable from './components/table';
import AddModal from './modal/import-modal-add';
import './index.less';

export default function Dictionary(props) {
    const { read, setDicLength } = props;
    const dictIdss = localStorage
        .getItem('dictIds')
        ?.split(',')
        .map(item => (item = Number(item)));
    const { data, dispatch: getDicTableData, isLoading } = useFetch(getDicAll, { page: 0, size: Infinity });
    const [selectedKeys, setSelectedKeys] = useState(dictIdss);

    useEffect(() => {
        if (setDicLength) {
            setDicLength(selectedKeys?.length || 0);
        }
    }, [selectedKeys, setDicLength]);
    return (
        <div className="dic-page">
            <section className="m-list">
                {!read && (
                    <div className="u-operation">
                        <AddModal type="ADD" refresh={getDicTableData}>
                            <Button type="primary">+ 新增</Button>
                        </AddModal>
                    </div>
                )}

                <Dictable
                    read={read}
                    loading={isLoading}
                    dataSource={data?.content}
                    refresh={getDicTableData}
                    selectedKeys={selectedKeys}
                    setSelectedKeys={setSelectedKeys}
                />
            </section>
        </div>
    );
}
