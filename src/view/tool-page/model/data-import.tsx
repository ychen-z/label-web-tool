import React, { useState } from 'react';
import { Button, Select, Tabs, Slider, InputNumber } from 'antd';

const { Option } = Select;
const { TabPane } = Tabs;

/**
 *
 * @returns 数据导入
 */
export default function DataImport() {
    const [activeKey, setActiveKey] = useState('1');

    const onChangeTabs = v => {
        setActiveKey(v);
    };

    return (
        <div>
            <div>字典选中：</div>
            <div>语料选中：</div>
            <div>
                <Tabs defaultActiveKey={activeKey} onChange={onChangeTabs}>
                    <TabPane tab="字典" key="1">
                        字典
                    </TabPane>
                    <TabPane tab="语料" key="2">
                        语料
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
}
