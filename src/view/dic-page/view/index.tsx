import React, { useState, useEffect, useCallback } from 'react';
import { Button } from 'antd';
import { getDicByKey } from '@/axios';
import UDrawer from '@/components/common/u-drawer';
import useFetch from '@/hooks/common/useFetch';
import { PaginationProps, PaginationPageProps } from '@/interface';
import TemplateTable from './module/table-list';
import ModalAdd from './module/modal-add';
import { TemplateSearchParams } from './interface';
import './index.less';

function Template(props) {
    const DEFAULT_PARAM = {
        currentPage: 1,
        pageSize: 10
    };

    const [selectedKeys, setSelectedKeys] = useState<number[]>([]);

    const [pagination, setPagination] = useState<PaginationProps>({
        currentPage: 1,
        total: 1
    });

    const [templateList, setTemplateList] = useState<TemplateItem[]>([{ key: '0', label: 'EQU', name: '机组', abbreviations: ['组', '机组体'] }]);
    const [params, setParams] = useState<Partial<TemplateSearchParams>>(DEFAULT_PARAM);

    const { dispatch: fetchTemplateList, isLoading } = useFetch<PaginationPageProps<TemplateItem>>(getDicByKey, params, false);

    const getList = useCallback(
        (search: Partial<TemplateSearchParams> = {}) => {
            const tempParams = Object.assign({}, params, { currentPage: 1 }, search);
            setParams(tempParams); // 记录上一次搜索记录

            fetchTemplateList(tempParams).then(res => {
                setSelectedKeys([]); // 清空所选列
                setTemplateList(res.list);
                setPagination({ currentPage: tempParams.currentPage, total: res.total }); // 记录分页器参数
            });
        },
        [fetchTemplateList, params]
    );

    useEffect(() => {
        getList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <UDrawer
                trigger={<a>查看</a>}
                maskClosable={false}
                title="查看"
                className="m-template"
                width={document.body.clientWidth * 0.8}
                mask
                maskStyle={{
                    width: '100%'
                }}
            >
                <div className="u-table">
                    <div className="u-opera-row">
                        <ModalAdd callback={getList}>
                            <Button type="primary">+ 增加字典</Button>
                        </ModalAdd>
                    </div>

                    <TemplateTable
                        loading={isLoading}
                        list={templateList}
                        setSelectedKeys={setSelectedKeys}
                        selectedKeys={selectedKeys}
                        getList={getList}
                        pagination={pagination}
                    />
                </div>
            </UDrawer>
        </div>
    );
}

export default Template;
