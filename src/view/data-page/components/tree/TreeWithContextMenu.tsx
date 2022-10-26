import React, { useState, useEffect } from 'react';
import { Tree, Dropdown, Menu } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

import { getEquipmentSubTreeData, delEquipmentById } from '@/axios';
import useFetch from '@/hooks/common/useFetch';
import DeL from './delTreeNode';
import AddNode from './add-node-modal'; // 新增节点

interface DataNode {
  name: string;
  id: string;
  isLeaf?: boolean;
  children?: DataNode[];
}

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

const updateTreeData = (list: DataNode[], id: React.Key, children: DataNode[]): DataNode[] =>
  list.map(node => {
    if (node.id === id) {
      return {
        ...node,
        children
      };
    }
    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, id, children)
      };
    }
    return node;
  });

export default ({ initTreeData, refresh }) => {
  const [treeData, setTreeData] = useState<any>(null);

  const { dispatch } = useFetch(getEquipmentSubTreeData, null);

  const onLoadData = ({ id, children }: any) =>
    new Promise<void>(resolve => {
      if (children.length) {
        resolve();
        return;
      }

      dispatch({ pid: id }).then((children: any) => {
        setTreeData(pre => updateTreeData(pre, id, children));
        resolve();
      });
    });

  const TreeMenu = ({ id }) => {
    return (
      <Menu>
        <Menu.Item key="2" icon={<PlusOutlined />}>
          <AddNode id={id} callback={refresh} />
        </Menu.Item>
        <Menu.Item key="1" icon={<DeleteOutlined />}>
          <DeL func={delEquipmentById} id={id} callback={refresh} />
        </Menu.Item>
      </Menu>
    );
  };

  useEffect(() => {
    if (initTreeData) {
      setTreeData(initTreeData);
    }
  }, [initTreeData]);

  if (!treeData) return null;

  return (
    <Tree
      style={{ minHeight: 'calc(100vh - 200px)', maxHeight: 'calc(100vh - 200px)', overflowY: 'scroll' }}
      loadData={onLoadData}
      treeData={convertData(treeData)}
      titleRender={(item: any) => (
        <Dropdown overlay={<TreeMenu {...item} />} trigger={['contextMenu']}>
          <span>{item.name}</span>
        </Dropdown>
      )}
    />
  );
};
