import React, { useEffect, useState } from 'react';
import { useInterval } from 'ahooks';
import { getParams } from '@/utils/tools';
import useFetch from '@/hooks/common/useFetch';
import { getFileData, addToTree, markTree } from '@/axios';
import Table from './table';
import './index.less';

export default function AddTreeData(props) {
  const { type } = getParams();
  const func = type == 'RELATION_CORPUS' ? addToTree : markTree;
  const { data, dispatch, isLoading: loading } = useFetch(getFileData, { page: 1, size: Infinity, fileType: type }, false);
  const [interval, setInterval] = useState<null | number>(null);

  useInterval(() => {
    type == 'RELATION_CORPUS' && dispatch({ page: 1, size: Infinity, fileType: type });
  }, interval);

  //RELATION_CORPUS
  useEffect(() => {
    dispatch({ page: 1, size: Infinity, fileType: type });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    setInterval(10000);
    return () => {
      setInterval(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="add-tree-page">
      <section className="m-list">
        <Table func={func} fileType={type} loading={loading} dataSource={data?.content} refresh={dispatch} />
      </section>
    </div>
  );
}
