import { MenuItemType } from './interface';

const MENU_MAP: MenuItemType[] = [
  {
    id: 5,
    name: '文件管理',
    link: '/app/data',
    // icon: 'icon-shiti',
    icon: 'icon-yuliao',
    children: [
      {
        id: 50,
        parentId: 5,
        name: '原始数据',
        link: '/app/data/origin'
      },
      {
        id: 51,
        parentId: 5,
        name: '文本数据',
        link: '/app/data/text'
      },
      {
        id: 52,
        parentId: 5,
        name: '实体数据',
        link: '/app/data/entity'
      },
      {
        id: 53,
        parentId: 5,
        name: '关系数据',
        link: '/app/data/triple'
      },
      {
        id: 54,
        parentId: 5,
        name: '设备树数据',
        link: '/app/data/device'
      }
    ]
  },
  {
    id: 6,
    name: '图谱构建',
    link: '/app/graph',
    icon: 'icon-shujuzidian',
    children: [
      {
        id: 60,
        parentId: 6,
        name: '实体抽取',
        link: '/app/graph/mng',
        children: [
          {
            id: 600,
            parentId: 60,
            name: '实体字典',
            link: '/app/graph/mng/dic'
          },
          {
            id: 601,
            parentId: 60,
            name: '实体语料',
            link: '/app/graph/text/dic'
          },
          {
            id: 602,
            parentId: 60,
            name: '实体发现',
            link: '/app/graph/tool/dic'
          }
        ]
      },
      {
        id: 61,
        name: '关系抽取',
        parentId: 6,
        link: '/app/graph/text',
        children: [
          {
            id: 610,
            name: '关系字典',
            parentId: 61,
            link: '/app/graph/mng/rel'
          },
          {
            id: 611,
            parentId: 61,
            name: '关系语料',
            link: '/app/graph/text/rel'
          },
          {
            id: 612,
            parentId: 61,
            name: '关系发现',
            link: '/app/graph/tool/rel'
          }
        ]
      },
      {
        id: 63,
        name: '设备树',
        parentId: 6,
        link: '/app/device',
        children: [
          {
            id: 631,
            name: '设备树构建',
            parentId: 63,
            link: '/app/graph/relation?type=EQUIPMENT'
          },
          {
            id: 630,
            name: '设备树查看',
            parentId: 63,
            link: '/app/device/tree'
          }
        ]
      },
      {
        id: 64,
        name: '图谱',
        parentId: 6,
        link: '/app/graph',
        children: [
          {
            id: 641,
            name: '图谱构建',
            parentId: 64,
            link: '/app/graph/relation?type=RELATION_CORPUS'
          },
          {
            id: 640,
            name: '图谱查看',
            parentId: 64,
            link: '/app/graph/page'
          }
        ]
      }
    ]
  },
  {
    id: 7,
    name: '高级应用',
    link: '/app/high',
    icon: 'icon-shiti',
    children: [
      {
        id: 70,
        parentId: 7,
        name: '智能检索',
        link: '/app/high/search'
      },
      {
        id: 71,
        parentId: 7,
        name: '故障查询',
        link: '/app/high/fault'
      },
      {
        id: 72,
        parentId: 7,
        name: '专家知识入库',
        link: '/app/high/expert'
      }
    ]
  }
];

export default MENU_MAP;
