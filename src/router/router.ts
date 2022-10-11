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

  Tool: {
    name: '实体抽取',
    link: '/app/tool/:type',
    component: load(() => import('@/view/tool-page')),
    needAuth: false
  },

  relationHandle: {
    name: '关系抽取',
    link: '/app/rel-handle',
    component: load(() => import('@/view/relation')),
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
    name: '图谱可视化',
    link: '/app/graph',
    component: load(() => import('@/view/graph-page/index')),
    needAuth: false
  },

  HighGraphPage: {
    name: '图谱高级应用',
    link: '/app/high',
    component: load(() => import('@/view/high-graph-page/index')),
    needAuth: false
  }
};

const {
  mng,
  Text,
  Tool,
  label,
  relationHandle,
  OriginData,
  TextData,
  EntityData,
  TripleData,
  DeviceData,
  GraphPage,
  HighGraphPage,
  DeviceTree
} = urlObj;

export const routes = [
  mng,
  Text,
  Tool,
  label,
  relationHandle,
  OriginData,
  TextData,
  EntityData,
  TripleData,
  DeviceData,
  GraphPage,
  HighGraphPage,
  DeviceTree
];
