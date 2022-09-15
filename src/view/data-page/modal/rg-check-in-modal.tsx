import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import Modal from '@/components/common/u-modal';

import IconSet from '@/components/icon';
import { manualImport } from '@/axios';

export default function RgCheckInModal(props) {
  const { refresh } = props;
  const [form] = Form.useForm();
  // const beforeShow = () => {
  //   return getFileById(id).then(res => {
  //     setContent(res.content);
  //   });
  // };

  const fetch = () => {
    return form.validateFields().then(values => {
      manualImport(values).then(res => {
        message.success('操作成功');
        refresh && refresh();
      });
    });
  };

  return (
    <Modal
      width={800}
      title="人工录入"
      triggerDom={
        <Button type="primary">
          <IconSet type="icon-manual" />
          人工录入
        </Button>
      }
      onOk={fetch}
    >
      <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} scrollToFirstError>
        <Form.Item label="文件名称" name="fileName" rules={[{ required: true, message: '请填写' }]}>
          <Input placeholder="请输入" maxLength={100} />
        </Form.Item>

        <Form.Item label="文件描述" name="fileDesc" rules={[{ required: true, message: '请填写' }]}>
          <Input.TextArea placeholder="请输入" maxLength={200} />
        </Form.Item>

        <Form.Item label="内容" name="content" rules={[{ required: true, message: '请填写' }]}>
          <Input.TextArea placeholder="请输入" maxLength={20000} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
