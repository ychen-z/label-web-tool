import React, { useState, useEffect } from 'react';
import { Card, Tag, Button, Popconfirm, message } from 'antd';
import { GlobalContext } from '@/context';
import useFetch from '@/hooks/common/useFetch';
import { getToolState, resetCurrent, resetAll } from '@/axios';
import Loading from './model/loading';
import DataImport from './model/data-import'; // 数据导入
import DataPreProcess from './model/data-pre-process'; // 数据预处理
import ManualNamed from './model/manual-named'; // 手工标注
import TextRecognition from './model/text-recognise'; // 识别
import TrainingModel from './model/training-model'; // 训练
import DataExport from './components/data-export'; // 导出
import './index.less';

// 流程操作
const OP_BTNS = [
    {
        name: '加载数据/字典',
        type: 0,
        top: 0,
        stopArea: 0
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

const stop = {
    0: 0,
    1: 200,
    2: '100%',
    3: '100%',
    4: '100%'
};

const formatStatus = (status, step) => {
    const _status = Math.floor((status || 0) / 10);
    // 可以进行下一项
    const next = step == _status || ((step == _status + 1 || (_status == 1 && step == 4) || (_status == 4 && step == 2)) && (status || 0) % 10 == 0);
    return {
        status: _status,
        next
    };
};

export default function ToolPage() {
    const renderdom = ({ step }) => {
        const element = {
            '-1': <Loading />,
            0: <DataImport />,
            1: <DataPreProcess />,
            2: <ManualNamed />,
            3: <TrainingModel />,
            4: <TextRecognition />,
            5: null
        };
        return element[step];
    };

    const { dispatch } = useFetch(getToolState, null, false);
    const { dispatch: dispatchResetCurrent } = useFetch(resetCurrent, null, false);
    const { dispatch: dispatchResetAll } = useFetch(resetAll, null, false);
    const [count, setCount] = useState({ step: -1, active: false });
    const [statusInfo, setStatuInfo] = useState('未开始');

    // 状态跳转
    const goto = (data: any, step?: number) => {
        const { status, next } = formatStatus(data, step);
        if (!step && step != 0) {
            // 默认跳转
            setCount({ step: status, active: true });
            return false;
        } // 默认值
        setCount({ step, active: next });
    };

    // 开始流程
    const _select = (step: number, status: boolean) => {
        if (status) return;
        dispatch().then((res: any) => {
            setStatuInfo(res.msg);
            goto(res.status, step);
        });
    };

    // 更新流程状态
    const refreshState = (callback?: Function) => {
        dispatch().then((res: any) => {
            goto(res.status);
            setStatuInfo(res.msg);
            callback && callback(res);
        });
    };

    // 存储字典
    const dispatchDict = v => {
        localStorage.setItem('dictIds', v.join(','));
    };

    const dispatchText = v => {
        localStorage.setItem('textIds', v.join(','));
    };

    // 重置当前
    const _resetCurrent = v => {
        dispatchResetCurrent().then(res => {
            message.success('操作成功');
            refreshState();
        });
    };

    // 重置所有
    const _resetAll = v => {
        dispatchResetAll().then(res => {
            message.success('操作成功');
            refreshState();
        });
    };

    useEffect(() => {
        if (dispatch) {
            dispatch().then((res: any) => {
                goto(res.status);
                setStatuInfo(res.msg);
                dispatchDict(res.dictIds);
                dispatchText(res.textIds);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <GlobalContext.Provider
            value={{
                dispatchDict,
                dispatchText,
                refreshState
            }}
        >
            <div className="m-tool-page">
                <Card
                    className="left"
                    title={
                        <>
                            流程状态: <Tag color="#f5222d">{statusInfo}</Tag>
                        </>
                    }
                    extra={
                        <>
                            <Popconfirm title="重置本轮" onConfirm={_resetCurrent} okText="确定" cancelText="取消">
                                <Button type="primary">重置本轮</Button>
                            </Popconfirm>
                            <Popconfirm title="重置所有?" onConfirm={_resetAll} okText="确定" cancelText="取消">
                                <Button>重置所有</Button>
                            </Popconfirm>
                        </>
                    }
                >
                    <div className="content">
                        {OP_BTNS.map(item => (
                            <span
                                className={`item ${count.step == item.type ? 'active' : ''}`}
                                style={{
                                    top: item.top
                                }}
                                onClick={() => _select(item.type, item.status)}
                            >
                                {item.name}
                            </span>
                        ))}
                    </div>
                </Card>
                <section className="right">
                    {renderdom(count)}
                    <div className={`${count.active ? 'active' : 'stop'}`} style={{ height: stop[count.step] }} />
                </section>
            </div>
        </GlobalContext.Provider>
    );
}
