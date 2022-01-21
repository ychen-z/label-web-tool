import React, { useEffect, useState, useCallback } from 'react';
import './index.less';

/**
 *
 * @returns 打标页面
 */
export default function HandleTag() {
    const [userText, setUserText] = useState('');
    const [userKey, setUserKey] = useState('');
    const handleUserKeyPress = useCallback(event => {
        const { key, keyCode, ctrlKey, altKey, shiftKey } = event;
        if (keyCode === 32 || (keyCode >= 65 && keyCode <= 90)) {
            let active = ctrlKey ? 'ctrl + ' : '';
            active = (altKey ? 'alt + ' : '') + active;
            active = (shiftKey ? 'shift + ' : '') + active;
            active = active + key;
            setUserKey(prevUserText => `${prevUserText}${active}`);
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

    return (
        <div className="u-handle">
            <section className="u-handle-area">打标操作区域</section>
            <section className="u-handle-result">
                打标展示区域 {userText} {userKey}
            </section>
        </div>
    );
}
