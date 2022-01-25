import React, { useState } from 'react';
import Modal from './importModal';

const Modal2 = props => {
    const [visible, setVisible] = useState(false);
    return (
        <>
            <span role="button" onClick={() => setVisible(true)}>
                {props.children || '+新建模板'}
            </span>

            {visible && <Modal {...props} onCancel={() => setVisible(false)} />}
        </>
    );
};

export default React.memo(Modal2);
