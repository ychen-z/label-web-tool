import React, { useState, useEffect } from 'react';
import { Tree, Dropdown, Menu } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { getEquipmentSubTreeData, delEquipmentById } from '@/axios';
import useFetch from '@/hooks/common/useFetch';
import DeL from './delTreeNode';

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

// function deleteNode(arr, targetId) {
//   for (let i = 0; i < arr.length; i++) {
//     const node = arr[i];

//     if (node.id === targetId) {
//       arr.splice(i, 1);
//       return arr;
//     }

//     // 判断children存在并且有数据
//     if (Array.isArray(node.children) && node.children.length) {
//       return deleteNode(node.children, targetId);
//     }
//   }
// }

/**
 * 删除节点
 * @param arr
 * @param targetId
 * @returns
 */
function filterDel(arr, targetId) {
  arr.map((item, index) => {
    if (item.id == targetId) {
      arr.splice(index, 1);
    }
    if (Array.isArray(item.children) && item.children.length) {
      filterDel(item.children, targetId);
    }
  });
  return arr;
}

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
        setTreeData(pre => updateTreeData(pre, id, children));
        resolve();
      });
    });

  const callback = id => setTreeData(pre => filterDel(pre, id));

  const TreeMenu = ({ id }) => {
    return (
      <Menu>
        <Menu.Item key="2" icon={<PlusOutlined />}>
          新增子设备
        </Menu.Item>
        <Menu.Item key="1" icon={<DeleteOutlined />}>
          <DeL func={delEquipmentById} id={id} callback={id => callback(id)} />
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
      titleRender={item => (
        <Dropdown overlay={<TreeMenu {...item} />} trigger={['contextMenu']}>
          <span>{item.name}</span>
        </Dropdown>
      )}
    />
  );
};
