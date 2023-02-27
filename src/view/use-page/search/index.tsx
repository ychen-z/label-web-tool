import React, { useState } from 'react';
import { Card, Input, Collapse, Row, Col } from 'antd';
import { getTripleTreeData } from '@/axios';
import Graph from '../componets/graph';
import { config } from './config';
import './index.less';

const { Panel } = Collapse;

export default function HighSearch() {
  const [keyword, setKeyword] = useState(null);
  const [list, setList] = useState();

  const onSearch = v => {
    setKeyword(v);
  };
  return (
    <div className="m-high-graph-page">
      <Card title={<Input.Search placeholder="智能查询，如：磨煤机" allowClear onSearch={onSearch} style={{ width: 400 }} />}>
        <div className="content">
          <Graph func={getTripleTreeData} refresh={false} keyword={keyword} callback={v => setList(v)} />

          {!!list && (
            <div className="result">
              <div className="title">搜索结果</div>
              <div>
                <Collapse accordion>
                  {list?.map((item, index) => {
                    return (
                      <Panel header={item.sheetName} key={index}>
                        {item.data.map(i => (
                          <Row>
                            {i.map(j => (
                              <Col span={6}>{j}</Col>
                            ))}
                          </Row>
                        ))}
                      </Panel>
                    );
                  })}
                </Collapse>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
