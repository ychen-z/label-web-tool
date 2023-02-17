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
    link: '/app/graph/mng/:type',
    component: load(() => import('@/view/dic-page')),
    needAuth: false
  },

  Text: {
    name: '语料',
    link: '/app/graph/text/:type',
    component: load(() => import('@/view/text-page')),
    needAuth: [1, 2, 3]
  },

  label: {
    name: '标签',
    link: '/app/graph/label',
    component: load(() => import('@/view/label-page')),
    needAuth: [1, 2, 3]
  },

  Tool: {
    name: '实体抽取',
    link: '/app/graph/tool/:type',
    component: load(() => import('@/view/tool-page')),
    needAuth: [1, 2, 3]
  },

  OriginData: {
    name: '原始数据',
    link: '/app/data/origin',
    component: load(() => import('@/view/data-page/origin-data')),
    needAuth: [1, 2, 3]
  },

  TextData: {
    name: '文本数据',
    link: '/app/data/text',
    component: load(() => import('@/view/data-page/text-data')),
    needAuth: [1, 2, 3]
  },
  EntityData: {
    name: '实体数据',
    link: '/app/data/entity',
    component: load(() => import('@/view/data-page/entity-data')),
    needAuth: [1, 2, 3]
  },
  TripleData: {
    name: '关系数据',
    link: '/app/data/triple',
    component: load(() => import('@/view/data-page/triple-data')),
    needAuth: [1, 2, 3]
  },
  DeviceData: {
    name: '设备树数据',
    link: '/app/data/device',
    component: load(() => import('@/view/data-page/device-data')),
    needAuth: [1, 2, 3]
  },

  DeviceTree: {
    name: '设备树数据',
    link: '/app/device/tree',
    component: load(() => import('@/view/data-page/device-tree')),
    needAuth: [1, 2, 3]
  },

  GraphPage: {
    name: '图谱',
    link: '/app/graph/page',
    component: load(() => import('@/view/use-page/graph-page')),
    needAuth: [1, 2, 3]
  },

  GraphRelation: {
    name: '关系图谱',
    link: '/app/graph/relation',
    component: load(() => import('@/view/data-page/add-tree-data')),
    needAuth: [1, 2, 3]
  },

  HighSearch: {
    name: '智能检索',
    link: '/app/high/search',
    component: load(() => import('@/view/use-page/search/index')),
    needAuth: [1, 2, 3]
  },
  HighFault: {
    name: '故障查询',
    link: '/app/high/fault',
    component: load(() => import('@/view/use-page/fault/index')),
    needAuth: [1, 2, 3]
  },
  HighExpert: {
    name: '智能检索',
    link: '/app/high/expert',
    component: load(() => import('@/view/use-page/expert/index')),
    needAuth: [1, 2, 3]
  },
  Login: {
    name: '登录',
    link: '/caslogin',
    component: load(() => import('@/view/cas-login')),
    needAuth: [1, 2, 3]
  }
};

const {
  mng,
  Text,
  Tool,
  label,
  Login,
  OriginData,
  TextData,
  EntityData,
  TripleData,
  DeviceData,
  GraphPage,
  // HighGraphPage,
  HighSearch,
  HighFault,
  HighExpert,
  DeviceTree,
  GraphRelation
} = urlObj;

export const routes = [
  mng,
  Text,
  Tool,
  label,
  OriginData,
  TextData,
  EntityData,
  TripleData,
  DeviceData,
  GraphPage,
  // HighGraphPage,
  HighSearch,
  HighFault,
  HighExpert,
  DeviceTree,
  GraphRelation,
  Login
];
