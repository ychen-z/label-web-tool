import React from 'react';
import { Form, Input, Modal, message } from 'antd';
import useFetch from '@/hooks/common/useFetch';
import { putDictData, postDictData } from '@/axios';

interface Props {
    data?: Record<string, any>;
    type: 'ADD' | 'EDIT';
    onCancel: Function;
    refresh: Function;
}

const ADDModal = (props: Props) => {
    const [form] = Form.useForm();
    const { data, onCancel, refresh, type } = props;
    const { dispatch: addFunc } = useFetch(postDictData, null, false); // 新增
    const { dispatch: updateFunc } = useFetch(putDictData, null, false); // 更新
    const title = type === 'EDIT' ? '编辑字典数据' : '新增字典数据';

    const onSubmit = (values: any) => {
        form.validateFields().then(values => {
            values.alias = values.alias.split('|');
            values.id
                ? updateFunc(values).then(res => {
                      message.success('操作成功');
                      onCancel && onCancel();
                      refresh && refresh();
                  })
                : addFunc(values).then(res => {
                      message.success('操作成功');
                      onCancel && onCancel();
                      refresh && refresh();
                  });
        });
    };

    return (
        <Modal form={form} title={title} visible onOk={onSubmit} onCancel={onCancel}>
            <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} initialValues={data} scrollToFirstError>
                <Form.Item hidden label="dictId" name="dictId">
                    <Input />
                </Form.Item>

                <Form.Item rules={[{ required: true, message: '请填写' }]} label="全称" name="name">
                    <Input placeholder="全称" maxLength={200} />
                </Form.Item>

                <Form.Item rules={[{ required: true, message: '请填写' }]} label="别名" name="alias">
                    <Input placeholder="请输入别名，不同别名间请以“ | ”分割" maxLength={200} />
                </Form.Item>

                <Form.Item rules={[{ required: true, message: '请填写' }]} label="标签" name="label">
                    <Input placeholder="请输入标签名" maxLength={200} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ADDModal;