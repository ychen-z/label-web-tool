import React, { useCallback } from 'react';
import { Table, Divider, Space } from 'antd';
import { TablePaginationConfig } from 'antd/es/table';
import IconSet from '@/components/icon';
import { delTextData } from '@/axios';
import { TemplateTableProps } from './interface';
import ModalAdd from '../../../dict-data-modal';
import Del from '../../../del';
import './index.less';

function TableList(props: TemplateTableProps) {
    const { refresh } = props;
    const columns = [
        {
            title: '语料',
            dataIndex: 'text',
            key: 'text'
        },

        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            width: '200px',
            ellipsis: true,
            render: (text, record) => (
                <Space>
                    <ModalAdd isEdit data={record} refresh={refresh}>
                        <a>
                            <IconSet type="icon-bianji" /> 编辑
                        </a>
                    </ModalAdd>
                    <Divider type="vertical" />
                    <Del id={record.id} func={delTextData} refresh={refresh} />
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
                size: pagination.size,
                page: pagination.current
            };
            refresh(tempParams);
        },
        [refresh]
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
