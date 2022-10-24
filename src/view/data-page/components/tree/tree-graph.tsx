import React, { useEffect, useRef } from 'react';
// then import echarts modules those you have used manually.
import * as echarts from 'echarts';
import 'echarts/lib/component/tooltip';

import 'echarts/lib/component/title';

export default function TreeGraph(props) {
  const { data } = props;
  const echartsRef = useRef(null);
  const getOption = graph => {
    return {
      title: {
        text: '设备树'
      },
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
      },
      // tooltip: {
      //   //内边距
      //   padding: [5, 10, 5, 10],
      //   //params 传入进来的每个类目数据及echarts属性，ticket异步的类目名称，callback回调函数
      //   formatter(params, ticket, callback) {
      //     //自定义模板
      //     let html = `<div style="max-width: 600px; word" ><div>${params.seriesName}</div><span style="margin-right:10%; width: 100%; white-space: pre-wrap;">${params.name}</span></div>`;
      //     return html;
      //   }
      // },
      animationDuration: 1500,
      series: [
        {
          name: '设备树',
          type: 'tree',
          symbolSize: 7,
          data: graph,
          label: {
            position: 'left',
            verticalAlign: 'middle',
            align: 'right',
            fontSize: 9
          },
          leaves: {
            label: {
              position: 'right',
              verticalAlign: 'middle',
              align: 'left'
            }
          },
          emphasis: {
            focus: 'descendant'
          },
          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750
        }
      ]
    };
  };

  useEffect(() => {
    if (data) {
      var myChart = echarts.init(echartsRef.current);
      data.children?.forEach(function(datum, index) {
        index % 2 === 0 && (datum.collapsed = true);
      });
      var option = getOption(data);
      myChart.setOption(option);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div
      ref={echartsRef}
      style={{
        flex: 1,
        padding: 12,
        border: '1px solid #f1f1f',
        height: '400px'
      }}
    />
  );
}
