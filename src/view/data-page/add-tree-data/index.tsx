import React, { useEffect } from 'react';
import { getParams } from '@/utils/tools';
import useFetch from '@/hooks/common/useFetch';
import { getFileData, addToTree, markTree } from '@/axios';
import Table from './table';
import './index.less';

export default function AddTreeData(props) {
  const { type } = getParams();
  const func = type == 'RELATION_CORPUS' ? addToTree : markTree;
  const { data, dispatch, isLoading: loading } = useFetch(getFileData, { page: 1, size: Infinity, fileType: type }, false);

  //RELATION_CORPUS
  useEffect(() => {
    dispatch({ page: 1, size: Infinity, fileType: type });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return (
    <div className="add-tree-page">
      <section className="m-list">
        <Table func={func} fileType={type} loading={loading} dataSource={data?.content} refresh={dispatch} />
      </section>
    </div>
  );
}
