import React from 'react';
import { Table, Tag } from 'antd';
import { renderSize } from '@/utils/tools';
import AddTree from './addTree';

export default function OriginTable(props) {
  const { loading, dataSource } = props;

  const columns = [
    {
      title: '文件名称',
      dataIndex: 'fileName',
      key: 'fileName'
    },
    {
      title: '文件大小',
      dataIndex: 'fileSize',
      key: 'fileSize',
      width: 140,
      render: (text, record) => renderSize(text || 0)
    },
    {
      title: '状态',
      dataIndex: 'regulationStatus',
      key: 'regulationStatus',
      width: 140,
      render: (text, record) => {
        if (record.regulationStatus == 'ALREADY_ADD') {
          return <Tag color="#87d068">已构建</Tag>;
        } else {
          return <Tag color="#f50">未构建</Tag>;
        }
      }
    },
    {
      title: '操作',
      width: 240,
      render: (elem: any, record: any, index: number) => {
        if (record.regulationStatus == 'ALREADY_ADD') {
          return null;
        } else {
          return <AddTree {...record} />;
        }
      }
    }
  ];

  return <Table loading={loading} rowKey="id" dataSource={dataSource} columns={columns} pagination={false} />;
}
