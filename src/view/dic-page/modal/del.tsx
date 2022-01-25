import React from 'react';
import { Popconfirm, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import useFetch from '@/hooks/common/useFetch';

interface Props {
    refresh?: Function;
    id: string | number;
    func: (req: any) => Promise<unknown>;
}

function Del(props: Props) {
    const { func, id } = props;
    const { dispatch: dispatchDeleteApp } = useFetch(func, null, false);
    const onDel = () => {
        dispatchDeleteApp(id).then((data: any) => {
            props?.refresh();
            message.success('删除成功');
        });
    };

    return (
        <Popconfirm key="2" title="确定删除吗?" okText="确定" cancelText="取消" onConfirm={onDel}>
            <a>
                <DeleteOutlined style={{ color: '#e6231f' }} /> 删除
            </a>
        </Popconfirm>
    );
}

export default Del;
