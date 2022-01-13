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
        link: '/app/dic',
        component: load(() => import('@/view/dic-page')),
        needAuth: false
    },
    label: {
        name: '字典管理',
        link: '/app/label',
        component: load(() => import('@/view/label-page')),
        needAuth: false
    },
    tool: {
        name: '字典管理',
        link: '/app/tool',
        component: load(() => import('@/view/tool-page')),
        needAuth: false
    }
};

const { dic, tool, label } = urlObj;

export const routes = [dic, tool, label];
