import React, { useState, useEffect } from 'react';
import { Card, Input, Tabs } from 'antd';
import { getRegulationById } from '@/axios';
import Graph from '../../graph-page/graph';
import './index.less';

export default function HighFault() {
  const [keyword, setKeyword] = useState(null);
  const [activeKey, setActiveKey] = useState('');
  const [data, setData] = useState({});
  const [list, setList] = useState([]);
  const onSearch = v => setKeyword(v);

  useEffect(() => {
    if (list.length) {
      setActiveKey(list[0].regulationId + '');
    }
  }, [list]);

  useEffect(() => {
    if (activeKey) {
      getRegulationById(activeKey).then(res => setData(res));
    }
  }, [activeKey]);
  return (
    <div className="m-high-fault">
      <Card title={<Input.Search placeholder="故障查询，如：温度升高" allowClear onSearch={onSearch} style={{ width: 500 }} />}>
        <div className="content">
          <Graph type="FAULT" refresh={false} keyword={keyword} callback={v => setList(v)} />
          <div className="result">
            <h2>搜索结果</h2>
            {activeKey && (
              <Tabs defaultActiveKey={activeKey} activeKey={activeKey} onChange={v => setActiveKey(v)}>
                {list.map(item => (
                  <Tabs.TabPane tab={item.name} key={item.regulationId}>
                    <div className="regulation">
                      <div>
                        <span>现象</span>：{data.phenomenon || '--'}
                      </div>
                      <div>
                        <span>原因</span>：{data.cause || '--'}
                      </div>
                      <div>
                        <span>解决方案</span>：{data.processingMethods || '--'}
                      </div>
                    </div>
                  </Tabs.TabPane>
                ))}
              </Tabs>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
