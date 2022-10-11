import React from 'react';
import { Spin } from 'antd';
import useFetch from '@/hooks/common/useFetch';
import TreeWithContextMenu from '../components/tree/TreeWithContextMenu';
import { getEquipmentTreeData } from '@/axios';
import './index.less';

export default function DeviceTree(props) {
  const { data, isLoading: loading } = useFetch(getEquipmentTreeData);

  return (
    <div className="device-tree-page">
      <div className="title">设备树呈现</div>
      <Spin spinning={loading}>
        <TreeWithContextMenu initTreeData={data} />
      </Spin>
    </div>
  );
}
