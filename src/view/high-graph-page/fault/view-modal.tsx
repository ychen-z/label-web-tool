import React, { useState } from 'react';
import { Button } from 'antd';
import Modal from '@/components/common/u-modal';
import { getRegulationById } from '@/axios';
import './index.less';

export default function ViewModal(props) {
  const { triggerDom, id } = props;
  const [data, setData] = useState({});
  const beforeShow = () => {
    return getRegulationById(id).then(res => {
      setData(res);
    });
  };
  return (
    <Modal
      beforeShow={beforeShow}
      footer={null}
      width={800}
      title="查看详情"
      render={onCancel => {
        return (
          <>
            <div className="regulation">
              <div>
                <span>现象</span>：{data.phenomenon || '--'}
              </div>
              <div>
                <span>原因</span>：{data.cause || '--'}
              </div>
              <div>
                <span>解决方案</span>：{data.processingMethods || '--'}
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: 12 }}>
              <Button type="primary" onClick={() => onCancel()}>
                我知道了
              </Button>
            </div>
          </>
        );
      }}
      triggerDom={triggerDom}
    />
  );
}
