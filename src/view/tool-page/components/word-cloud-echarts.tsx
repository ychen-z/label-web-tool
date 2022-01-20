import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as echarts from 'echarts';
import 'echarts-wordcloud';

export default function WordsCloudEcharts() {
    const [classId, setClassId] = useState('0');
    const [wordsCloudData, setWordsCloudData] = useState({});
    const chartRef = useRef<HTMLDivElement>(null);
    const myCharts = useRef(null) as any;

    const createWordCloud = useCallback(() => {
        myCharts.current = echarts.init(chartRef.current);

        // jsonList 用于绘制对应类词云图的数据
        var jsonList: Array<{
            name: string;
            value: number;
        }> = wordsCloudData[classId as string];

        var maskResource = new Image();
        maskResource.src = ''; // TODO
        var option = {
            //设置标题，居中显示
            title: {
                text: '第' + classId + '类的情况',
                left: 'center',
                fill: 'red'
            },
            //数据可以点击
            tooltip: {},
            series: [
                {
                    maskImage: maskResource,
                    //词的类型
                    type: 'wordCloud',
                    //设置字符大小范围
                    shape: 'circle',
                    sizeRange: [18, 36],
                    rotationRange: [-45, 90],
                    width: '100%',
                    height: '100%',
                    textStyle: {
                        //设置随机的字体颜色
                        fontFamily: 'sans-serif',
                        fontWeight: 'bold',
                        color: function() {
                            // Random color
                            return (
                                'rgb(' +
                                [Math.round(Math.random() * 160), Math.round(Math.random() * 160), Math.round(Math.random() * 160)].join(',') +
                                ')'
                            );
                        }
                    },
                    emphasis: {
                        focus: 'self',
                        textStyle: {
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    //不要忘记调用数据
                    data: jsonList
                }
            ]
        };

        //加载图像，将数据放在图像中
        maskResource.onload = function(): void {
            myCharts.setOption(option);
        };
    }, [classId, myCharts, wordsCloudData]);

    useEffect(() => {
        createWordCloud();
        return () => {
            myCharts?.current?.dispose(); //销毁
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createWordCloud]);
    return <div ref={chartRef} />;
}
