import React, { useState, useEffect } from 'react';
import { Tree, Dropdown, Menu } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { getEquipmentSubTreeData } from '@/axios';
import useFetch from '@/hooks/common/useFetch';

interface DataNode {
  name: string;
  id: string;
  isLeaf?: boolean;
  children?: DataNode[];
}

// const initTreeData: DataNode[] = [
//   { name: 'Expand to load', id: '0' },
//   {
//     name: 'Expand to load',
//     id: '1',
//     children: [{ name: 'Expand to load', id: '0-0' }]
//   },
//   { name: 'Tree Node', id: '2', isLeaf: true }
// ];

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

export default ({ initTreeData }) => {
  const [treeData, setTreeData] = useState(null);

  const { dispatch } = useFetch(getEquipmentSubTreeData, null);

  const onLoadData = ({ id, children }: any) =>
    new Promise<void>(resolve => {
      if (children.length) {
        resolve();
        return;
      }

      dispatch({ pid: id }).then(children => {
        debugger;
        setTreeData(pre => updateTreeData(pre, id, children));
        resolve();
      });
    });
  const TreeMenu = ({ name }) => {
    return (
      <Menu>
        <Menu.Item key="2" icon={<PlusOutlined />}>
          新增子设备
        </Menu.Item>
        <Menu.Item key="1" icon={<DeleteOutlined />}>
          删除 {name}
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
      style={{ maxHeight: 'calc(100vh - 150px)', overflowY: 'scroll' }}
      autoExpandParent
      loadData={onLoadData}
      treeData={convertData(treeData)}
      titleRender={item => (
        <Dropdown overlay={<TreeMenu {...item} />} trigger={['contextMenu']}>
          <span>{item.name}</span>
        </Dropdown>
      )}
    />
  );
};
