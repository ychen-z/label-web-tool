import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';

import { getTripleTreeData, getTripleSearchData } from '@/axios';

const config = {
  CAUSE: '原因',
  EQUIPMENT: '设备',
  PHENOMENON: '现象',
  PROCESSING_METHODS: '处理方法',
  FAULT: '错误'
};

export default function Graph(props) {
  const { refresh, keyword, type = 'TREE', callback } = props;
  const [data, setData] = useState(null);
  const echartsRef = useRef(null);
  const getOption = graph => {
    graph.categories = graph.categories.map(function(a) {
      a.name = config[a.name];
      return a;
    });

    debugger;
    const categories = graph.categories.map(function(a) {
      return a.name;
    });

    return {
      title: {
        text: ''
        // top: 'bottom',
        // left: 'right'
      },
      tooltip: {
        //内边距
        padding: [5, 10, 5, 10],
        //params 传入进来的每个类目数据及echarts属性，ticket异步的类目名称，callback回调函数
        formatter(params, ticket, callback) {
          //自定义模板
          let html = `<div style="max-width: 600px; word" ><div>${params.seriesName}</div><span style="margin-right:10%; width: 100%; white-space: pre-wrap;">${params.name}</span></div>`;
          return html;
        }
      },
      legend: [
        {
          // selectedMode: 'single',
          data: categories
        }
      ],
      animationDuration: 1500,

      series: [
        {
          name: '',
          type: 'graph',
          layout: 'force',
          legendHoverLink: true, //是否启用图例 hover(悬停) 时的联动高亮。
          hoverAnimation: true, //是否开启鼠标悬停节点的显示动画
          data: graph.nodes.map((item, index) => {
            return {
              ...item,
              id: item.id + '',
              category: categories.findIndex(_ => _ == config[item.entityType])
            };
          }),
          links: graph.links,
          categories: graph.categories,
          roam: true,
          label: {
            position: 'right',
            formatter: '{b}'
          },
          lineStyle: {
            //==========关系边的公用线条样式。
            normal: {
              color: 'rgba(255,0,255,0.4)',
              width: '1',
              type: 'solid', //线的类型 'solid'（实线）'dashed'（虚线）'dotted'（点线）
              curveness: 0.3, //线条的曲线程度，从0到1
              opacity: 1
              // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。默认0.5
            },
            emphasis: {
              //高亮状态
            }
          },
          // label: {
          //   //=============图形上的文本标签
          //   normal: {
          //     show: true, //是否显示标签。
          //     position: 'inside', //标签的位置。['50%', '50%'] [x,y]
          //     textStyle: {
          //       //标签的字体样式
          //       color: '#cde6c7', //字体颜色
          //       fontStyle: 'normal', //文字字体的风格 'normal'标准 'italic'斜体 'oblique' 倾斜
          //       fontWeight: 'bolder', //'normal'标准'bold'粗的'bolder'更粗的'lighter'更细的或100 | 200 | 300 | 400...
          //       fontFamily: 'sans-serif', //文字的字体系列
          //       fontSize: 12 //字体大小
          //     }
          //   },
          //   emphasis: {
          //     //高亮状态
          //   }
          // },
          edgeLabel: {
            //==============线条的边缘标签
            normal: {
              show: false
            },
            emphasis: {
              //高亮状态
            }
          }
          // lineStyle: {
          //   color: 'source',
          //   curveness: 0.3
          // },
          // emphasis: {
          //   focus: 'adjacency',
          //   lineStyle: {
          //     width: 10
          //   }
          // }
        }
      ]
    };
  };

  useEffect(() => {
    if (data) {
      var myChart = echarts.init(echartsRef.current);
      var option = getOption(data);
      myChart.setOption(option);
    }
  }, [data]);

  useEffect(() => {
    if (type === 'TREE') {
      getTripleTreeData({ keyword }).then((res: any) => {
        // res.nodes.shift();
        setData(res);
      });
    } else {
      getTripleSearchData({ keyword }).then((res: any) => {
        setData(res.tree);
        callback?.(res.searchRes);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, keyword]);

  return (
    <div
      ref={echartsRef}
      style={{
        flex: 1,
        padding: 12,
        border: '1px solid #f1f1f',
        height: `calc(100vh - 100px)`
      }}
    />
  );
}
