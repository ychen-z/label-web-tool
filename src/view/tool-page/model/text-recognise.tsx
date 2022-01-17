import React, { useState } from 'react';
import { Button, Select } from 'antd';

const { Option } = Select;
/**
 *
 * @returns 语料识别
 */
export default function TextRecognition() {
    const [modelState, setModelState] = useState('BiLSTM');
    const onSelectModel = v => {
        setModelState(v);
    };
    const onSample = () => {
        console.log('采样');
    };
    const onReText = () => {
        console.log('识别');
    };

    return (
        <div>
            <div onClick={onSample}>
                <Select defaultValue={modelState} value={modelState} style={{ width: 120 }} onChange={onSelectModel}>
                    <Option value="BiLSTM">BiLSTM</Option>
                </Select>
                <Button type="primary">采样</Button>
            </div>

            <div onClick={onReText}>
                <Button type="primary">识别</Button>
            </div>
            <div>内容展示</div>
        </div>
    );
}
