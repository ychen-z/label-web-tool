import React, { useState } from 'react';
import { Card, Input, List } from 'antd';
import Graph from '../../graph-page/graph';
import './index.less';
import ViewModal from './view-modal';

export default function HighFault() {
  const [keyword, setKeyword] = useState(null);
  const [list, setList] = useState([]);
  const onSearch = v => setKeyword(v);

  return (
    <div className="m-high-fault">
      <Card title={<Input.Search placeholder="故障查询，如：温度升高" allowClear onSearch={onSearch} style={{ width: 500 }} />}>
        <div className="content">
          <Graph type="FAULT" refresh={false} keyword={keyword} callback={v => setList(v)} />
          <div className="result">
            <div className="title">搜索结果</div>
            <div>
              <List
                itemLayout="horizontal"
                dataSource={list.slice(0, 20)}
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta
                      title={
                        <ViewModal
                          id={item.regulationId}
                          triggerDom={
                            <a>
                              {index + 1} 、{item.name}
                            </a>
                          }
                        />
                      }
                    />
                  </List.Item>
                )}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
