import React, { useState } from 'react';
import { Form, Input, Button, Select, Slider, Tabs, message } from 'antd';
import useFetch from '@/hooks/common/useFetch';
import Table from '../components/table-list/index';
import { setClusterAndVector, getPreSample } from '@/axios';

const { Option } = Select;
const { TabPane } = Tabs;

/**
 *
 * @returns 数据预处理
 */
export default function DataPreProcess() {
    const [activeKey, setActiveKey] = useState('1');
    const [sliderValue, setSliderValue] = useState(1);
    const { dispatch: dispatchSetClusterAndVector } = useFetch(setClusterAndVector, { page: 0, size: Infinity }, false);
    const { dispatch: dispatchGetPreSample } = useFetch(getPreSample, null, false);

    const onChangeTabs = v => {
        setActiveKey(v);
    };

    /**
     * 训练
     */
    const onTranning = () => {
        dispatchSetClusterAndVector({
            dictIds: localStorage.getItem('dictIds')?.split(','),
            textIds: localStorage.getItem('textIds')?.split(','),
            clusterCount: 3,
            vectorScale: 200
        }).then(res => {
            console.log(res);
        });
    };

    /**
     * 采样
     */
    const onSample = () => {
        console.log('采样');
        if (sliderValue) {
            dispatchGetPreSample(sliderValue / 100).then(res => {
                console.log(res);
                message.success('采样成功');
            });
        }
    };

    return (
        <div className="u-data-pre-process">
            <Form
                name="basic"
                className="u-vector"
                initialValues={{ remember: true }}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onTranning}
            >
                <div>
                    <Form.Item label="向量化方法" name="model" rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Select style={{ width: 120 }}>
                            <Option value="dec2Vec">dec2Vec</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="向量维度" name="vectorScale" rules={[{ required: true, message: '请输入' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="聚类方法" name="method">
                        <Select style={{ width: 120 }}>
                            <Option value="Kmeans">Kmeans</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="聚类类数" name="clusterCount" rules={[{ required: true, message: '请输入' }]}>
                        <Input />
                    </Form.Item>
                </div>
                <div className="f-200">
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            聚类
                        </Button>
                    </Form.Item>
                </div>
            </Form>

            <div className="u-sample">
                <div className="u-sample-content">
                    <span>采样率：</span>
                    <Slider min={1} max={100} value={sliderValue} onChange={v => setSliderValue(v)} />
                    <span>{sliderValue} %</span>
                </div>
                <Button type="primary" onClick={onSample}>
                    采样
                </Button>
            </div>

            <div className="u-result">
                <Tabs defaultActiveKey={activeKey} onChange={onChangeTabs}>
                    <TabPane tab="数据可视化" key="1">
                        数据可视化
                    </TabPane>
                    <TabPane tab="匹配情况" key="2">
                        <Table />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
}
