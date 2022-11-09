import React, { useState, useEffect } from 'react';
import { Tree, Dropdown, Menu } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

import { delEquipmentById } from '@/axios';
import DeL from './delTreeNode';
import AddNode from './add-node-modal'; // 新增节点

interface DataNode {
  name: string;
  id: string;
  isLeaf?: boolean;
  children?: DataNode[];
}

const convertData = (data: Array<any>) => {
  data?.forEach(item => {
    item.title = item.name;
    item.key = item.id;
    item.children = item.children || item.subEquipments || [];
    if (item.children.length) {
      item.leaf = false;
      convertData(item.children);
    } else {
      item.leaf = true;
    }
    return item;
  });

  return data || [];
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

export default ({ initTreeData, refresh, getEquipmentSubTreeDataFunc, onSelect }) => {
  const [treeData, setTreeData] = useState<any>(null);

  const onLoadData = ({ id, children }: any) =>
    new Promise<void>(resolve => {
      if (children.length) {
        resolve();
        return;
      }

      getEquipmentSubTreeDataFunc({ pid: id }).then((children: any) => {
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
      console.log(convertData(initTreeData));
      debugger;
      setTreeData(convertData(initTreeData));
    }
  }, [initTreeData]);

  if (!treeData) return null;

  return (
    <Tree
      style={{ minHeight: 'calc(100vh - 200px)', maxHeight: 'calc(100vh - 200px)', overflowY: 'scroll' }}
      loadData={onLoadData}
      onSelect={onSelect}
      treeData={convertData(treeData)}
      titleRender={(item: any) => (
        <Dropdown overlay={<TreeMenu {...item} />} trigger={['contextMenu']}>
          <span>{item.name}</span>
        </Dropdown>
      )}
    />
  );
};
