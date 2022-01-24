import React, { useState } from 'react';
import { Form, Input, Button, Select, InputNumber, Slider, Tabs } from 'antd';

const { Option } = Select;
const { TabPane } = Tabs;
/**
 *
 * @returns 数据预处理
 */
export default function DataPreProcess() {
    const [activeKey, setActiveKey] = useState('1');
    const [sliderValue, setSliderValue] = useState(1);

    const onChangeTabs = v => {
        setActiveKey(v);
    };

    const onTranning = () => {
        console.log('训练');
    };

    const onSample = () => {
        console.log('采样');
    };

    const onChangeSlider = v => {
        setSliderValue(v);
    };
    const onFinish = values => {
        console.log('训练');
    };
    return (
        <div>
            <div>
                <Form name="basic" initialValues={{ remember: true }} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={onTranning}>
                    <div className="">
                        <Form.Item label="向量化方法" name="model" rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Select style={{ width: 120 }}>
                                <Option value="dec2Vec">dec2Vec</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label="向量维度" name="time" rules={[{ required: true, message: '请输入' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item label="聚类方法" name="time" rules={[{ required: true, message: '请输入' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item label="聚类类数" name="time" rules={[{ required: true, message: '请输入' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                聚类
                            </Button>
                        </Form.Item>
                    </div>

                    <div>采用方法</div>

                    <div>
                        <Form.Item label="迭代次数" name="time" rules={[{ required: true, message: '请输入' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="迭代次数" name="sliderValue" rules={[{ required: true, message: '请输入' }]}>
                            <Slider min={1} max={100} />
                        </Form.Item>

                        <Form.Item name="sliderValue">
                            <InputNumber min={1} max={20} style={{ margin: '0 16px' }} value={sliderValue} onChange={onChangeSlider} addonAfter="%" />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" onClick={onSample}>
                                采样
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
            <div>
                <Tabs defaultActiveKey={activeKey} onChange={onChangeTabs}>
                    <TabPane tab="数据可视化" key="1">
                        数据可视化
                    </TabPane>
                    <TabPane tab="数据结果" key="2">
                        数据结果
                    </TabPane>
                    <TabPane tab="字典匹配" key="3">
                        字典匹配
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
}
