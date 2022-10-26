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
        text: ''
      },
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
      },
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

  const convertData = (data: Array<any>) => {
    data.forEach(item => {
      item.title = item.name;
      item.key = item.id;
      item.children = item.children || item.subEquipments;
      if (item.children) {
        convertData(item.children);
      }
    });
    return data;
  };

  useEffect(() => {
    if (data) {
      var myChart = echarts.init(echartsRef.current);
      var option = getOption(convertData(data));
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
