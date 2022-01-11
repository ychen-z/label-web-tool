import React, { useCallback } from 'react';
import { Table, Divider, Space } from 'antd';
import { Key, TableRowSelection, SorterResult } from 'antd/es/table/interface';
import { ColumnProps, TablePaginationConfig } from 'antd/es/table';
import { TemplateTableProps } from './interface';
import ModalAdd from '../modal-add';
import Del from '../del-icon';
import './index.less';

function TableList(props: TemplateTableProps) {
    const columns: ColumnProps<TemplateItem>[] = [
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
                        <a>编辑</a>
                    </ModalAdd>
                    <Divider type="vertical" />
                    <Del
                        key={record.key} // key
                        callback={() => {
                            console.log('!');
                        }}
                    />
                </Space>
            )
        }
    ];

    const rowSelection: TableRowSelection<TemplateItem> = {
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
        (
            pagination: TablePaginationConfig,
            filters: Record<string, Key[] | null>,
            sorter: SorterResult<TemplateItem> | SorterResult<TemplateItem>[]
        ) => {
            const tempParams = {
                pageSize: pagination.pageSize,
                currentPage: pagination.current,
                order: (sorter as SorterResult<TemplateItem>).order === 'ascend' ? 2 : 1,
                status: filters.status && filters.status.join(','),
                systemId: filters.system && filters.system.join(',')
            };
            props.getList(tempParams);
        },
        [props]
    );

    return (
        <div className="m-template-table-list">
            <Table
                loading={props.loading}
                rowKey="id"
                rowSelection={rowSelection}
                dataSource={props.list}
                columns={columns}
                onChange={handleTableChange}
                tableLayout="fixed"
                pagination={{ current: props.pagination.currentPage, total: props.pagination.total, showQuickJumper: true, showSizeChanger: true }}
            />
        </div>
    );
}

export default TableList;
