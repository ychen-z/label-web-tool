import { ReactNode } from 'react';
import { ModalProps } from 'antd/lib/modal';

export interface Props extends ModalProps {
    children?: ReactNode;
    warnText?: ReactNode;
    cancelSecondConfirm?: boolean;
    cancelSecondConfirmText?: string;
}
