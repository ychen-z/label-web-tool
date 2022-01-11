import React, { useState } from 'react';
import { Table, Space, Divider, Form, Input, Button } from 'antd';
import { useRequest } from 'ahooks';
import FormSearch from '@/components/form-search';
import IconSet from '@/components/icon';
import { getDicAll } from '@/axios';
import Export from './modal/export';
import UpdateModal from './modal/update-modal';
import ImportModal from './modal/import-modal';
import View from './view/index';
import './index.less';

const layOut = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};

export default function Dictionary() {
    const [form] = Form.useForm();
    const [searchParams, setSearchParams] = useState<Record<string, any>>({}); // 全部搜索项参数

    const getTableData = ({ current, pageSize }) => {
        const params = {
            currentPage: current,
            pageSize,
            ...searchParams
        };
        return getDicAll(params);
    };
    const { tableProps, refresh } = useRequest(getTableData, {
        paginated: true,
        defaultPageSize: 10,
        formatResult: (response: any) => {
            return {
                list: response?.dictionaries || [],
                total: 100
            };
        },
        refreshDeps: [searchParams]
    });

    const onSearch = () => {
        setSearchParams(form.getFieldsValue());
    };

    const onReset = () => {
        form.resetFields();
        setSearchParams({});
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
            title: '包含词量',
            dataIndex: 'wordsNum',
            key: 'words',
            width: 140
        },
        {
            title: '字典容量',
            dataIndex: 'dictsContent',
            key: 'dicts',
            width: 140
        },
        {
            title: '操作',
            width: 140,
            render: (elem: any, row: any, index: number) => {
                return (
                    <Space size="10">
                        <UpdateModal data={row}>
                            <a>
                                <IconSet type="icon-gengxin" /> 更新
                            </a>
                        </UpdateModal>
                        <Divider type="vertical" />
                        <Export data={row} />
                    </Space>
                );
            }
        }
    ];

    return (
        <div className="dic-page">
            <FormSearch mode="common" form={form} onSearch={onSearch} onReset={onReset} {...layOut}>
                <Form.Item label="字典名称" name="dictionaryName" normalize={value => value?.userId}>
                    <Input />
                </Form.Item>
                <Form.Item label="字典描述" name="dictionaryDescribe" normalize={value => value?.userId}>
                    <Input />
                </Form.Item>
            </FormSearch>
            <section className="m-list">
                <div className="u-operation">
                    <ImportModal>
                        <Button type="primary">导入</Button>
                    </ImportModal>
                </div>
                <Table
                    {...tableProps}
                    refresh={refresh}
                    columns={columns}
                    pagination={{ ...tableProps.pagination, pageSizeOptions: ['20', '30', '50'] }}
                />
            </section>
        </div>
    );
}
