import Loadable from 'react-loadable';
import MyLoadingComponent from '@/components/common/u-loading';

const load = (loader: any) =>
    Loadable({
        loader: loader,
        loading: MyLoadingComponent
    });

export const urlObj = {
    mng: {
        name: '管理',
        link: '/app/mng/:type',
        component: load(() => import('@/view/dic-page')),
        needAuth: false
    },

    Text: {
        name: '语料',
        link: '/app/text/:type',
        component: load(() => import('@/view/text-page')),
        needAuth: false
    },

    label: {
        name: '实体',
        link: '/app/label',
        component: load(() => import('@/view/label-page')),
        needAuth: false
    },

    toolHandle: {
        name: '实体抽取',
        link: '/app/tool-handle',
        component: load(() => import('@/view/tool-page')),
        needAuth: false
    },

    relationHandle: {
        name: '关系抽取',
        link: '/app/rel-handle',
        component: load(() => import('@/view/relation-dic-page')),
        needAuth: false
    }
};

const { mng, Text, toolHandle, label, relationHandle } = urlObj;

export const routes = [mng, Text, toolHandle, label, relationHandle];
