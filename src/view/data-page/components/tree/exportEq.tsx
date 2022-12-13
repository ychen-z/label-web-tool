import React from 'react';
import { message } from 'antd';
import useFetch from '@/hooks/common/useFetch';

interface Props {
  id: string | number;
}

function ExportEq(props: Props) {
  const { id } = props;

  const handleClick = (e: any) => {
    e.preventDefault();
  };

  return (
    <a
      onClick={handleClick}
      href={'/api/equipment/export/' + id}
      target="_blank"
      style={{
        display: 'inline-block',
        width: '100px',
        textAlign: 'center',
        background: '#00446B',
        color: '#fff'
      }}
    >
      导出
    </a>
  );
}

export default ExportEq;
