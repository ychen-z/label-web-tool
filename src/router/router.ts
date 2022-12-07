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
    needAuth: false
  },

  label: {
    name: '标签',
    link: '/app/graph/label',
    component: load(() => import('@/view/label-page')),
    needAuth: false
  },

  Tool: {
    name: '实体抽取',
    link: '/app/graph/tool/:type',
    component: load(() => import('@/view/tool-page')),
    needAuth: false
  },

  OriginData: {
    name: '原始数据',
    link: '/app/data/origin',
    component: load(() => import('@/view/data-page/origin-data')),
    needAuth: false
  },

  TextData: {
    name: '文本数据',
    link: '/app/data/text',
    component: load(() => import('@/view/data-page/text-data')),
    needAuth: false
  },
  EntityData: {
    name: '实体数据',
    link: '/app/data/entity',
    component: load(() => import('@/view/data-page/entity-data')),
    needAuth: false
  },
  TripleData: {
    name: '关系数据',
    link: '/app/data/triple',
    component: load(() => import('@/view/data-page/triple-data')),
    needAuth: false
  },
  DeviceData: {
    name: '设备树数据',
    link: '/app/data/device',
    component: load(() => import('@/view/data-page/device-data')),
    needAuth: false
  },

  DeviceTree: {
    name: '设备树数据',
    link: '/app/device/tree',
    component: load(() => import('@/view/data-page/device-tree')),
    needAuth: false
  },

  GraphPage: {
    name: '图谱',
    link: '/app/graph/page',
    component: load(() => import('@/view/use-page/graph-page')),
    needAuth: false
  },

  GraphRelation: {
    name: '关系图谱',
    link: '/app/graph/relation',
    component: load(() => import('@/view/data-page/add-tree-data')),
    needAuth: false
  },

  HighSearch: {
    name: '智能检索',
    link: '/app/high/search',
    component: load(() => import('@/view/use-page/search/index')),
    needAuth: false
  },
  HighFault: {
    name: '故障查询',
    link: '/app/high/fault',
    component: load(() => import('@/view/use-page/fault/index')),
    needAuth: false
  },
  HighExpert: {
    name: '智能检索',
    link: '/app/high/expert',
    component: load(() => import('@/view/use-page/expert/index')),
    needAuth: false
  }
};

const {
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
  GraphRelation
];
