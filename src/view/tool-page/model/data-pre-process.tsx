import React, { useState, useContext } from 'react';
import { Form, Input, Button, Select, Slider, Tabs, message, notification } from 'antd';
import { ScatterContext, GlobalContext } from '@/context';
import useFetch from '@/hooks/common/useFetch';
import Table from '../components/table-list/index';
import WordsCloudEchart from '../components/word-cloud-echart';
import ScatterEchart from '../components/scatter-echart';
import { setClusterAndVector, getPreSample, getScatter } from '@/axios';

const { Option } = Select;
const { TabPane } = Tabs;

/**
 *
 * @returns 数据预处理
 */
export default function DataPreProcess() {
    const { refreshState } = useContext(GlobalContext);
    const [activeKey, setActiveKey] = useState('1');
    const [sliderValue, setSliderValue] = useState(1);
    const [clusterId, setClusterId] = useState(0);
    const { dispatch: dispatchSetClusterAndVector, isLoading: loading } = useFetch(setClusterAndVector, { page: 0, size: Infinity }, false);
    const { dispatch: dispatchGetPreSample } = useFetch(getPreSample, null, false);
    const { data: scatterData, dispatch: dispatchGetScatter } = useFetch(getScatter, null);

    const onChangeTabs = v => {
        setActiveKey(v);
    };

    /**
     * 聚类并向量化
     */
    const onTranning = values => {
        dispatchSetClusterAndVector({
            ...values,
            dictIds: localStorage.getItem('dictIds')?.split(','),
            textIds: localStorage.getItem('textIds')?.split(',')
        }).then(res => {
            notification.success({
                message: '操作成功',
                description: '去执行采样吧'
            });
            refreshState();
            dispatchGetScatter(); // 获取散点图
        });
    };

    /**
     * 采样
     */
    const onSample = () => {
        if (sliderValue) {
            dispatchGetPreSample(sliderValue / 100).then(res => {
                localStorage.setItem('labelState', 'pre');
                refreshState();
                message.success('采样成功');
            });
        }
    };

    const updateCluster = id => {
        setClusterId(id);
    };

    return (
        <div className="m-data-pre-process">
            <Form
                name="basic"
                className="u-form"
                initialValues={{ model: 'dec2Vec', method: 'Kmeans' }}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
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

                <div className="f-0">
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
                            <ScatterContext.Provider value={{ updateCluster }}>
                                <ScatterEchart data={scatterData} />
                                <WordsCloudEchart clusterId={clusterId} />
                            </ScatterContext.Provider>
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
