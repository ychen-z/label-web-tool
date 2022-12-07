import React, { useState } from 'react';
import { Card, Input, Collapse } from 'antd';
import { getTripleTreeData } from '@/axios';
import Graph from '../componets/graph';
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
      <Card title={<Input.Search placeholder="智能查询，如：磨煤机" allowClear onSearch={onSearch} style={{ width: 200 }} />}>
        <div className="content">
          <Graph func={getTripleTreeData} refresh={false} keyword={keyword} callback={v => setList(v)} />

          {!!list && (
            <div className="result">
              <div className="title">搜索结果</div>
              <div>
                <Collapse accordion>
                  {list?.map((item, index) => (
                    <Panel header={Object.keys(item)[0] + ',' + Object.values(item)[0]} key={Object.keys(item)[0]}>
                      <div className="regulation" />
                    </Panel>
                  ))}
                </Collapse>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
