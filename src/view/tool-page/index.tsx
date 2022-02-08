import React, { useState } from 'react';
import { Card } from 'antd';
import { GlobalContext } from '@/context';
import Loading from './model/loading';
import DataImport from './model/data-import'; // 数据导入
import DataPreProcess from './model/data-pre-process'; // 数据预处理
import ManualNamed from './model/manual-named'; // 手工标注
import TextRecognition from './model/text-recognise'; // 识别
import TrainingModel from './model/training-model'; // 训练
import DataExport from './components/data-export'; // 导出
import './index.less';

const Btns = [
    {
        name: '加载数据/字典',
        type: 1,
        top: 0
    },
    {
        name: '数据预处理',
        type: 2,
        top: 58 * 2
    },
    {
        name: '手工标注',
        type: 3,
        top: 58 * 3 + 59
    },
    {
        name: '训练模型',
        type: 4,
        top: 58 * 5 + 60
    },
    {
        name: '语料识别',
        type: 5,
        top: 58 * 7 + 61
    },
    {
        name: <DataExport />,
        type: 6,
        top: 58 * 9 + 62,
        status: true // 当前模块不渲染
    }
];

export default function ToolPage() {
    const Dom = {
        0: <Loading />,
        1: <DataImport />,
        2: <DataPreProcess />,
        3: <ManualNamed />,
        4: <TrainingModel />,
        5: <TextRecognition />,
        6: null
    };

    const [count, setCount] = useState(3);

    // 开始流程
    const _select = (value: number, status: boolean) => {
        if (!status) {
            setCount(value);
        }

        // if (value == count + 1) {
        //     setCount(value);
        // }

        // if (count == 2 && value == 5) {
        //     setCount(value);
        // }

        // if (count == 5 && value == 3) {
        //     setCount(value);
        // }
    };

    const dispatchDict = v => {
        localStorage.setItem('dictIds', v.join(',')); //存储
    };

    const dispatchText = v => {
        localStorage.setItem('textIds', v.join(',')); //存储
    };

    return (
        <GlobalContext.Provider value={{ dispatchDict, dispatchText }}>
            <div className="m-tool-page">
                <Card className="left" title="流程图">
                    <div className="content">
                        {Btns.map(item => (
                            <span
                                className={`item ${count == item.type ? 'active' : ''}`}
                                style={{ top: item.top }}
                                onClick={() => _select(item.type, item.status)}
                            >
                                {item.name}
                            </span>
                        ))}
                    </div>
                </Card>
                <section className="right">{Dom[count]}</section>
            </div>
        </GlobalContext.Provider>
    );
}
