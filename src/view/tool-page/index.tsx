import React, { useState, useEffect } from 'react';
import { Card, message } from 'antd';
import { GlobalContext } from '@/context';
import useFetch from '@/hooks/common/useFetch';
import { getToolState } from '@/axios';
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
        type: 0,
        top: 0
    },
    {
        name: '数据预处理',
        type: 1,
        top: 58 * 2
    },
    {
        name: '手工标注',
        type: 2,
        top: 58 * 3 + 59
    },
    {
        name: '训练模型',
        type: 3,
        top: 58 * 5 + 60
    },
    {
        name: '语料识别',
        type: 4,
        top: 58 * 7 + 61
    },
    {
        name: <DataExport />,
        type: 5,
        top: 58 * 9 + 62,
        status: true // 当前模块不渲染
    }
];

const formatStatus = status => Math.floor((status || 0) / 10);

export default function ToolPage() {
    const Dom = {
        '-1': <Loading />,
        0: <DataImport />,
        1: <DataPreProcess />,
        2: <ManualNamed />,
        3: <TrainingModel />,
        4: <TextRecognition />,
        5: null
    };

    const { data, dispatch } = useFetch(getToolState, null);
    const [count, setCount] = useState(-1);

    // 开始流程
    const _select = (value: number, status: boolean) => {
        if (status) return;
        dispatch().then(res => {
            if (formatStatus(res.status) == value) {
                if (value == count + 1) {
                    setCount(value);
                }

                if (count == 1 && value == 4) {
                    setCount(value);
                }

                if (count == 4 && value == 2) {
                    setCount(value);
                }
            } else {
                message.warning('请按正确流程进行');
            }
        });
    };

    const dispatchDict = v => {
        localStorage.setItem('dictIds', v.join(',')); //存储
    };

    const dispatchText = v => {
        localStorage.setItem('textIds', v.join(',')); //存储
    };

    useEffect(() => {
        if (data) {
            setCount(formatStatus(data.status));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

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
