import React, { useState, useEffect } from 'react';
import { Spin, Input, Button, Modal, message } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import useFetch from '@/hooks/common/useFetch';
import TreeWithContextMenu from '../components/tree/TreeWithContextMenu';
import TreeGarph from '../components/tree/tree-graph';

import { getEquipmentSubData, getEquipmentSubTreeData, deleteTree } from '@/axios';
import './index.less';

const { confirm } = Modal;
export default function DeviceTree(props) {
  const { data, dispatch, isLoading: loading } = useFetch(getEquipmentSubData, { pid: 0, level: 1 }); // 整数
  const { dispatch: getEquipmentSubTreeDataFunc } = useFetch(getEquipmentSubTreeData, null, false);
  const [value, setValue] = useState<string>('');
  const [treeGraphData, setTreeGraphData] = useState([]);

  const onSearch = () => {
    dispatch({ keyword: value });
  };

  const showConfirm = () => {
    confirm({
      title: '确定清空图谱数据吗？',
      icon: <ExclamationCircleFilled />,
      onOk: () => {
        console.log('OK');
        deleteTree().then(res => message.success('操作成功'));
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  };

  // const onChange = (value: string[]) => {
  //   dispatch({ code: value[value.length - 1] });
  // };

  // const loadData = selectedOptions => {
  //   const targetOption = selectedOptions[selectedOptions.length - 1]; //selectedOptions.length指的是目前有几级
  //   targetOption.loading = true;
  //   // load options lazily
  //   dispathcGetOptions({ pid: targetOption.id }).then(res => {
  //     targetOption.loading = false;
  //     // res.map(item => {
  //     //   item.isLeaf = item.level < 4 ? false : true;
  //     //   return item;
  //     // });
  //     targetOption.children = res; //把请求到的数据放入targetOption
  //     setOptions([...options]); //目的是更新Cascader组件
  //   });
  // };

  const onSelect = (v: any, node: any) => {
    getEquipmentSubTreeDataFunc({ level: 0, pid: v }).then(res => {
      setTreeGraphData([{ ...node.node, children: res }]);
    });
  };

  useEffect(() => {
    // dispathcGetOptions({ pid: 0 }).then(res => {
    //   // res.map(item => {
    //   //   item.isLeaf = false;
    //   //   return item;
    //   // });
    //   setOptions(res);
    // });

    getEquipmentSubTreeDataFunc({ pid: 0, level: 1 }).then(res => {
      setTreeGraphData(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="device-tree-page">
      <div className="title">设备树</div>
      <div className="search">
        {/* <Cascader
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
        /> */}

        <Input.Search
          placeholder="设备模糊搜索"
          value={value}
          onChange={v => setValue(v.target.value)}
          allowClear
          onSearch={onSearch}
          style={{ width: 400 }}
        />

        <Button onClick={showConfirm} style={{ marginLeft: 40 }}>
          清空设备树
        </Button>
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
