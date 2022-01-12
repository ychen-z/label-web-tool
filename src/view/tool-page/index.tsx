import React, { useState } from 'react';
import './index.less';

const Btns = [
    {
        name: 'a',
        type: 'A',
        top: 0
    },
    {
        name: 'b',
        type: 'B',
        top: 100
    },
    {
        name: 'c',
        type: 'C',
        top: 200
    },
    {
        name: 'd',
        type: 'D',
        top: 300
    },
    {
        name: 'e',
        type: 'E',
        top: 400
    },
    {
        name: 'f',
        type: 'F',
        top: 500
    }
];
export default function ToolPage() {
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
            <section className="right">右边 {state}</section>
        </div>
    );
}
