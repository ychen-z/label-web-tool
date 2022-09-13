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
    name: '三元组数据',
    link: '/app/data/triple',
    component: load(() => import('@/view/data-page/triple-data')),
    needAuth: false
  }
};

const { mng, Text, Tool, label, relationHandle, OriginData, TextData, EntityData, TripleData } = urlObj;

export const routes = [mng, Text, Tool, label, relationHandle, OriginData, TextData, EntityData, TripleData];
