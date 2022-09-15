import React, { useState } from 'react';
import { Button } from 'antd';
import Modal from '@/components/common/u-modal';
import IconSet from '@/components/icon';
import { getFileById } from '@/axios';

export default function ViewModal(props) {
  const { id } = props;
  const [content, setContent] = useState('');
  const beforeShow = () => {
    return getFileById(id).then(res => {
      setContent(res.content);
    });
  };
  return (
    <Modal
      footer={null}
      width={800}
      title="查看详情"
      beforeShow={beforeShow}
      render={onCancel => {
        return (
          <div>
            <div style={{ maxHeight: '480px', overflowY: 'scroll', whiteSpace: 'pre-wrap' }}>{content}</div>
            <div style={{ textAlign: 'center', marginTop: 12 }}>
              <Button type="primary" onClick={() => onCancel()}>
                我知道了
              </Button>
            </div>
          </div>
        );
      }}
      triggerDom={
        <a>
          <IconSet type="icon-yulan-dakai" /> 查看
        </a>
      }
    />
  );
}
