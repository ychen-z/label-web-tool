import Loadable from 'react-loadable';
import MyLoadingComponent from '@/components/common/u-loading';

const load = (loader: any) =>
    Loadable({
        loader: loader,
        loading: MyLoadingComponent
    });

export const urlObj = {
    dic: {
        name: '字典管理',
        link: '/dic',
        component: load(() => import('@/view/dic-page')),
        needAuth: false
    }
};

const { dic } = urlObj;

export const routes = [dic];
