import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as echarts from 'echarts';

import { getTripleTreeData, getTripleSearchData, equipmentAdd } from '@/axios';

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
  const echartsRef = useRef<HTMLDivElement>(null);
  const myChartRef = useRef() as any;
  const getOption = graph => {
    graph.categories = graph.categories.map(function(a) {
      a.name = config[a.name];
      return a;
    });

    const categories = graph.categories.map(function(a) {
      return a.name;
    });

    return {
      title: {
        text: ''
      },
      focusNodeAdjacency: true,
      tooltip: {
        //内边距
        enterable: true,
        padding: [20, 16, 20, 16],
        //params 传入进来的每个类目数据及echarts属性，ticket异步的类目名称，callback回调函数
        formatter(params, ticket, callback) {
          //自定义模板
          let html = `<div style="min-width: 200px; max-width: 500px; max-height: 300px; overflow-y:scroll; " ><span style="margin-right:10%; width: 100%; white-space: pre-wrap; ">${params.value ||
            params.name}</span></div>`;
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
          links: graph.links.map(item => {
            item.value = item.targetName + '>' + item.sourceName;
            item.lineStyle = {
              opacity: 0.4,
              color: 'red',
              curveness: 0.3
            };
            return item;
          }),
          categories: graph.categories,
          roam: true,
          label: {
            position: 'right',
            formatter: '{b}'
          },
          // lineStyle: {
          //   color: '#ccc',
          //   curveness: 0.3
          // },
          emphasis: {
            focus: 'adjacency',
            lineStyle: {
              color: 'red',
              width: 10
            }
          }
        }
      ]
    };
  };

  // const findDataIndex = useCallback(
  //   (datasource, id) => {
  //     // 获取当前id
  //     const { links, data } = datasource;
  //     const link = links.find(item => item.target == id);
  //     if (link && id != '9647358616260') {
  //       console.log('-------');
  //       console.log(id, link);
  //       const index = data.findIndex(item => item.id == id);
  //       console.log(index);
  //       debugger;
  //       myChartRef.current.dispatchAction({
  //         type: 'highlight',
  //         seriesIndex: [0],
  //         dataIndex: [index]
  //       });
  //       // 继续找到父节点id
  //       findDataIndex(datasource, link.source);
  //     }
  //   },
  //   [myChartRef]
  // );

  // 需要高亮的节点数组
  const findDataIndex = (links, id) => {
    let dataIndex = [];

    const findIndex = id => {
      let temp = links.find(item => item.source == id); // 找到当前节点
      let index = links.findIndex(item => item.source == id); // 当前节点的索引

      if (temp?.target != 9647358616260) {
        temp.target && findIndex(temp.target);
      }

      if (index > -1) {
        dataIndex.push(index);
      }
    };
    findIndex(id);

    return dataIndex;
  };

  useEffect(() => {
    if (data && echartsRef.current) {
      myChartRef.current = echarts.init(echartsRef.current);
      var option = getOption(data);
      myChartRef.current.setOption(option);

      // myChart.dispatchAction({
      //   type: 'highlight',
      //   seriesIndex: [0],
      //   dataIndex: [0, 14]
      // });

      // 划出恢复原本颜色
      // myChart.on('mouseout', params => {
      //   let { nodes } = data;
      //   nodes.forEach(node => {
      //     node.itemStyle.opacity = 1;
      //   });
      //   myChart.setOption(option);
      // });

      myChartRef.current.on('click', params => {
        let series = myChartRef.current.getOption().series[0];

        const dataIndex = findDataIndex(series.links, params.data.id);

        myChartRef.current.dispatchAction({
          type: 'highlight',
          seriesIndex: [0],
          dataIndex: dataIndex
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, myChartRef]);

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
