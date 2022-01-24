import React from 'react';
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;
/**
 *
 * @returns 模型训练
 */
export default function TrainingModel() {
    const onFinish = values => {
        console.log('训练');
    };

    return (
        <div>
            <div>
                <Form name="basic" initialValues={{ remember: true }} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={onFinish}>
                    <div className="">
                        <Form.Item label="模型" name="model" rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Select style={{ width: 120 }}>
                                <Option value="BiLSTM">BiLSTM</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                训练
                            </Button>
                        </Form.Item>
                    </div>
                    <div>模型参数</div>
                    <div>
                        <Form.Item label="迭代次数" name="time" rules={[{ required: true, message: '请输入' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="权重保持路径" name="time">
                            <Input />
                        </Form.Item>
                    </div>
                </Form>
            </div>
            <div>
                <section>迭代次数图形</section>
                <section>训练图形</section>
            </div>
        </div>
    );
}
