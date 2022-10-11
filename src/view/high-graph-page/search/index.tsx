import React, { useState } from 'react';
import { Card, Input, Tabs } from 'antd';
import Graph from '../../graph-page/graph';
import './index.less';

export default function HighSearch() {
  const [keyword, setKeyword] = useState(null);
  const onSearch = v => {
    setKeyword(v);
  };
  return (
    <div className="m-high-graph-page">
      <Card title={<Input.Search placeholder="智能搜索" allowClear onSearch={onSearch} style={{ width: 200 }} />}>
        <div className="content">
          <Graph refresh={false} keyword={keyword} />
          <div className="result">
            <div>搜索结果</div>
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="智能搜索结果" key="1">
                搜索结果展示~~
              </Tabs.TabPane>
            </Tabs>
          </div>
        </div>
      </Card>
    </div>
  );
}
