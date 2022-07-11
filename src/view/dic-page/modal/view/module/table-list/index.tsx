import React, { useCallback } from 'react';
import { Table, Divider, Space } from 'antd';
import { TablePaginationConfig } from 'antd/es/table';
import IconSet from '@/components/icon';
import { delDictData } from '@/axios';
import ModalAdd from '../../../dict-data';
import Del from '../../../del';
import './index.less';

function TableList(props) {
    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            width: '10%'
        },

        {
            title: '别名',
            dataIndex: 'alias',
            key: 'alias',
            ellipsis: true,
            render: text => {
                return <div>{text ? text.join('，') : '--'}</div>;
            }
        },

        {
            title: '尾实体',
            dataIndex: 'endName',
            key: 'endName',
            ellipsis: true
        },

        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            width: '200px',
            ellipsis: true,
            render: (text, record) => (
                <Space>
                    <ModalAdd type="EDIT" data={record} refresh={props.getList}>
                        <a>
                            <IconSet type="icon-bianji" /> 编辑
                        </a>
                    </ModalAdd>
                    <Divider type="vertical" />
                    <Del id={record.id} func={delDictData} refresh={props.getList} />
                </Space>
            )
        }
    ];

    const rowSelection = {
        selectedRowKeys: props.selectedKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            props.setSelectedKeys(selectedRowKeys as number[]);
            props.setSelectedCodes(selectedRows.map(item => item.code));
        },
        getCheckboxProps: record => ({
            id: record.id + ''
        })
    };

    const handleTableChange = useCallback(
        (pagination: TablePaginationConfig) => {
            const tempParams = {
                size: pagination.pageSize,
                page: pagination.current
            };
            props.getList(tempParams);
        },
        [props]
    );

    return (
        <div className="u-table-list">
            <Table
                loading={props.loading}
                rowKey="id"
                rowSelection={rowSelection}
                dataSource={props.list}
                columns={columns}
                onChange={handleTableChange}
                tableLayout="fixed"
                pagination={{ current: props.pagination.page, total: props.pagination.total, showQuickJumper: true, showSizeChanger: true }}
            />
        </div>
    );
}

export default TableList;
