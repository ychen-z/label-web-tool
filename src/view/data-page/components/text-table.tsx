import React from 'react';
import { Table, Space, Divider } from 'antd';
import IconSet from '@/components/icon';
import { delFile } from '@/axios';
import { renderSize } from '@/utils/tools';
import UpdateModal from '../modal/add';
import Del from '../modal/del';

export default function OriginTable(props) {
  const { loading, refresh, dataSource } = props;

  // const rowSelection = {
  //   selectedRowKeys: props.selectedKeys,
  //   onChange: (selectedRowKeys, selectedRows) => {
  //     dispatchText?.(selectedRowKeys);
  //     props.setSelectedKeys(selectedRowKeys);
  //   },
  //   getCheckboxProps: record => ({
  //     id: record.id + ''
  //   })
  // };

  const columns = [
    {
      title: '文件名称',
      dataIndex: 'fileName',
      key: 'fileName',
      width: 240
    },
    {
      title: '文件类型',
      dataIndex: 'fileExt',
      key: 'fileExt'
    },
    {
      title: '文件大小',
      dataIndex: 'fileSize',
      key: 'fileSize',
      width: 140,
      render: (text, record) => renderSize(text || 0)
    },
    {
      title: '操作',
      width: 300,
      render: (elem: any, row: any, index: number) => {
        return (
          <Space>
            <UpdateModal data={row} type="EDIT" refresh={refresh}>
              <a>
                <IconSet type="icon-yulan-dakai" /> 查看
              </a>
            </UpdateModal>
            <Divider type="vertical" />
            <UpdateModal data={row} type="EDIT" refresh={refresh}>
              <a>
                <IconSet type="icon-bianji" /> 编辑
              </a>
            </UpdateModal>

            <Divider type="vertical" />
            <Del id={row.id} func={delFile} refresh={refresh} />
          </Space>
        );
      }
    }
  ];
  return <Table loading={loading} rowKey="id" dataSource={dataSource} columns={columns} pagination={false} />;
}
