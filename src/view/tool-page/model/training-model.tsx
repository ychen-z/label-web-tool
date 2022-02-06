import React from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import ReactEcharts from 'echarts-for-react';
import useFetch from '@/hooks/common/useFetch';
import { postTrainModel, getCurrentRate, getHistoryRates } from '@/axios';

const { Option } = Select;
/**
 *
 * @returns 模型训练
 */
export default function TrainingModel() {
    const { dispatch: dispatchPostTrainModel, isLoading } = useFetch(postTrainModel, { page: 0, size: Infinity }, false);
    const { data: currentRateData } = useFetch(getCurrentRate, null);
    const { data: historyRateData } = useFetch(getHistoryRates, null);

    const onFinish = values => {
        console.log('训练');
        var dictIds = localStorage
            .getItem('dictIds')
            ?.split(',')
            .map(item => (item = Number(item)));
        var textIds = localStorage
            .getItem('textIds')
            ?.split(',')
            .map(item => (item = Number(item)));

        dispatchPostTrainModel({ ...values, textIds, dictIds }).then(res => {
            message.success('训练成功');
        });
    };

    const getCurrentRateOption = data => {
        if (!data) return {};
        return {
            title: { text: '当前训练准备率' },
            xAxis: {
                type: 'category'
                // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
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
                    data,
                    type: 'line'
                }
            ]
        };
    };

    const getHistoryRateOption = data => {
        if (!data) return {};
        return {
            title: { text: '历史训练准备率' },
            xAxis: {
                type: 'category'
                // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
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
                    data: data.map(item => (item = item.rate)),
                    type: 'line'
                }
            ]
        };
    };

    return (
        <div className="m-training-model">
            <section>
                <Form name="basic" initialValues={{ remember: true }} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={onFinish}>
                    <div className="">
                        <Form.Item label="模型" name="model" rules={[{ required: true, message: '请输入' }]}>
                            <Select style={{ width: 120 }}>
                                <Option value="BiLSTM">BiLSTM</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="训练数量" name="clusterCount">
                            <Input />
                        </Form.Item>

                        <Form.Item label="输入维度" name="vectorScale">
                            <Input />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" loading={isLoading}>
                                训练
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </section>

            <section className="u-view">
                <div className="u-view-left">
                    <ReactEcharts option={getCurrentRateOption(currentRateData)} />
                    <div>迭代次数</div>
                </div>
                <div className="u-view-right">
                    <ReactEcharts option={getHistoryRateOption(historyRateData)} />
                    <div>训练序号</div>
                </div>
            </section>
        </div>
    );
}
