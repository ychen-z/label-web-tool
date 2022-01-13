import React, { useState } from 'react';
import DataPreProcess from './model/data-pre-process';
import './index.less';

export default function ToolPage() {
    const Btns = [
        {
            name: '加载数据/字典',
            type: 'A',
            top: 0
        },
        {
            name: 'b',
            type: 'B',
            top: 58 * 2
        },
        {
            name: 'c',
            type: 'C',
            top: 58 * 3 + 59
        },
        {
            name: 'd',
            type: 'D',
            top: 58 * 5 + 60
        },
        {
            name: 'e',
            type: 'E',
            top: 58 * 7 + 61
        },
        {
            name: 'f',
            type: 'F',
            top: 58 * 9 + 62
        }
    ];

    const Dom = {
        A: <DataPreProcess />
    };
    const [state, setState] = useState('A');
    return (
        <div className="m-tool-page">
            <section className="left">
                <div className="content">
                    {Btns.map(item => (
                        <span className={`item ${state == item.type ? 'active' : ''}`} style={{ top: item.top }} onClick={() => setState(item.type)}>
                            {item.name}
                        </span>
                    ))}
                </div>
            </section>
            <section className="right">右边 {Dom[state]}</section>
        </div>
    );
}
