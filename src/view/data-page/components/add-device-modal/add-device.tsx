import React from 'react';
import { Form, Modal, message, Select } from 'antd';
import useFetch from '@/hooks/common/useFetch';
import { equipmentAdd, tripleAdd, getFileData } from '@/axios';

interface Props {
  data?: Record<string, any>;
  fileType: 'EQUIPMENT' | 'RELATION_CORPUS';
  type: 'ADD' | 'EDIT';
  onCancel: () => void;
  refresh: () => void;
}

const AddTreeModal = (props: Props) => {
  const [form] = Form.useForm();
  const { data, fileType, onCancel, refresh, type } = props;
  const { dispatch: equipmentAddFunc } = useFetch(equipmentAdd, null, false); // 设备
  const { dispatch: tripleAddFunc } = useFetch(tripleAdd, null, false); // 三元组
  const { data: fileList } = useFetch<any>(getFileData, { page: 1, size: Infinity, fileType, buildStatus: 'YES' });

  const title = type === 'EDIT' ? '编辑' : '新增';

  const fetch = (values: any) => {
    form.validateFields().then(values => {
      // values.filePath = values.filePath?.length ? values.filePath[0].response.data : undefined;
      fileType == 'EQUIPMENT'
        ? equipmentAddFunc({ ...values, fileType, buildStatus: 'YES' }).then(res => {
            message.success('操作成功');
            onCancel && onCancel();
            refresh && refresh();
          })
        : tripleAddFunc({ ...values, fileType, buildStatus: 'YES' }).then(res => {
            message.success('操作成功');
            onCancel && onCancel();
            refresh && refresh();
          });
    });
  };

  return (
    <Modal title={title} visible onOk={fetch} onCancel={onCancel}>
      <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} initialValues={{ ...data }} scrollToFirstError>
        <Form.Item label="文件" name="id">
          <Select placeholder="请选择">
            {fileList?.content?.map(item => (
              <Select.Option value={item.id} key={item.id}>
                {item.fileName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTreeModal;
