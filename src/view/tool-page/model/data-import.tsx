import React, { useState } from 'react';
import { Tabs } from 'antd';
import DicTable from '@/view/dic-page';
import TextTable from '@/view/text-page';

const { TabPane } = Tabs;

/**
 *
 * @returns 数据导入
 */

export default function DataImport() {
    var dictIds = localStorage.getItem('dictIds')?.split(',');
    var textIds = localStorage.getItem('textIds')?.split(',');
    const [activeKey, setActiveKey] = useState('1');
    const [dicLength, setDicLength] = useState(dictIds?.length || 0);
    const [textLength, setTextLength] = useState(textIds?.length || 0);

    const onChangeTabs = v => {
        setActiveKey(v);
    };

    return (
        <div>
            <div>
                字典选中：{dicLength} 个; 语料选中：{textLength} 个
            </div>
            <div>
                <Tabs defaultActiveKey={activeKey} onChange={onChangeTabs}>
                    <TabPane tab="字典" key="1">
                        <DicTable read setDicLength={setDicLength} />
                    </TabPane>
                    <TabPane tab="语料" key="2">
                        <TextTable read setTextLength={setTextLength} />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
}
