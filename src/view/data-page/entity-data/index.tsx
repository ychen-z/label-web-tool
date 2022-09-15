import React, { useEffect } from 'react';
import { Button } from 'antd';
import useFetch from '@/hooks/common/useFetch';
import { getFileData } from '@/axios';
import Table from '../components/text-table';
import AddModal from '../modal/add';
import RgCheckInModal from '../modal/rg-check-in-modal';
import './index.less';

export default function ToolData(props) {
  const { data, dispatch, isLoading: loading } = useFetch(getFileData, { page: 0, size: Infinity, fileType: 'TXT_CORPUS' }, false);

  useEffect(() => {
    dispatch({ page: 0, size: Infinity, fileType: 'ENTITY_CORPUS' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="origin-data-page">
      <section className="m-list">
        <div className="u-operation">
          <AddModal type="ADD" fileType="ENTITY_CORPUS" refresh={dispatch}>
            <Button type="primary">+ 模板导入</Button>
          </AddModal>

          <RgCheckInModal refresh={dispatch} fileType="ENTITY_CORPUS" />
        </div>

        <Table fileType="ENTITY_CORPUS" loading={loading} dataSource={data?.content} refresh={dispatch} />
      </section>
    </div>
  );
}
