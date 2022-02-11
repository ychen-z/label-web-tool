import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Button, Card, message, Tag, Alert } from 'antd';
import useFetch from '@/hooks/common/useFetch';
import DicTable from '@/view/dic-page';
import { getTextLabelCount, getTextLabelOne, getTextLabelResult, postTextLabel, delTextLabel } from '@/axios';
import './index.less';

/**
 *
 * @returns 打标页面
 */
export default function HandleTag() {
    const [userText, setUserText] = useState<string>('');
    const [userKey, setUserKey] = useState<string>('');
    const keycodeRef = useRef<string>();
    const { data: textLabelCount, dispatch: dispatchGetTextLabelCount } = useFetch(getTextLabelCount, null);
    const { data: textLabeOne, dispatch: dispatchGetTextLabelOne, isLoading: loadingOne } = useFetch(getTextLabelOne, null, false);
    const { data: textLabelResult, dispatch: dispatchGetTextLabelResult } = useFetch(getTextLabelResult, null, false);
    const { dispatch: dispatchPostTextLabel } = useFetch(postTextLabel, null, false);
    const { dispatch: dispatchDelLabel } = useFetch(delTextLabel, null, false);

    // 取一条新数据进行打标
    const getOne = () => {
        setUserText('');
        setUserKey('');
        dispatchGetTextLabelOne({
            type: localStorage.getItem('labelState') || 'pre' // pre 预处理， model 识别后
        }); // 取一条新数据
        dispatchGetTextLabelCount(); // 重新获取数量
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
        console.log(data);
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

    useEffect(() => {
        window.addEventListener('keyup', handleUserKeyPress);
        window.addEventListener('mouseup', getSelectString);
        return () => {
            window.removeEventListener('keyup', handleUserKeyPress);
            window.removeEventListener('mouseup', getSelectString);
        };
    }, [getSelectString, handleUserKeyPress]);

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
                setUserText('');
                setUserKey('');
                dispatchGetTextLabelResult({ id: textLabeOne.id });
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userKey, userText]);

    return (
        <div className="u-handle">
            <section className="header">
                <Alert message={`待打标：${textLabelCount?.needCount || 0}个；已打标：${textLabelCount?.alreadyCount || 0}个`} type="success" />
            </section>
            <div className="tag">
                字典标签：
                <DicTable read type="tag" />
            </div>
            <section className="u-handle-area">
                <Card
                    title={<strong>打标工作区</strong>}
                    extra={
                        textLabelCount?.needCount && (
                            <Button loading={loadingOne} onClick={getOne} type="primary">
                                下一条
                            </Button>
                        )
                    }
                >
                    <div className="u-handle-area-content">{textLabeOne?.text || <span style={{ color: '#999' }}>取一条新数据吧 ~</span>}</div>
                </Card>
            </section>

            {userText && (
                <section className="u-handle-result">
                    选取的内容：<span>{userText || '--'}</span> ，快捷键：<span>{userKey || '--'}</span>
                </section>
            )}

            <section className="u-handle-view">
                <Card title={<strong>打标结果</strong>}>
                    <div className="u-handle-view-content">{formatData(textLabelResult?.content)}</div>
                </Card>
            </section>
        </div>
    );
}
