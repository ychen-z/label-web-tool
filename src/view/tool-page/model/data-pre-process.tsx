import React, { useState } from 'react';
import { Form, Input, Button, Select, Slider, Tabs, message } from 'antd';
import ReactEcharts from 'echarts-for-react';
import useFetch from '@/hooks/common/useFetch';
import Table from '../components/table-list/index';
import WordsCloudEcharts from '../components/word-cloud-echarts';
import WordsCloudEchart from '../components/word-cloud-echart';
import { setClusterAndVector, getPreSample, getScatter } from '@/axios';

const { Option } = Select;
const { TabPane } = Tabs;

/**
 *
 * @returns 数据预处理
 */
export default function DataPreProcess() {
    const [activeKey, setActiveKey] = useState('1');
    const [sliderValue, setSliderValue] = useState(1);
    const { dispatch: dispatchSetClusterAndVector, isLoading: loading } = useFetch(setClusterAndVector, { page: 0, size: Infinity }, false);
    const { dispatch: dispatchGetPreSample } = useFetch(getPreSample, null, false);
    const { data: scatterData, dispatch: dispatchGetScatter } = useFetch(getScatter, null);

    const getScatterData = data => {
        if (!data) return {};
        return {
            title: { text: '散点图' },
            xAxis: {},
            yAxis: {
                type: 'value'
            },
            grid: {
                show: true
            },
            legend: {
                show: true
            },
            tooltip: {
                show: true
            },
            series: [
                {
                    data: data.map(item => (item = item.vector)),
                    type: 'scatter'
                }
            ]
        };
    };
    const onChangeTabs = v => {
        setActiveKey(v);
    };

    /**
     * 聚类并向量化
     */
    const onTranning = () => {
        dispatchSetClusterAndVector({
            dictIds: localStorage.getItem('dictIds')?.split(','),
            textIds: localStorage.getItem('textIds')?.split(','),
            clusterCount: 3,
            vectorScale: 200
        }).then(res => {
            message.success('操作成功');
            dispatchGetScatter(); // 获取散点图
        });
    };

    /**
     * 采样
     */
    const onSample = () => {
        console.log('采样');
        if (sliderValue) {
            dispatchGetPreSample(sliderValue / 100).then(res => {
                localStorage.setItem('labelState', 'pre');
                message.success('采样成功');
            });
        }
    };

    return (
        <div className="m-data-pre-process">
            <Form
                name="basic"
                className="u-form"
                initialValues={{ remember: true }}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 8 }}
                onFinish={onTranning}
            >
                <Form.Item label="向量化方法" name="model" rules={[{ required: true, message: '请输入' }]}>
                    <Select>
                        <Option value="dec2Vec">dec2Vec</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="向量维度" name="vectorScale" rules={[{ required: true, message: '请输入' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="聚类方法" name="method">
                    <Select>
                        <Option value="Kmeans">Kmeans</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="聚类类数" name="clusterCount" rules={[{ required: true, message: '请输入' }]}>
                    <Input />
                </Form.Item>

                <div className="f-200">
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            聚类
                        </Button>
                    </Form.Item>
                </div>
            </Form>

            <section className="u-sample">
                <div className="u-sample-content">
                    <span>采样率：</span>
                    <Slider min={1} max={100} value={sliderValue} onChange={v => setSliderValue(v)} />
                    <span>{sliderValue} %</span>
                </div>
                <Button type="primary" onClick={onSample}>
                    采样
                </Button>
            </section>

            <section className="u-result">
                <Tabs defaultActiveKey={activeKey} onChange={onChangeTabs}>
                    <TabPane tab="数据可视化" key="1" className="u-result-view">
                        <div>
                            <ReactEcharts option={getScatterData(scatterData)} />
                        </div>
                        <div>
                            <WordsCloudEchart clusterId={1} />
                        </div>
                    </TabPane>
                    <TabPane tab="匹配情况" key="2">
                        <Table />
                    </TabPane>
                </Tabs>
            </section>
        </div>
    );
}
