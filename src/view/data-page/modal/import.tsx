import React from 'react';
import { Form, Input, Modal, message } from 'antd';
import Upload from '@/components/upload/SelfUpload';
import useFetch from '@/hooks/common/useFetch';
import { fileUpload, updateFileName } from '@/axios';

interface Props {
  data?: Record<string, any>;
  type: 'ADD' | 'EDIT';
  fileType?: 'ORIGINAL_CORPUS' | 'TXT_CORPUS' | 'ENTITY_CORPUS' | 'RELATION_CORPUS';
  onCancel: Function;
  refresh: Function;
}

const ADDModal = (props: Props) => {
  const [form] = Form.useForm();
  const { data, onCancel, refresh, type, fileType = 'ORIGINAL_CORPUS' } = props;
  const { dispatch: updateFunc } = useFetch(updateFileName, null, false); // 更新
  const { dispatch: addFunc } = useFetch(fileUpload, null, false); // 新增
  const title = type === 'EDIT' ? '编辑' : '新增';

  const fetch = async () => {
    form.validateFields().then(values => {
      values.filePath = values.filePath?.length ? values.filePath[0]?.response.data.id : undefined;
      values.id
        ? updateFunc(values).then(res => {
            message.success('操作成功');
            onCancel && onCancel();
            refresh && refresh();
          })
        : addFunc({ ...values, id: values.filePath }).then(res => {
            message.success('操作成功');
            onCancel && onCancel();
            refresh && refresh();
          });
    });
  };

  return (
    <Modal title={title} visible onOk={fetch} onCancel={onCancel}>
      <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} initialValues={{ ...data, fileType }} scrollToFirstError>
        {['ENTITY_CORPUS', 'RELATION_CORPUS'].includes(fileType) && (
          <Form.Item label="模板下载">
            <a href="/files/%E4%B8%89%E5%85%83%E7%BB%84%E6%A8%A1%E6%9D%BF.xlsx" target="_blank">
              结构化数据模板1
            </a>
          </Form.Item>
        )}

        <Form.Item hidden label="id" name="id">
          <Input disabled />
        </Form.Item>

        <Form.Item hidden label="fileType" name="fileType">
          <Input disabled />
        </Form.Item>

        {type == 'EDIT' && (
          <Form.Item label="文件名称" name="fileName">
            <Input placeholder="请输入" maxLength={200} />
          </Form.Item>
        )}

        {type == 'ADD' && (
          <Form.Item label="文件" name="filePath" valuePropName="fileList">
            <Upload action="/mock/test/api/fileInfo/upload" maxCount="1" accept="doc,docx,txt,pdf,png,jpg,jpeg" />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default ADDModal;
