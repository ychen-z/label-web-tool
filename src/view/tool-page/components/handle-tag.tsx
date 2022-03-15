import React, { useEffect, useState, useCallback, useRef, useContext } from 'react';
import { Button, Card, message, Tag, Alert, Progress } from 'antd';
import { GlobalContext } from '@/context';
import useFetch from '@/hooks/common/useFetch';
import DicTable from '@/view/dic-page';
import {
    getTextLabelCount,
    getTextLabelPreOne,
    getTextLabelNextOne,
    getTextLabelResult,
    postTextLabel,
    delTextLabel,
    getHistoryRates
} from '@/axios';
import './index.less';

/**
 *
 * @returns 打标页面
 */
export default function HandleTag() {
    const { refreshState } = useContext(GlobalContext);
    const [userText, setUserText] = useState<string>('');
    const [userKey, setUserKey] = useState<string>('');
    const [textLabeOne, setTextLableOne] = useState();
    const keycodeRef = useRef<string>();
    const { data: historyRateData = [] } = useFetch(getHistoryRates, null); // 轮次
    const { data: textLabelCount, dispatch: dispatchGetTextLabelCount } = useFetch(getTextLabelCount, null, false);
    const { dispatch: dispatchPreone, isLoading: preLoading } = useFetch(getTextLabelPreOne, null, false);
    const { dispatch: dispatchNextone, isLoading: nextLoading } = useFetch(getTextLabelNextOne, null, false);
    const { data: textLabelResult, dispatch: dispatchGetTextLabelResult } = useFetch(getTextLabelResult, null, false);
    const { dispatch: dispatchPostTextLabel } = useFetch(postTextLabel, null, false);
    const { dispatch: dispatchDelLabel } = useFetch(delTextLabel, null, false);

    // 取一条新数据进行打标
    const getOne = type => {
        setUserText('');
        setUserKey('');
        refreshState();
        type === 'NEXT' &&
            dispatchNextone({
                id: textLabeOne?.id
            }).then(res => {
                setTextLableOne(res);
            });

        type === 'PRE' &&
            dispatchPreone({
                id: textLabeOne?.id
            }).then(res => {
                setTextLableOne(res);
            });

        dispatchGetTextLabelCount(); // 重新获取数量
        // eslint-disable-next-line react-hooks/exhaustive-deps
    };

    // 校对接口
    const check = () => {
        dispatchPostTextLabel({ textDataId: textLabeOne.id }).then(res => {
            message.success('校对通过');
            getOne('NEXT');
        });
    };

    const handleUserKeyPress = useCallback(event => {
        const { key, keyCode, ctrlKey, altKey, shiftKey } = event;
        if (keyCode === 32 || (keyCode >= 65 && keyCode <= 90)) {
            let active = ctrlKey ? 'ctrl + ' : '';
            active = (altKey ? 'alt + ' : '') + active;
            active = (shiftKey ? 'shift + ' : '') + active;
            active = active + key;

            let activeCode = ctrlKey ? '018' : '';
            activeCode = (altKey ? '019' : '') + activeCode;
            activeCode = (shiftKey ? '017' : '') + activeCode;

            keycodeRef.current = activeCode + '0' + keyCode;
            setUserKey(active);
        }
    }, []);

    const getSelectString = useCallback(event => {
        function getSelectedNode() {
            if (document.selection) return document.selection.createRange().parentElement();
            else {
                var selection = window.getSelection();
                if (selection.rangeCount > 0) return selection.getRangeAt(0).startContainer.parentNode;
            }
        }
        var selectText = window?.getSelection()?.toString();
        if (selectText && 'u-handle-area-content' === getSelectedNode().className) {
            setUserText(selectText);
        }
    }, []);

    const formatData = (data = []) => {
        if (!data.length) return <>暂无数据</>;
        const groupByCategory = data.reduce((group, product) => {
            const { dictName } = product;
            group[dictName] = group[dictName] ?? [];
            group[dictName].push(product);
            return group;
        }, {});

        return Object.keys(groupByCategory).map(item => {
            return (
                <div className="list">
                    <span className="title">{item} :</span>
                    {groupByCategory[item].map(items => {
                        const close = id => {
                            dispatchDelLabel(id).then(res => {
                                message.success('删除成功');
                            });
                        };
                        return (
                            <Tag key={items.id} color={items.color} closable onClose={() => close(items.id)}>
                                {items.label}
                            </Tag>
                        );
                    })}
                </div>
            );
        });
    };

    // 渲染消息栏
    const renderMessage = data => {
        let percent = 0;
        if (data?.sumCount) {
            percent = ((data?.alreadyCount / data?.sumCount) * 100).toFixed(1);
        }

        return (
            <>
                当前是第{(historyRateData?.length || 0) + 1}轮: (待打标：{data?.needCount || 0}个；已打标：{data?.alreadyCount || 0}个；总量：
                {data?.sumCount || 0}个 ;)
                <div style={{ display: 'flex', marginTop: 8 }}>
                    <span style={{ width: 106 }}>整体完成进度：</span>
                    <Progress style={{ flex: 1 }} percent={percent} size="small" />
                </div>
            </>
        );
    };

    useEffect(() => {
        getOne('NEXT'); // 取一条新数据
        window.addEventListener('keyup', handleUserKeyPress);
        window.addEventListener('mouseup', getSelectString);
        return () => {
            window.removeEventListener('keyup', handleUserKeyPress);
            window.removeEventListener('mouseup', getSelectString);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (textLabeOne) {
            dispatchGetTextLabelResult({ id: textLabeOne.id });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textLabeOne]);

    useEffect(() => {
        if (userText && userKey) {
            console.log('调用打标接口');
            dispatchPostTextLabel({ label: userText, keyCode: keycodeRef.current, textDataId: textLabeOne.id }).then(res => {
                message.success('打标成功！');
                const temp = {
                    ...textLabeOne,
                    textMark: textLabeOne.textMark.replaceAll(res.label, `<font color=${res.color}>${res.label}</font>`)
                };
                setTextLableOne(temp);
                setUserText('');
                setUserKey('');
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userKey, userText]);

    return (
        <div className="u-handle">
            <section className="header">
                <Alert message={renderMessage(textLabelCount)} type="success" />
            </section>
            <DicTable read type="tag" />
            <section className="u-handle-area">
                <Card
                    title={<strong>打标工作区</strong>}
                    extra={
                        <>
                            {!!textLabelCount?.needCount && (
                                <Button loading={preLoading} onClick={() => getOne('PRE')} type="primary">
                                    上一条
                                </Button>
                            )}

                            {!!textLabelCount?.needCount && (
                                <Button loading={nextLoading} onClick={() => getOne('NEXT')} type="primary">
                                    下一条
                                </Button>
                            )}

                            {!!textLabelCount?.needCount && (
                                <Button title="该条数据不需要打标" onClick={check} type="primary">
                                    校对
                                </Button>
                            )}
                        </>
                    }
                >
                    <div className="u-handle-area-content" dangerouslySetInnerHTML={{ __html: textLabeOne?.textMark }} />
                </Card>
            </section>
            <section className="u-handle-view">
                <Card title={<strong>打标结果</strong>}>
                    <div className="u-handle-view-content">{formatData(textLabelResult?.content)}</div>
                </Card>
            </section>
        </div>
    );
}
