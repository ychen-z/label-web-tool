import React from 'react';
import { Form, Input, message } from 'antd';
import BtnTpl from '@/components/btns/btn-tpl';
import useFetch from '@/hooks/common/useFetch';
import { updateDic } from '@/axios';

interface Props {
    data: Record<string, any>;
    refresh: Function;
    children?: React.ReactNode;
}

const Update = (props: Props) => {
    const { data, refresh, children, ...rest } = props;
    const { dispatch } = useFetch(updateDic, null, false); // 更新

    const fetch = (values: any) => {
        return dispatch(values).then(res => {
            message.success('操作成功');
        });
    };

    return (
        <BtnTpl
            {...rest}
            width={600}
            title="更新字典"
            btnText="更新"
            okText="确认"
            fetch={fetch}
            hasForm
            onSuccess={() => {
                refresh();
            }}
            render={(form, onFinish) => (
                <Form form={form} initialValues={data} onFinish={onFinish} labelAlign="left" scrollToFirstError>
                    <Form.Item hidden label="key" name="key">
                        <Input />
                    </Form.Item>

                    <Form.Item rules={[{ required: true, message: '请填写' }]} label="字典名称" name="dictionaryName">
                        <Input placeholder="字典名称" maxLength={200} />
                    </Form.Item>

                    <Form.Item rules={[{ required: true, message: '请填写' }]} label="字典描述" name="dictionaryDescribe">
                        <Input placeholder="字典描述" maxLength={200} />
                    </Form.Item>
                </Form>
            )}
        >
            {children}
        </BtnTpl>
    );
};

export default Update;
