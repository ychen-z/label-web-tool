import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Props } from './interface';

import './index.less';

const CpmModal = (props: Props) => {
    const { warnText, children, cancelSecondConfirm, cancelSecondConfirmText, onCancel, ...rest } = props;
    const confirmCancel = () => {
        Modal.confirm({
            title: cancelSecondConfirmText || '确定要放弃修改吗？',
            okText: '放弃',
            onOk: onCancel
        });
    };

    return (
        <Modal
            {...rest}
            destroyOnClose
            maskClosable={false}
            wrapClassName={`modal-body-scroll ${warnText ? 'warn-modal' : ''}`}
            onCancel={cancelSecondConfirm ? confirmCancel : onCancel}
        >
            {warnText && (
                <p className="m-warn-text">
                    <ExclamationCircleOutlined className="m-warn-icon" />
                    {warnText}
                </p>
            )}
            <div className={warnText ? 'm-warn-modal-body' : ''}>{children}</div>
        </Modal>
    );
};

export default CpmModal;
