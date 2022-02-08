import React, { useEffect, useState, useCallback } from 'react';
import { Button, Card, message } from 'antd';
import useFetch from '@/hooks/common/useFetch';
import { getTextLabelCount, getTextLabelOne, getTextLabelResult, postTextLabel } from '@/axios';
import './index.less';

/**
 *
 * @returns 打标页面
 */
export default function HandleTag() {
    const [userText, setUserText] = useState('');
    const [userKey, setUserKey] = useState('');
    const { data: textLabelCount } = useFetch(getTextLabelCount, null);
    const { data: textLabeOne, dispatch, isLoading: loadingOne } = useFetch(getTextLabelOne, null);
    const { data: textLabelResult, dispatch: dispatchGetTextLabelResult } = useFetch(getTextLabelResult, null, false);
    const { dispatch: dispatchPostTextLabel } = useFetch(postTextLabel, null, false);

    // 取一条新数据进行打标
    const getOne = () => {
        dispatch();
    };

    const handleUserKeyPress = useCallback(event => {
        const { key, keyCode, ctrlKey, altKey, shiftKey } = event;
        if (keyCode === 32 || (keyCode >= 65 && keyCode <= 90)) {
            let active = ctrlKey ? 'ctrl + ' : '';
            active = (altKey ? 'alt + ' : '') + active;
            active = (shiftKey ? 'shift + ' : '') + active;
            active = active + key;
            setUserKey(active);
        }
    }, []);

    const getSelectString = useCallback(event => {
        var selectText = window?.getSelection()?.toString();
        if (selectText) {
            setUserText(selectText);
        }
    }, []);

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
            dispatchGetTextLabelResult({ id: textLabeOne.textId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textLabeOne]);

    useEffect(() => {
        if (userText && userKey) {
            console.log('调用打标接口');
            dispatchPostTextLabel({ label: userText, keyCode: '018066', textDataId: textLabeOne.textId }).then(res => {
                message.success('打标成功！');
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userKey, userText]);

    return (
        <div className="u-handle">
            <section className="header">
                <div>
                    待打标：<span className="num">{textLabelCount?.needCount || 0}</span> 个；已打标：
                    <span className="num">{textLabelCount?.alreadyCount || 0}</span>个
                </div>
            </section>
            <section className="u-handle-area">
                <Card
                    title="打标工作区"
                    extra={
                        textLabelCount?.needCount && (
                            <Button loading={loadingOne} onClick={getOne} type="primary">
                                下一条
                            </Button>
                        )
                    }
                >
                    <div className="u-handle-area-content">{textLabeOne?.text || '获取一条新的'}</div>
                </Card>
            </section>

            {userText && (
                <section className="u-handle-result">
                    选取内容：{userText || '--'} ，快捷键：{userKey || '--'}
                </section>
            )}

            <section className="u-handle-view">
                <Card title="获取打标结果">
                    <div className="u-handle-view-content">展示打标结果 textLabelResult</div>
                </Card>
            </section>
        </div>
    );
}
