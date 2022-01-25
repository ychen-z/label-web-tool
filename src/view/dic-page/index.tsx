import React, { useState } from 'react';
import { Button } from 'antd';
import useFetch from '@/hooks/common/useFetch';
// import FormSearch from '@/components/form-search';
import { getDicAll } from '@/axios';
import Dictable from './components/table';
import AddModal from './modal/import-modal-add';
import './index.less';

export default function Dictionary(props) {
    // const [form] = Form.useForm();
    const { data, dispatch: getDicTableData } = useFetch(getDicAll, { page: 0, size: Infinity });
    const [selectedKeys, setSelectedKeys] = useState([]);
    // const [searchParams, setSearchParams] = useState<Record<string, any>>({}); // 全部搜索项参数

    // const getTableData = ({ page, size }) => {
    //     const params = {
    //         page,
    //         size,
    //         ...searchParams
    //     };
    //     return getDicAll(params);
    // };

    // const { tableProps, refresh } = useRequest(getTableData, {
    //     defaultParams: { page: 0, size: Infinity },
    //     paginated: true,
    //     formatResult: (response: any) => {
    //         return {
    //             list: response?.content || []
    //         };
    //     },
    //     refreshDeps: [searchParams]
    // });

    // const onSearch = () => {
    //     setSearchParams(form.getFieldsValue());
    // };

    // const onReset = () => {
    //     form.resetFields();
    //     setSearchParams({});
    // };

    return (
        <div className="dic-page">
            {/* <FormSearch mode="common" form={form} onSearch={onSearch} onReset={onReset} {...layOut}>
                <Form.Item label="关键字" name="keyName">
                    <Input />
                </Form.Item>
            </FormSearch> */}
            <section className="m-list">
                <div className="u-operation">
                    <AddModal type="ADD" refresh={getDicTableData}>
                        <Button type="primary">导入</Button>
                    </AddModal>
                </div>
                <Dictable dataSource={data?.content} refresh={getDicTableData} selectedKeys={selectedKeys} setSelectedKeys={setSelectedKeys} />
            </section>
        </div>
    );
}
