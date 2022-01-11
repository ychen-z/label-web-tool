import React from 'react';
import { Modal } from 'antd';
import { sendTempalteMsg } from '@/axios';
import { OperateTestProps } from './interface';

const OperateTest = (props: OperateTestProps) => {
    const onClick = () => {
        sendTempalteMsg(props.id).then((data: string) => {
            Modal.success({
                title: '操作成功！',
                content: (
                    <div>
                        信息已发送至<span className="f-fwb">{data}</span> ，请注意查收~
                    </div>
                )
            });
        });
    };

    return (
        <a onClick={onClick} style={{ marginRight: '10px' }}>
            {props.children}
        </a>
    );
};

export default React.memo(OperateTest);
