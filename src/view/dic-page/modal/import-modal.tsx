import React from 'react';
import { Form, Input } from 'antd';
import BtnTpl from '@/components/btns/btn-tpl';
import Upload from './SelfUpload';
import useFetch from '@/hooks/common/useFetch';
import { postDic, updateDic } from '@/axios';

interface Props {
    id?: number | string;
    data?: Record<string, any>;
    type: 'ADD' | 'EDIT';
    refresh: Function;
    children?: React.ReactNode;
}

// TODO: 待删除
const UpdateModal = (props: Props) => {
    // const [form] = Form.useForm();
    const { data, refresh, type, id, children, ...rest } = props;
    const { dispatch: updateFunc } = useFetch(updateDic, null, false); // 更新
    const { dispatch: addFunc } = useFetch(postDic, null, false); // 新增
    const title = type === 'EDIT' ? '编辑字典' : '新增字典';

    const fetch = (values: any) => {
        return values.id ? updateFunc(values) : addFunc(values);
    };

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
                <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} initialValues={data} onFinish={onFinish} scrollToFirstError>
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
            )}
        >
            {children}
        </BtnTpl>
    );
};

export default UpdateModal;
