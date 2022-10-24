import React, { useEffect } from 'react';
import useFetch from '@/hooks/common/useFetch';
import { getFileData } from '@/axios';
import Table from './table';
import './index.less';

export default function TripleData(props) {
  const { data, dispatch, isLoading: loading } = useFetch(getFileData, { page: 0, size: Infinity, fileType: 'RELATION_CORPUS' }, false);

  useEffect(() => {
    dispatch({ page: 0, size: Infinity, fileType: 'RELATION_CORPUS' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="add-tree-page">
      <section className="m-list">
        <Table fileType="RELATION_CORPUS" type="relation" loading={loading} dataSource={data?.content} refresh={dispatch} />
      </section>
    </div>
  );
}
