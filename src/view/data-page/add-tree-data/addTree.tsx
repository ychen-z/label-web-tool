import React from 'react';
import { useHistory } from 'react-router-dom';
import { Popconfirm, notification } from 'antd';
import useFetch from '@/hooks/common/useFetch';
import { addToTree } from '@/axios';

interface Props {
  refresh?: Function;
  id: string | number;
}

function AddToTree(props: Props) {
  const { id } = props;
  const history = useHistory();
  const { dispatch } = useFetch(addToTree, null, false);
  const onAdd = () => {
    dispatch(id).then((data: any) => {
      props.refresh?.();
      if (!data.data) {
        notification.success({
          message: '添加成功',
          description: (
            <a
              onClick={() => {
                history.push('/app/high/search');
              }}
            >
              去看看
            </a>
          ),
          onClick: () => {
            console.log('Notification Clicked!');
          }
        });
      } else {
        notification.error({
          message: '部分成功',
          description:
            '查看失败数据' +
            (
              <a href={data.data} target="_blank">
                点击下载
              </a>
            ),
          onClick: () => {
            console.log('Notification Clicked!');
          }
        });
      }
    });
  };

  return (
    <Popconfirm key="2" title="确定构建图片吗?" okText="确定" cancelText="取消" onConfirm={onAdd}>
      <a>构建图谱</a>
    </Popconfirm>
  );
}

export default AddToTree;
