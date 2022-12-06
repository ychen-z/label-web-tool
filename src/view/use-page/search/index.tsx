import React, { useState } from 'react';
import { Card, Input, List } from 'antd';
import { getTripleTreeData } from '@/axios';
import Graph from '../componets/graph';
import './index.less';

export default function HighSearch() {
  const [keyword, setKeyword] = useState(null);
  const [list, setList] = useState();
  const onSearch = v => {
    setKeyword(v);
  };
  return (
    <div className="m-high-graph-page">
      <Card title={<Input.Search placeholder="智能搜索" allowClear onSearch={onSearch} style={{ width: 200 }} />}>
        <div className="content">
          <Graph func={getTripleTreeData} refresh={false} keyword={keyword} callback={v => setList(v)} />
          {!!list && (
            <div className="result">
              <div className="title">搜索结果</div>
              <div>
                <List
                  itemLayout="horizontal"
                  dataSource={list?.slice(0, 20)}
                  renderItem={(item, index) => (
                    <List.Item>
                      <List.Item.Meta
                        title={
                          <a>
                            {Object.keys(item)[0]} 、{Object.values(item)[0]}
                          </a>
                        }
                      />
                    </List.Item>
                  )}
                />
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
