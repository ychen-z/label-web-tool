import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { useParams } from 'react-router-dom';
import useFetch from '@/hooks/common/useFetch';
import { getDicAll } from '@/axios';
import Dictable from './components/table';
import AddModal from './modal/add';
import './index.less';

var TYPES = {
    rel: 1,
    dic: 0
};

export default function Dictionary(props) {
    const { read, setDicLength, type } = props;
    const params = useParams() as any;

    const dictType = TYPES[params.type];
    const subTitle = dictType == 1 ? '关系' : '实体';

    const { data, dispatch: getDicTableData, isLoading } = useFetch(getDicAll, { page: 0, size: Infinity, dictType }, false);
    const [selectedKeys, setSelectedKeys] = useState([]);

    useEffect(() => {
        if (setDicLength) {
            setDicLength(selectedKeys?.length || 0);
        }
    }, [selectedKeys, setDicLength]);

    useEffect(() => {
        let dictIdss = localStorage
            .getItem('dictIds-' + dictType)
            ?.split(',')
            .map(item => (item = Number(item)));
        getDicTableData({ page: 0, size: Infinity, dictType });
        setSelectedKeys(dictIdss);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dictType]);
    return (
        <div className="dic-page">
            <section className="m-list">
                {!read && (
                    <div className="u-operation">
                        <AddModal type="ADD" dictType={dictType} subTitle={subTitle} refresh={getDicTableData}>
                            <Button type="primary">+ 新增</Button>
                        </AddModal>
                    </div>
                )}

                <Dictable
                    model={type} // 预览模式
                    read={read}
                    subTitle={subTitle}
                    dictType={dictType}
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
