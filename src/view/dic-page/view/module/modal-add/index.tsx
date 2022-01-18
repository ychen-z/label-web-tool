import React from 'react';
import { Form, Input, message } from 'antd';
import BtnTpl from '@/components/btns/btn-tpl';
import useFetch from '@/hooks/common/useFetch';
import { postDic } from '@/axios';

interface Props {
    data: Record<string, any>;
    refresh: Function;
    isEdit?: boolean;
    // eslint-disable-next-line react/require-default-props
    callback?: Function;
    children?: React.ReactNode;
}

const Add = (props: Props) => {
    const { data, refresh, isEdit = false, children, ...rest } = props;
    const { dispatch } = useFetch(postDic, null, false); // 更新

    const fetch = (values: any) => {
        return dispatch(values).then(res => {
            message.success('操作成功');
        });
    };
    const title = isEdit ? '编辑字典' : '新增字典';

    return (
        <BtnTpl
            {...rest}
            width={600}
            title={title}
            okText="确认"
            fetch={fetch}
            hasForm
            onSuccess={() => {
                refresh();
            }}
            render={(form, onFinish) => (
                <Form
                    form={form}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={data}
                    onFinish={onFinish}
                    labelAlign="left"
                    scrollToFirstError
                >
                    <Form.Item hidden label="key" name="key">
                        <Input />
                    </Form.Item>

                    <Form.Item rules={[{ required: true, message: '请填写' }]} label="全称" name="name">
                        <Input placeholder="全称" maxLength={200} />
                    </Form.Item>

                    <Form.Item rules={[{ required: true, message: '请填写' }]} label="别名" name="abbreviations">
                        <Input placeholder="请输入别名，不同别名间请以“ ， ”分割" maxLength={200} />
                    </Form.Item>

                    <Form.Item rules={[{ required: true, message: '请填写' }]} label="标签" name="label">
                        <Input placeholder="请输入标签名" maxLength={200} />
                    </Form.Item>
                </Form>
            )}
        >
            {children}
        </BtnTpl>
    );
};

export default Add;
