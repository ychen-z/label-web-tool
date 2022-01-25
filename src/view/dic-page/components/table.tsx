import React from 'react';
import { Table, Space, Divider } from 'antd';
import IconSet from '@/components/icon';
import Export from '../modal/export';
import ImportModal from '../modal/import-modal';
import View from '../view/index';

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
            title: '字典名称',
            dataIndex: 'dictionaryName',
            key: 'dictionaryName',
            width: 240,
            render: (text, record) => {
                return <View {...record} />;
            }
        },
        {
            title: '字典描述',
            dataIndex: 'dictionaryDescribe',
            key: 'dictionaryDescribe'
        },
        {
            title: '快捷键',
            dataIndex: 'keyName',
            key: 'keyName'
        },
        {
            title: '标签颜色',
            dataIndex: 'color',
            key: 'color',
            render: text => {
                return <div style={{ background: text, width: 40, height: 8, borderRadius: 10 }} />;
            }
        },
        {
            title: '包含词量',
            dataIndex: 'wordsNum',
            key: 'words',
            width: 140
        },
        {
            title: '字典容量',
            dataIndex: 'dictsContent',
            key: 'dictsContent',
            width: 140
        },
        {
            title: '操作',
            width: 140,
            render: (elem: any, row: any, index: number) => {
                return (
                    <Space size="10">
                        <ImportModal data={row} id={row.id} type="EDIT" refresh={refresh}>
                            <a>
                                <IconSet type="icon-bianji" /> 编辑
                            </a>
                        </ImportModal>
                        <Divider type="vertical" />
                        <Export data={row} />
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
