import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import DrawLine from './draw-line';
import { connect } from './tools';
import './index.less';

export default function RelationDicPage(props) {
    const { entitys, relations } = props;
    const [first, setFirst] = useState(null);
    const [second, setSecond] = useState(null);
    const FirstRef = useRef(null);
    const SecondRef = useRef(null);
    const [activeRelation, setActiveRelation] = useState(null);

    const handleConnect = () => {
        setActiveRelation(connect(FirstRef.current, SecondRef.current, 'green', 1));
        setTimeout(() => {
            setFirst('');
            setSecond('');
        }, 10000);
    };

    useEffect(() => {
        if (first && second) {
            handleConnect();
        }
    }, [first, second]);

    return (
        <div className="u-handle--relaiton-label">
            <section>
                {entitys?.map(item => (
                    <div key={item.id} className="item">
                        <div
                            className={classNames('f1', 'cyan', { active: item.label == first })}
                            onClick={e => {
                                FirstRef.current = e.target;
                                setFirst(item.label);
                            }}
                        >
                            {item.label}
                        </div>

                        <div
                            className={classNames('f1', 'blue', { active: item.label == second })}
                            onClick={e => {
                                SecondRef.current = e.target;
                                setSecond(item.label);
                            }}
                        >
                            {item.label}
                        </div>
                    </div>
                ))}
            </section>
            <section>
                <div>
                    <div>
                        选中头实体：{first} ；--------- 选中尾实体：{second}
                    </div>

                    {!!relations?.length &&
                        relations.map(item => (
                            <div className="u-desc" style={{ color: item.color }}>
                                <span className="title">头实体: </span>
                                {item.headEntity}； <span className="title">尾实体: </span>
                                {item.tailEntity}；<span className="title">关系: </span> {item.dictName}
                            </div>
                        ))}
                </div>
            </section>
            <section>
                {relations?.map(item => (
                    <DrawLine {...activeRelation} />
                ))}

                <DrawLine {...activeRelation} />
            </section>
        </div>
    );
}
