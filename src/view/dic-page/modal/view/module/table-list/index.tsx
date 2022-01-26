import React, { useCallback } from 'react';
import { Table, Divider, Space } from 'antd';
import { TablePaginationConfig } from 'antd/es/table';
import IconSet from '@/components/icon';
import { delDictData } from '@/axios';
import { TemplateTableProps } from './interface';
import ModalAdd from '../../../data-modal';
import Del from '../../../del';
import './index.less';

function TableList(props: TemplateTableProps) {
    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            width: '10%'
        },

        {
            title: '别名',
            dataIndex: 'abbreviations',
            key: 'abbreviations',
            ellipsis: true
        },
        {
            title: '标签',
            dataIndex: 'label',
            key: 'label',
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
                    <ModalAdd isEdit data={record}>
                        <a>
                            <IconSet type="icon-bianji" /> 编辑
                        </a>
                    </ModalAdd>
                    <Divider type="vertical" />
                    <Del id={row.id} func={delDictData} />
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
