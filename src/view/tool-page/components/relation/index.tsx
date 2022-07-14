import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import DrawLine from './draw-line';
import { connect } from './tools';
import './index.less';

export default function RelationDicPage(props) {
    const { entitys, relations, handleReationsLabel } = props;
    const [first, setFirst] = useState(null);
    const [second, setSecond] = useState(null);
    const FirstRef = useRef(null);
    const SecondRef = useRef(null);
    const [activeRelation, setActiveRelation] = useState(null);

    const handleConnect = () => {
        setActiveRelation(connect(FirstRef.current, SecondRef.current, 'green', 1));
        handleReationsLabel(first.id, second.id);

        setTimeout(() => {
            setFirst(null);
            setSecond(null);
        }, 10000);
    };

    useEffect(() => {
        if (first && second) {
            handleConnect();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [first, second]);

    return (
        <div className="u-handle--relaiton-label">
            <section>
                {entitys?.map(item => (
                    <div key={item.id} className="item">
                        <div
                            className={classNames('f1', 'cyan', { active: item.label == first?.label })}
                            onClick={e => {
                                FirstRef.current = e.target;
                                setFirst(item);
                            }}
                        >
                            {item.label}
                        </div>

                        <div
                            className={classNames('f1', 'blue', { active: item.label == second?.label })}
                            onClick={e => {
                                SecondRef.current = e.target;
                                setSecond(item);
                            }}
                        >
                            {item.label}
                        </div>
                    </div>
                ))}
            </section>
            <section>
                选中头实体：{first?.label} ；--------- 选中尾实体：{second?.label}
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
