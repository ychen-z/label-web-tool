import React, { useContext } from 'react';
import { Table, Space, Divider } from 'antd';
import IconSet from '@/components/icon';
import Ellipsis from '@/components/common/u-ellipsis';
import { GlobalContext } from '@/context';
import Export from '../modal/export';
import UpdateModal from '../modal/add';
import Del from '../modal/del';
import { delDic } from '@/axios';
import View from '../modal/view/index';

export default function TextTable(props) {
    const { loading, refresh, dataSource, read } = props;
    const { dispatchText } = useContext(GlobalContext);

    const rowSelection = {
        selectedRowKeys: props.selectedKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            props.setSelectedKeys(selectedRowKeys);
            dispatchText(selectedRowKeys);
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
            read: read,
            render: (text, record) => {
                return read ? text : <View {...record} />;
            }
        },
        {
            title: '语料描述',
            read: read,
            dataIndex: 'textsDescribe',
            key: 'textsDescribe',
            width: 400,
            render: text => <Ellipsis style={{ width: 400 }}>{text || '--'}</Ellipsis>
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
                    <Space>
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
        <Table
            loading={loading}
            rowKey="id"
            rowSelection={rowSelection}
            dataSource={dataSource}
            columns={columns.filter(item => item.read == read)}
            pagination={false}
        />
    );
}
