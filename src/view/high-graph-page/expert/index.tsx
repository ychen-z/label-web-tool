import React from 'react';
import { Card } from 'antd';
import Graph from '../../graph-page/graph';
import './index.less';

export default function HighSearch() {
  return (
    <div className="m-high-expert">
      <Card
        extra={
          <>
            <a href="#">人工录入</a>
            <a href="#">模板入库</a>
          </>
        }
      >
        <div className="content">
          <Graph refresh={false} />
        </div>
      </Card>
    </div>
  );
}
