import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { getTripleSearchData } from '@/axios';

const config = {
  CAUSE: '原因',
  EQUIPMENT: '设备',
  PHENOMENON: '现象',
  PROCESSING_METHODS: '处理方法',
  FAULT: '故障'
};

export default function Graph(props) {
  const { refresh, keyword, callback, func = getTripleSearchData } = props;
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

  // 需要高亮的节点数组
  const findDataIndex = (links, data, id) => {
    let linkIndexs = [];
    let dataIndexs = [];

    const findSourceIndex = id => {
      var temp = links.find(item => item.source == id); // 找到当前节点
      var linkIndex = links.findIndex(item => item.source == id); // 当前节点的索引

      // 继续找
      if (temp) {
        var dataIndex = data.findIndex(item => item.id == temp.target);
        dataIndex > -1 && dataIndexs.push(dataIndex);
        linkIndex > -1 && linkIndexs.push(linkIndex);
        temp.target != '10112723583684' && findSourceIndex(temp.target);
      }
    };

    findSourceIndex(id);

    return {
      dataIndex: dataIndexs,
      linkIndex: linkIndexs
    };
  };

  useEffect(() => {
    if (data && echartsRef.current) {
      myChartRef.current = echarts.init(echartsRef.current);
      var option = getOption(data);
      myChartRef.current.setOption(option);
      myChartRef.current?.resize();

      myChartRef.current.on('mouseover', params => {
        let obj = {};
        let series = myChartRef.current.getOption().series[0];

        if (params.dataType === 'edge') {
          obj = findDataIndex(series.links, series.data, params.data.source);
        } else {
          obj = findDataIndex(series.links, series.data, params.data.id);
        }

        myChartRef.current.dispatchAction({
          type: 'highlight',
          seriesIndex: [0],
          ...obj
        });
      });

      myChartRef.current.on('mouseup', params => {
        myChartRef.current.dispatchAction({
          type: 'downplay',
          seriesIndex: [0],
          dataIndex: []
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, myChartRef]);

  useEffect(() => {
    func({ keyword }).then((res: any) => {
      callback?.(res.searchRes);
      setData(res.tree || res);
    });
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
