import React, { useState, useEffect, useRef } from 'react';
// then import echarts modules those you have used manually.
import * as echarts from 'echarts';
// import 'echarts/lib/chart/bar';
// import 'echarts/lib/chart/pie';
// import 'echarts/lib/chart/scatter';
// import 'echarts/lib/chart/radar';

// import 'echarts/lib/chart/map';
// import 'echarts/lib/chart/treemap';
import 'echarts/lib/chart/graph';
// import 'echarts/lib/chart/gauge';
// import 'echarts/lib/chart/funnel';
// import 'echarts/lib/chart/parallel';
// import 'echarts/lib/chart/sankey';
// import 'echarts/lib/chart/boxplot';
// import 'echarts/lib/chart/candlestick';
// import 'echarts/lib/chart/effectScatter';
// import 'echarts/lib/chart/lines';
// import 'echarts/lib/chart/heatmap';

// import 'echarts/lib/component/graphic';
// import 'echarts/lib/component/grid';
// import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/polar';
// import 'echarts/lib/component/geo';
// import 'echarts/lib/component/parallel';
// import 'echarts/lib/component/singleAxis';
// import 'echarts/lib/component/brush';

import 'echarts/lib/component/title';

// import 'echarts/lib/component/dataZoom';
// import 'echarts/lib/component/visualMap';

// import 'echarts/lib/component/markPoint';
// import 'echarts/lib/component/markLine';
// import 'echarts/lib/component/markArea';

// import 'echarts/lib/component/timeline';
// import 'echarts/lib/component/toolbox';

// import 'zrender/lib/vml/vml';

import { getTripleTreeData, getTripleSearchData } from '@/axios';

// Register the required components
// echarts.use([GraphChart]);

// echarts.registerTheme('my_theme', {
//   backgroundColor: '#f4cccc'
// });

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
          data: graph.nodes.map((item, index) => {
            return {
              ...item,
              id: item.id + '',
              category: categories.findIndex(_ => _ == config[item.entityType])
            };
          }),
          links: graph.links.map(item => {
            return {
              source: item.source + '',
              target: item.target + ''
            };
          }),
          categories: graph.categories,
          roam: true,
          label: {
            position: 'right',
            formatter: '{b}'
          },
          lineStyle: {
            color: 'source',
            curveness: 0.3
          },
          emphasis: {
            focus: 'adjacency',
            lineStyle: {
              width: 10
            }
          }
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
        res.nodes.shift();
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
