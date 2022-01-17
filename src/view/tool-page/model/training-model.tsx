import React, { useState } from 'react';
import { Button, Select } from 'antd';

const { Option } = Select;
/**
 *
 * @returns 模型训练
 */
export default function TrainingModel() {
    const [modelState, setModelState] = useState('BiLSTM');

    const onSelectModel = v => {
        setModelState(v);
    };

    const onTranning = () => {
        console.log('训练');
    };

    return (
        <div>
            <div>
                <Select defaultValue={modelState} value={modelState} style={{ width: 120 }} onChange={onSelectModel}>
                    <Option value="BiLSTM">BiLSTM</Option>
                </Select>
                <Button type="primary" onClick={onTranning}>
                    训练
                </Button>
            </div>
            <div>内容展示</div>
        </div>
    );
}
