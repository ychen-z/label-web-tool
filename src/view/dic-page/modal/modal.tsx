import React, { useState } from 'react';
import Modal from './import-modal';

const ModalAdd = props => {
    const [visible, setVisible] = useState(false);
    return (
        <span className="m-modal-add">
            <span role="button" onClick={() => setVisible(true)}>
                {props.children || '+新建模板'}
            </span>

            {visible && <Modal {...props} onCancel={() => setVisible(false)} />}
        </span>
    );
};

export default React.memo(ModalAdd);
