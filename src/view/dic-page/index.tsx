import React, { useState } from 'react';
import { Table, Space, Divider, Form, Input, Button } from 'antd';
import { useRequest } from 'ahooks';
import FormSearch from '@/components/form-search';
import IconSet from '@/components/icon';
import { getDicAll } from '@/axios';
import Export from './modal/export';
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

    const getTableData = ({ page, size }) => {
        const params = {
            page,
            size,
            ...searchParams
        };
        return getDicAll(params);
    };
    const { tableProps, refresh } = useRequest(getTableData, {
        defaultParams: { page: 0, size: Infinity },
        paginated: true,
        formatResult: (response: any) => {
            return {
                list: response?.content || []
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
                        <ImportModal data={row} type="EDIT" refresh={getTableData}>
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
        <div className="dic-page">
            <FormSearch mode="common" form={form} onSearch={onSearch} onReset={onReset} {...layOut}>
                <Form.Item label="关键字" name="keyName">
                    <Input />
                </Form.Item>
            </FormSearch>
            <section className="m-list">
                <div className="u-operation">
                    <ImportModal type="ADD" refresh={getTableData}>
                        <Button type="primary">导入</Button>
                    </ImportModal>
                </div>
                <Table {...tableProps} refresh={refresh} columns={columns} pagination={null} />
            </section>
        </div>
    );
}
