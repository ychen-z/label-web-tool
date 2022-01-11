import React from 'react';
import { Form, Input, message, Button } from 'antd';
import BtnTpl from '@/components/btns/btn-tpl';
import Upload from './SelfUpload';
import useFetch from '@/hooks/common/useFetch';
import { updateDic } from '@/axios';

// TODO: 文件的处理逻辑需要待定
interface Props {
    data: Record<string, any>;
    refresh: Function;
    children?: React.ReactNode;
}

const Update = (props: Props) => {
    const [form] = Form.useForm();
    const { data, refresh, children, ...rest } = props;
    const { dispatch } = useFetch(updateDic, null, false); // 更新

    const fetch = (values: any) => {
        return dispatch(values).then(res => {
            message.success('操作成功');
        });
    };

    const dispatchValidateFields = () => {
        return form.validateFields().then(values => {
            console.log(values); // 格式校验
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

                    <Form.Item rules={[{ required: true, message: '请上传文件' }]} label="文件" name="file">
                        <Upload maxCount="1" accept="xls,xlsx,.7z" />
                        <Button onClick={dispatchValidateFields} style={{ marginRight: '12px' }}>
                            文件校验
                        </Button>
                    </Form.Item>
                </Form>
            )}
        >
            {children}
        </BtnTpl>
    );
};

export default Update;
