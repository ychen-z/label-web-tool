import React from 'react';
import { Table, Space, Divider } from 'antd';
import IconSet from '@/components/icon';
import Export from '../modal/export';
import UpdateModal from '../modal/import-modal-add';
import Del from '../modal/del';
import { delDic } from '@/axios';
import View from '../modal/view/index';

export default function Dtable(props) {
    const { loading, refresh, dataSource } = props;
    const rowSelection = {
        selectedRowKeys: props.selectedKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            props.setSelectedKeys(selectedRowKeys);
        },
        getCheckboxProps: record => ({
            id: record.id + ''
        })
    };

    const columns = [
        {
            title: '语料名称',
            dataIndex: 'textsName',
            key: 'textsName',
            width: 240,
            render: (text, record) => {
                return <View {...record} />;
            }
        },
        {
            title: '语料描述',
            dataIndex: 'textsDescribe',
            key: 'textsDescribe'
        },
        {
            title: '包含词量',
            dataIndex: 'wordsNum',
            key: 'words',
            width: 140,
            render: (text, record) => text || '--'
        },
        {
            title: '语料容量',
            dataIndex: 'textsContent',
            key: 'textsContent',
            width: 140,
            render: (text, record) => text || '--'
        },
        {
            title: '操作',
            width: 220,
            render: (elem: any, row: any, index: number) => {
                return (
                    <Space size="10">
                        <UpdateModal data={row} type="EDIT" refresh={refresh}>
                            <a>
                                <IconSet type="icon-bianji" /> 编辑
                            </a>
                        </UpdateModal>
                        <Divider type="vertical" />
                        <Export data={row} />
                        <Divider type="vertical" />
                        <Del id={row.id} func={delDic} refresh={refresh} />
                    </Space>
                );
            }
        }
    ];
    return (
        <div>
            <Table
                loading={loading}
                rowKey="id"
                rowSelection={rowSelection}
                dataSource={dataSource}
                refresh={refresh}
                columns={columns}
                pagination={null}
            />
        </div>
    );
}
