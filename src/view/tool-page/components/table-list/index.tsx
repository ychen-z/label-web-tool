import React, { useCallback, useEffect, useState } from 'react';
import { Table } from 'antd';
import { TablePaginationConfig } from 'antd/es/table';
import { getSampleData } from '@/axios';
import useFetch from '@/hooks/common/useFetch';
import './index.less';

function TableList(props) {
    const DEFAULT_PARAM = {
        type: 'model',
        page: 1,
        size: 10
    };

    const columns = [
        {
            title: '语料',
            dataIndex: 'text',
            key: 'text'
        },
        {
            title: '匹配结果',
            dataIndex: 'textMark',
            key: 'textMark',
            render: text => {
                return <div dangerouslySetInnerHTML={{ __html: text }} />;
            }
        }
    ];

    const [pagination, setPagination] = useState({
        page: 1,
        total: 1
    });

    const [list, setList] = useState([]);

    const [params, setParams] = useState(DEFAULT_PARAM);

    const { dispatch: fetchTemplateList, isLoading } = useFetch(getSampleData, params, false);

    const getList = useCallback(
        (search: {}) => {
            const tempParams = Object.assign({}, params, { page: 1 }, search);
            setParams(tempParams); // 记录上一次搜索记录

            fetchTemplateList(tempParams).then(res => {
                setList(res.content);
                setPagination({ page: tempParams.page, total: res.totalElements }); // 记录分页器参数
            });
        },
        [fetchTemplateList, params]
    );

    const handleTableChange = (pagination: TablePaginationConfig) => {
        const tempParams = {
            size: pagination.pageSize,
            page: pagination.current
        };
        getList(tempParams);
    };

    useEffect(() => {
        getList({});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="u-table-list">
            <Table
                loading={isLoading}
                rowKey="id"
                dataSource={list}
                columns={columns}
                onChange={handleTableChange}
                tableLayout="fixed"
                pagination={{ current: pagination.page, total: pagination.total, showQuickJumper: true, showSizeChanger: true }}
            />
        </div>
    );
}

export default TableList;
