import React, { useState, useEffect, useCallback } from 'react';
import { Button } from 'antd';
import { getDicByKey } from '@/axios';
import UDrawer from '@/components/common/u-drawer';
import useFetch from '@/hooks/common/useFetch';
import { PaginationProps } from '@/interface';
import TemplateTable from './module/table-list';
import ModalAdd from './module/modal-add';
import { TemplateSearchParams } from './interface';
import './index.less';

function Template(props) {
    const { dictionaryName, id } = props;

    const DEFAULT_PARAM = {
        page: 1,
        size: 10
    };

    const [selectedKeys, setSelectedKeys] = useState<number[]>([]);

    const [pagination, setPagination] = useState<PaginationProps>({
        page: 1,
        total: 1
    });

    const [templateList, setTemplateList] = useState();
    const [params, setParams] = useState<Partial<TemplateSearchParams>>(DEFAULT_PARAM);

    const { dispatch: fetchTemplateList, isLoading } = useFetch(getDicByKey, params, false);

    const getList = useCallback(
        (search: Partial<TemplateSearchParams> = {}) => {
            const tempParams = Object.assign({}, params, { page: 1 }, search);
            setParams(tempParams); // 记录上一次搜索记录

            fetchTemplateList(tempParams).then(res => {
                setSelectedKeys([]); // 清空所选列
                setTemplateList(res.list);
                setPagination({ page: tempParams.page, total: res.total }); // 记录分页器参数
            });
        },
        [fetchTemplateList, params]
    );

    useEffect(() => {
        getList({ id });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <UDrawer
                trigger={<a>{dictionaryName}</a>}
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
