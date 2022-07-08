import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { connect, relations, relationsNames } from './constan';
import './index.less';

export default function RelationDicPage() {
    const [first, setFirst] = useState(null);
    const [second, setSecond] = useState(null);
    const FirstRef = useRef(null);
    const SecondRef = useRef(null);

    const handleConnect = (first, second) => {
        setTimeout(() => {
            setFirst("")
            setSecond("")
        }, 1000);
    };

    useEffect(() => {
        if (first && second) {
            handleConnect(first, second );
        }
    }, [first, second]);

    return (
        <div>
            <section className="content">
                <div className="left">
                    <div>第一层级</div>
                    {relationsNames.map(item => (
                        <div
                            key={item}
                            className={classNames('item', 'cyan', { active: item == first })}
                            onClick={(e) => {
                                FirstRef.current = e.target
                                setFirst(item);
                            }}
                        >
                            {item}
                        </div>
                    ))}
                </div>
                <div className="right">
                    <div>第2层级</div>
                    {relationsNames.map(item => (
                        <div
                            className={classNames('item', 'blue', { active: item == second })}
                            key={item}
                            onClick={() => {
                                SecondRef.current = e.target;
                                setSecond(item);
                            }}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </section>
            <section>
                <div>关系</div>
                <div>
                    {first} - {second}
                </div>
            </section>
        </div>
    );
}
