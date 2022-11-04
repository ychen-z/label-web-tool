import React, { useState, useEffect } from 'react';
import { Spin, Input, Cascader } from 'antd';
import useFetch from '@/hooks/common/useFetch';
import TreeWithContextMenu from '../components/tree/TreeWithContextMenu';
import TreeGarph from '../components/tree/tree-graph';

import { getEquipmentTreeData, getEquipmentSubData, getEquipmentSubTreeData } from '@/axios';
import './index.less';

export default function DeviceTree(props) {
  const { data, dispatch, isLoading: loading } = useFetch(getEquipmentTreeData); // 整数
  const { dispatch: dispathcGetOptions } = useFetch(getEquipmentSubData, null, false); // 获取下级设备
  const { dispatch: getEquipmentSubTreeDataFunc } = useFetch(getEquipmentSubTreeData, null, false);
  const [value, setValue] = useState<string>('');
  const [options, setOptions] = useState([]);
  const [treeGraphData, setTreeGraphData] = useState([]);

  const onSearch = () => {
    dispatch({ keyword: value });
  };

  const onChange = (value: string[]) => {
    dispatch({ code: value[value.length - 1] });
  };

  const loadData = selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1]; //selectedOptions.length指的是目前有几级
    targetOption.loading = true;
    // load options lazily
    dispathcGetOptions({ pid: targetOption.id }).then(res => {
      targetOption.loading = false;
      res.map(item => {
        item.isLeaf = item.level < 4 ? false : true;
        return item;
      });
      targetOption.children = res; //把请求到的数据放入targetOption
      setOptions([...options]); //目的是更新Cascader组件
    });
  };

  const onSelect = (v: any, node: any) => {
    getEquipmentSubTreeDataFunc({ level: 0, pid: v }).then(res => {
      setTreeGraphData([{ ...node.node, children: res }]);
    });
  };

  useEffect(() => {
    dispathcGetOptions({ pid: 0 }).then(res => {
      res.map(item => {
        item.isLeaf = false;
        return item;
      });
      setOptions(res);
    });

    getEquipmentSubTreeDataFunc({ pid: 0, level: 1 }).then(res => {
      setTreeGraphData(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="device-tree-page">
      <div className="title">设备树</div>
      <div className="search">
        <Cascader
          fieldNames={{
            label: 'name',
            value: 'code'
          }}
          showSearch
          style={{ display: 'none' }}
          options={options}
          // defaultValue={}
          loadData={loadData}
          onChange={onChange}
          changeOnSelect
        />

        <Input.Search
          placeholder="设备模糊搜索"
          value={value}
          onChange={v => setValue(v.target.value)}
          allowClear
          onSearch={onSearch}
          style={{ width: 400 }}
        />
      </div>

      <Spin spinning={loading}>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <TreeWithContextMenu
              onSelect={onSelect}
              getEquipmentSubTreeDataFunc={getEquipmentSubTreeDataFunc}
              initTreeData={data}
              refresh={() => dispatch(value)}
            />
          </div>
          <TreeGarph data={treeGraphData} />
        </div>
      </Spin>
    </div>
  );
}
