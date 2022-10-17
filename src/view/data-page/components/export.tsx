import React from 'react';
import IconSet from '@/components/icon';

// 导出
export default function Export(props) {
  const { url } = props;
  return (
    <a href={url} target="_blank">
      <IconSet type="icon-daochu" /> 导出
    </a>
  );
}
