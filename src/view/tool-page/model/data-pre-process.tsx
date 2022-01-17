import React, { useState } from 'react';
import { Button, Select, Tabs, Slider, InputNumber } from 'antd';

const { Option } = Select;
const { TabPane } = Tabs;
/**
 *
 * @returns 数据预处理
 */
export default function DataPreProcess() {
    const [modelState, setModelState] = useState('BiLSTM');
    const [activeKey, setActiveKey] = useState('1');
    const [sliderValue, setSliderValue] = useState(1);

    const onSelectModel = v => {
        setModelState(v);
    };
    const onChangeTabs = v => {
        setActiveKey(v);
    };

    const onTranning = () => {
        console.log('训练');
    };

    const onSample = () => {
        console.log('采样');
    };

    const onChangeSlider = v => {
        setSliderValue(v);
    };

    return (
        <div>
            <div>
                <Select defaultValue={modelState} value={modelState} style={{ width: 120 }} onChange={onSelectModel}>
                    <Option value="BiLSTM">BiLSTM</Option>
                </Select>

                <Slider min={1} max={100} onChange={onChangeSlider} value={sliderValue} />

                <InputNumber min={1} max={20} style={{ margin: '0 16px' }} value={sliderValue} onChange={onChangeSlider} addonAfter="%" />

                <Button type="primary" onClick={onTranning}>
                    训练
                </Button>

                <Button type="primary" onClick={onSample}>
                    采样
                </Button>
            </div>
            <div>
                <Tabs defaultActiveKey={activeKey} onChange={onChangeTabs}>
                    <TabPane tab="数据可视化" key="1">
                        数据可视化
                    </TabPane>
                    <TabPane tab="数据结果" key="2">
                        数据结果
                    </TabPane>
                    <TabPane tab="字典匹配" key="3">
                        字典匹配
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
}
