import React, { useState } from 'react';
import { Button, Card } from 'antd';
import Loading from './model/loading';
import DataPreProcess from './model/data-pre-process';
import ManualNamed from './model/manual-named';
import TextRecognition from './model/text-recognise';
import TrainingModel from './model/training-model';
import DataExport from './model/data-export';
import './index.less';

const Btns = [
    {
        name: '加载数据/字典',
        type: 1,
        top: 0,
        status: false
    },
    {
        name: 'b',
        type: 2,
        top: 58 * 2,
        status: false
    },
    {
        name: 'c',
        type: 3,
        top: 58 * 3 + 59,
        status: false
    },
    {
        name: 'd',
        type: 4,
        top: 58 * 5 + 60,
        status: false
    },
    {
        name: 'e',
        type: 5,
        top: 58 * 7 + 61,
        status: false
    },
    {
        name: 'f',
        type: 6,
        top: 58 * 9 + 62,
        status: false
    }
];

export default function ToolPage() {
    const Dom = {
        0: <Loading />,
        1: <DataPreProcess />,
        2: <DataPreProcess />,
        3: <ManualNamed />,
        4: <TextRecognition />,
        5: <TrainingModel />,
        6: <DataExport />
    };
    const [count, setCount] = useState(0);

    // 开始流程
    const _select = (value: number) => {
        if (value == count + 1) {
            setCount(value);
        }

        if (count == 2 && value == 5) {
            setCount(value);
        }

        if (count == 5 && value == 3) {
            setCount(value);
        }
    };

    return (
        <div className="m-tool-page">
            <Card
                className="left"
                title="流程图"
                extra={
                    <div>
                        {count == 0 && (
                            <Button type="primary" onClick={() => setCount(count + 1)}>
                                开始
                            </Button>
                        )}

                        {count > 0 && (
                            <Button type="primary" onClick={() => setCount(1)}>
                                重新开始
                            </Button>
                        )}
                    </div>
                }
            >
                <div className="content">
                    {Btns.map(item => (
                        <span className={`item ${count == item.type ? 'active' : ''}`} style={{ top: item.top }} onClick={() => _select(item.type)}>
                            {item.name}
                        </span>
                    ))}
                </div>
            </Card>
            <section className="right">{Dom[count]}</section>
        </div>
    );
}
