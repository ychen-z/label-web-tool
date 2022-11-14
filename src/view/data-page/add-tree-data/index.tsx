import React, { useEffect } from 'react';
import useFetch from '@/hooks/common/useFetch';
import { getFileData } from '@/axios';
import Table from './table';
import './index.less';

export default function AddTreeData(props) {
  const { data, dispatch, isLoading: loading } = useFetch(getFileData, { page: 1, size: Infinity, fileType: 'RELATION_CORPUS' }, false);

  // RELATION_CORPUS
  useEffect(() => {
    dispatch({ page: 1, size: Infinity, fileType: 'EQUIPMENT' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="add-tree-page">
      <section className="m-list">
        <Table fileType="EQUIPMENT" loading={loading} dataSource={data?.content} refresh={dispatch} />
      </section>
    </div>
  );
}
