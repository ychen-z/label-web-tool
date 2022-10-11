import React, { useState } from 'react';
import { Card, Input, Tabs } from 'antd';
import Graph from '../../graph-page/graph';
import './index.less';

export default function HighFault() {
  const [keyword, setKeyword] = useState(null);
  const [list, setList] = useState([]);
  const onSearch = v => setKeyword(v);
  return (
    <div className="m-high-fault">
      <Card title={<Input.Search placeholder="故障查询" allowClear onSearch={onSearch} style={{ width: 200 }} />}>
        <div className="content">
          <Graph type="FAULT" refresh={false} keyword={keyword} callback={v => setList(v)} />
          <div className="result">
            <div>搜索结果</div>
            <Tabs defaultActiveKey="1">
              {list.map(item => (
                <Tabs.TabPane tab={item.name} key={item.id}>
                  {item.name}
                </Tabs.TabPane>
              ))}
            </Tabs>
          </div>
        </div>
      </Card>
    </div>
  );
}
