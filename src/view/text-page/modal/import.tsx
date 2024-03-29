import React from 'react';
import { Form, Input, Modal, message } from 'antd';
import Upload from '@/components/upload/SelfUpload';
import useFetch from '@/hooks/common/useFetch';
import { postText, updateText } from '@/axios';

interface Props {
    data?: Record<string, any>;
    type: 'ADD' | 'EDIT';
    textType: 0 | 1;
    subTitle?: string;
    onCancel: Function;
    refresh: Function;
}

const ADDModal = (props: Props) => {
    const [form] = Form.useForm();
    const { data, onCancel, refresh, type, textType, subTitle } = props;
    const { dispatch: updateFunc } = useFetch(updateText, null, false); // 更新
    const { dispatch: addFunc } = useFetch(postText, null, false); // 新增
    const title = (type === 'EDIT' ? '编辑' : '新增') + subTitle;

    const fetch = (values: any) => {
        form.validateFields().then(values => {
            values.filePath = values.filePath?.length ? values.filePath[0].response.data : undefined;
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
        <Modal title={title} visible onOk={fetch} onCancel={onCancel}>
            <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} initialValues={{ ...data, textType }} scrollToFirstError>
                <Form.Item hidden label="id" name="id">
                    <Input disabled />
                </Form.Item>

                <Form.Item label="textType" name="textType">
                    <Input disabled />
                </Form.Item>

                <Form.Item rules={[{ required: true, message: '请填写' }]} label="语料名称" name="textsName">
                    <Input placeholder="请输入" maxLength={200} />
                </Form.Item>

                <Form.Item rules={[{ required: true, message: '请填写' }]} label="语料描述" name="textsDescribe">
                    <Input.TextArea placeholder="请输入" maxLength={2000} />
                </Form.Item>

                <Form.Item label="文件" name="filePath" valuePropName="fileList">
                    <Upload maxCount="1" accept="xls,xlsx,txt,pdf" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ADDModal;
