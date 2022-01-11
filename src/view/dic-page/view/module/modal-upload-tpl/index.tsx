import React, { useState } from 'react';
import { Props } from './interface';
import Modal from './modal';

import './index.less';

const ModalAdd = (props: Props) => {
    const [visible, setVisible] = useState(false);

    return (
        <span className="m-modal-upload">
            <span role="button" onClick={() => setVisible(true)}>
                <a style={{ marginRight: '10px' }}>{props.children}</a>
            </span>

            {visible && <Modal {...props} onCancel={() => setVisible(false)} />}
        </span>
    );
};

export default React.memo(ModalAdd);
