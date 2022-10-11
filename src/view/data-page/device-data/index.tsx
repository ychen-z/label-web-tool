import React, { useEffect } from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import useFetch from '@/hooks/common/useFetch';
import { getFileData } from '@/axios';
import Table from '../components/common-table';
import AddModal from '../modal/add';
import RgCheckInModal from '../modal/rg-check-in-modal';
import './index.less';

export default function TripleData(props) {
  const { data, dispatch, isLoading: loading } = useFetch(getFileData, { page: 0, size: Infinity, fileType: 'EQUIPMENT' }, false);
  const history = useHistory();
  const onNavigateTo = () => {
    history.push('/app/device/tree');
  };
  useEffect(() => {
    dispatch({ page: 0, size: Infinity, fileType: 'EQUIPMENT' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="origin-data-page">
      <section className="m-list">
        <div className="u-operation">
          <AddModal type="ADD" fileType="EQUIPMENT" refresh={dispatch}>
            <Button type="primary">+ 模板导入</Button>
          </AddModal>
          <RgCheckInModal refresh={dispatch} fileType="EQUIPMENT" />
          <Button onClick={onNavigateTo} type="primary">
            查看设备树
          </Button>
        </div>

        <Table fileType="EQUIPMENT" type="equipment" loading={loading} dataSource={data?.content} refresh={dispatch} />
      </section>
    </div>
  );
}
