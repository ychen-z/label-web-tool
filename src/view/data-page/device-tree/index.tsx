import React, { useState } from 'react';
import { Spin, Input } from 'antd';
import useFetch from '@/hooks/common/useFetch';
import TreeWithContextMenu from '../components/tree/TreeWithContextMenu';
import { getEquipmentTreeData } from '@/axios';
import './index.less';

export default function DeviceTree(props) {
  const { data, dispatch, isLoading: loading } = useFetch(getEquipmentTreeData);
  const [value, setValue] = useState<string>('');
  const onSearch = () => {
    dispatch({ keyword: value });
  };
  return (
    <div className="device-tree-page">
      <div className="title">设备树</div>
      <div className="search">
        <Input.Search placeholder="查找设备" value={value} onChange={v => setValue(v)} allowClear onSearch={onSearch} style={{ width: 400 }} />
      </div>

      <Spin spinning={loading}>
        <TreeWithContextMenu initTreeData={data} refresh={() => dispatch(value)} />
      </Spin>
    </div>
  );
}
