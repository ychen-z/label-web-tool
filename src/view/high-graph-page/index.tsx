import React, { useState, useEffect, useRef } from 'react';
import { Card, Input, Tabs } from 'antd';
import Graph from '../graph-page/graph';
import './index.less';

export default function HighGraph() {
  const onSearch = () => console.log('!');
  return (
    <div className="m-high-graph-page">
      <Card
        title={<Input.Search placeholder="智能搜索" allowClear onSearch={onSearch} style={{ width: 200 }} />}
        extra={
          <>
            <a href="#">人工录入</a>
            <a href="#">模板入库</a>
          </>
        }
      >
        <div className="content">
          <Graph refresh={false} />
          <div className="result">
            <div>搜索结果</div>
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="智能搜索结果1" key="1">
                搜索结果展示~~
              </Tabs.TabPane>
            </Tabs>
          </div>
        </div>
      </Card>
    </div>
  );
}
