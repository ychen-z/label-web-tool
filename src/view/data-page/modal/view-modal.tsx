import React, { useState } from 'react';
import { Button } from 'antd';
import Modal from '@/components/common/u-modal';
import IconSet from '@/components/icon';
import { getFileById, getFileContent } from '@/axios';

export default function ViewModal(props) {
  const { id, type } = props;
  const [content, setContent] = useState('');
  const [list, setList] = useState([]);
  const beforeShow = () => {
    if (type === 'txt') {
      return getFileById(id).then(res => {
        setContent(res.content);
      });
    }

    return getFileContent({ id, type }).then(res => {
      setList(res);
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
            {type === 'txt' && <div style={{ maxHeight: '480px', overflowY: 'scroll', whiteSpace: 'pre-wrap' }}>{content}</div>}
            <div style={{ maxHeight: '480px', overflowY: 'scroll', whiteSpace: 'pre-wrap' }}>
              {type === 'txt' && content}
              {type === 'entity' && list.map(item => <p key={item.id} dangerouslySetInnerHTML={{ __html: item.textMark }} />)}
              {type === 'relation' &&
                list.map(item => (
                  <p key={item.id}>
                    {item.headEntity} -> {item.relation} -> {item.tailEntity}
                  </p>
                ))}
              {type === 'equipment' &&
                list.map(item => (
                  <p key={item.code}>
                    code: {item.code} - {item.name} ;type: {item.type} - {item.equipmentTypeCode}
                  </p>
                ))}
            </div>
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
