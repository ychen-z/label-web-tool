import Loadable from 'react-loadable';
import MyLoadingComponent from '@/components/common/u-loading';

const load = (loader: any) =>
    Loadable({
        loader: loader,
        loading: MyLoadingComponent
    });

export const urlObj = {
    dic: {
        name: '管理',
        link: '/app/mng/:type',
        component: load(() => import('@/view/dic-page')),
        needAuth: false
    },

    // dicText: {
    //     name: '字典语料',
    //     link: '/app/dic-text',
    //     component: load(() => import('@/view/text-page')),
    //     needAuth: false
    // },

    relation: {
        name: '关系管理',
        link: '/app/rel',
        component: load(() => import('@/view/dic-page')),
        needAuth: false
    },

    relationText: {
        name: '关系语料',
        link: '/app/rel-text',
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

const { dic, relation, relationText, toolHandle, label, relationHandle } = urlObj;

export const routes = [dic, relation, relationText, toolHandle, label, relationHandle];
