import React from 'react';
import ReactEcharts from 'echarts-for-react';

// 训练图
export default function CategoryChart(props) {
    const { historyRate, currentRate, k = 1 } = props;

    const getOption = () => {
        let xSeries = [];
        let min_data = 85;
        if (k === 1) {
            for (let i = 0; i < currentRate.length; i++) {
                min_data = currentRate[i] < min_data ? currentRate[i] - 5 : min_data;
                xSeries.push(i + 1);
            }
        } else if (k === 2) {
            for (let i = 0; i < historyRate.length; i++) {
                min_data = historyRate[i] < min_data ? historyRate[i] - 5 : min_data;
                xSeries.push(i + 1);
            }
        }

        const option: any = {
            title: {
                text: '准确率',
                textStyle: {
                    fontSize: 15
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['按照顺序取', '随机取', '分类后随机取'],
                selected: { 原模型: true, 改进的模型: true }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                name: k === 2 ? '训练序号' : '迭代次数',
                nameLocation: 'center',
                nameGap: 22,
                data: xSeries
            },
            yAxis: {
                type: 'value',
                name: '准确率/%',
                min: min_data,
                max: 100,
                splitNumber: 15,
                axisLine: {
                    show: true
                }
            },
            series: [
                {
                    name: k === 1 ? '自迭代曲线' : '历史曲线',
                    data: k === 1 ? currentRate : historyRate,
                    type: 'line',
                    stack: 'Total',
                    smooth: 0.5
                }
            ]
        };
        return option;
    };
    return (
        <div>
            <ReactEcharts option={getOption} theme="" notMerge lazyUpdate style={{ height: '100%', width: '49%', float: 'left' }} />
        </div>
    );
}
