import React from 'react';
import HandleTag from '../components/handle-tag';

/**
 *
 * @returns 手工标注
 */
export default function ManualNamed() {
    return (
        <div className="m-manual-name">
            <div>手工标注</div>

            <HandleTag />
        </div>
    );
}
