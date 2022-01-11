import { ReactNode } from 'react';
import { TemplateItem } from '@/axios/interface';

export interface Props extends Partial<TemplateItem> {
    callback?: Function;
    children?: ReactNode;
    onCancel?: Function;
}
