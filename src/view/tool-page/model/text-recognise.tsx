import React from 'react';
import { Form, Button, Select } from 'antd';

const { Option } = Select;
/**
 *
 * @returns 语料识别
 */
export default function TextRecognition() {
    const [form] = Form.useForm();
    const onFinish = values => {
        console.log('采样:', values);
    };

    const onReText = () => {
        console.log('识别', form.getFieldsValue());
    };

    return (
        <div className="u-text-recognition">
            <div>
                <Form name="basic" initialValues={{ remember: true }} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={onFinish}>
                    <div className="">
                        <Form.Item label="模型" name="model" rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Select style={{ width: 120 }}>
                                <Option value="BiLSTM">BiLSTM</Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            采样
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={onReText}>
                            采样
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div>语料识别列表</div>
        </div>
    );
}
