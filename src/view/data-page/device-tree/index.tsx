import React from 'react';
import { Spin, Input } from 'antd';
import useFetch from '@/hooks/common/useFetch';
import TreeWithContextMenu from '../components/tree/TreeWithContextMenu';
import { getEquipmentTreeData } from '@/axios';
import './index.less';

export default function DeviceTree(props) {
  const { data, dispatch, isLoading: loading } = useFetch(getEquipmentTreeData);

  return (
    <div className="device-tree-page">
      <div className="title">设备树</div>
      <div className="search">
        <Input.Search placeholder="查找设备" allowClear onSearch={v => dispatch({ keyword: v })} style={{ width: 200 }} />
      </div>
      <Spin spinning={loading}>
        <TreeWithContextMenu initTreeData={data} />
      </Spin>
    </div>
  );
}
