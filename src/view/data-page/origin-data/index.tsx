import React, { useEffect } from 'react';
import { Button } from 'antd';
import useFetch from '@/hooks/common/useFetch';
import { getFileData } from '@/axios';
import OriginDataTable from '../components/table';
import AddModal from './modal/add';
import './index.less';

export default function OriginData(props) {
  const { data, dispatch: getOriginData, isLoading: loading } = useFetch(
    getFileData,
    { page: 0, size: Infinity, fileType: 'ORIGINAL_CORPUS' },
    false
  );

  useEffect(() => {
    getOriginData({ page: 0, size: Infinity, fileType: 'ORIGINAL_CORPUS' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="origin-data-page">
      <section className="m-list">
        <div className="u-operation">
          <AddModal type="ADD" refresh={getOriginData}>
            <Button type="primary">+ 文件导入</Button>
          </AddModal>
        </div>

        <OriginDataTable loading={loading} dataSource={data?.content} refresh={getOriginData} />
      </section>
    </div>
  );
}
