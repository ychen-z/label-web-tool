import React from 'react';
import { Form, Input, Modal, message } from 'antd';
import Upload from '@/components/upload/SelfUpload';
import useFetch from '@/hooks/common/useFetch';
import { postDic, updateDic } from '@/axios';

interface Props {
    data?: Record<string, any>;
    type: 'ADD' | 'EDIT';
    onCancel: Function;
    refresh: Function;
}

const ADDModal = (props: Props) => {
    const [form] = Form.useForm();
    const { data, onCancel, refresh, type } = props;
    const { dispatch: updateFunc } = useFetch(updateDic, null, false); // 更新
    const { dispatch: addFunc } = useFetch(postDic, null, false); // 新增
    const title = type === 'EDIT' ? '编辑字典' : '新增字典';

    const fetch = (values: any) => {
        form.validateFields().then(values => {
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
            <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} initialValues={data} scrollToFirstError>
                <Form.Item hidden label="id" name="id">
                    <Input disabled />
                </Form.Item>

                <Form.Item rules={[{ required: true, message: '请填写' }]} label="字典名称" name="dictionaryName">
                    <Input placeholder="请输入" maxLength={200} />
                </Form.Item>

                <Form.Item rules={[{ required: true, message: '请填写' }]} label="字典描述" name="dictionaryDescribe">
                    <Input placeholder="请输入" maxLength={200} />
                </Form.Item>

                <Form.Item label="标签颜色" name="color">
                    <Input placeholder="请输入" maxLength={200} />
                </Form.Item>

                <Form.Item label="标签快捷键" name="keyName">
                    <Input placeholder="请输入" maxLength={200} />
                </Form.Item>

                <Form.Item label="keyCode" name="keyCode">
                    <Input placeholder="请输入" maxLength={200} />
                </Form.Item>

                <Form.Item label="文件" name="filePath" valuePropName="fileList">
                    <Upload maxCount="1" accept="xls,xlsx,txt" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ADDModal;
