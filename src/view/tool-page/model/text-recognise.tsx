import React, { useState } from 'react';
import { Form, Button, Select, message } from 'antd';
import useFetch from '@/hooks/common/useFetch';
import Table from '../components/table-list/index';
import { postModelMark } from '@/axios';

const { Option } = Select;
/**
 *
 * @returns 语料识别
 */
export default function TextRecognition() {
    // const [form] = Form.useForm();
    const [update, setUpdate] = useState(0);
    const { dispatch, isLoading } = useFetch(postModelMark, null, false);

    const onFinish = values => {
        console.log('采样:', values);
        dispatch({ ...values, dictIds: localStorage.getItem('dictIds')?.split(','), textIds: localStorage.getItem('textIds')?.split(',') }).then(
            res => {
                localStorage.setItem('labelState', 'model');
                setUpdate(update + 1);
                message.success('操作成功');
            }
        );
    };

    return (
        <div className="m-text-recognition">
            <section>
                <Form
                    name="basic"
                    className="u-form"
                    layout="inline"
                    initialValues={{ remember: true }}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onFinish}
                >
                    <Form.Item label="模型" name="model" rules={[{ required: true, message: '请输入' }]}>
                        <Select style={{ width: 120 }}>
                            <Option value="BiLSTM">BiLSTM</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button loading={isLoading} type="primary" htmlType="submit">
                            识别
                        </Button>
                    </Form.Item>
                </Form>
            </section>
            <section className="u-content">
                <Table type="pre" shouldUpdate={update} />
            </section>
        </div>
    );
}
