import React, { useEffect } from 'react';
import { Button } from 'antd';
import useFetch from '@/hooks/common/useFetch';
import { getFileData } from '@/axios';
import Table from '../components/common-table';
import AddModal from '../modal/add';
import RgCheckInModal from '../modal/rg-check-in-modal';
import './index.less';

export default function TripleData(props) {
  const { data, dispatch, isLoading: loading } = useFetch(getFileData, { page: 0, size: Infinity, fileType: 'TXT_CORPUS' }, false);

  useEffect(() => {
    dispatch({ page: 0, size: Infinity, fileType: 'RELATION_CORPUS' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="origin-data-page">
      <section className="m-list">
        <div className="u-operation">
          <AddModal type="ADD" fileType="RELATION_CORPUS" refresh={dispatch}>
            <Button type="primary">+ 模板导入</Button>
          </AddModal>

          {/* <RgCheckInModal refresh={dispatch} fileType="RELATION_CORPUS" /> */}
        </div>

        <Table fileType="RELATION_CORPUS" loading={loading} dataSource={data?.content} refresh={dispatch} />
      </section>
    </div>
  );
}
