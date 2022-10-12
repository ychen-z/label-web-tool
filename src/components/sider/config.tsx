import { MenuItemType } from './interface';

const MENU_MAP: MenuItemType[] = [
  // {
  //   id: 1,
  //   name: '字典管理',
  //   link: '/app/mng',
  //   icon: 'icon-shujuzidian',
  //   children: [
  //     {
  //       id: 10,
  //       name: '实体字典',
  //       link: '/app/mng/dic'
  //     },
  //     {
  //       id: 11,
  //       name: '关系字典',
  //       link: '/app/mng/rel'
  //     }
  //   ]
  // },
  // {
  //   id: 3,
  //   name: '语料管理',
  //   link: '/app/text',
  //   icon: 'icon-yuliao',
  //   children: [
  //     {
  //       id: 30,
  //       name: '实体语料',
  //       link: '/app/text/dic'
  //       // icon: 'icon-yuliao'
  //     },
  //     {
  //       id: 31,
  //       name: '关系语料',
  //       link: '/app/text/rel'
  //       // icon: 'icon-yuliao'
  //     }
  //   ]
  // },
  // {
  //   id: 4,
  //   name: '抽取工具',
  //   link: '/app/tool',
  //   icon: 'icon-shiti',
  //   children: [
  //     {
  //       id: 41,
  //       name: '实体抽取',
  //       link: '/app/tool/dic'
  //     },
  //     {
  //       id: 42,
  //       name: '关系抽取',
  //       link: '/app/tool/rel'
  //     }
  //   ]
  // },
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
        name: '字典管理',
        link: '/app/graph/mng',
        //icon: 'icon-shiti',
        children: [
          {
            id: 600,
            parentId: 60,
            name: '实体字典',
            link: '/app/graph/mng/dic'
          },
          {
            id: 601,
            name: '关系字典',
            parentId: 60,
            link: '/app/graph/mng/rel'
          }
        ]
      },
      {
        id: 61,
        name: '语料管理',
        parentId: 6,
        link: '/app/graph/text',
        // icon: 'icon-yuliao',
        children: [
          {
            id: 610,
            parentId: 61,
            name: '实体语料',
            link: '/app/graph/text/dic'
            // icon: 'icon-yuliao'
          },
          {
            id: 611,
            parentId: 61,
            name: '关系语料',
            link: '/app/graph/text/rel'
            // icon: 'icon-yuliao'
          }
        ]
      },
      {
        id: 62,
        name: '抽取工具',
        parentId: 6,
        link: '/app/graph/tool',
        children: [
          {
            id: 620,
            parentId: 62,
            name: '实体抽取',
            link: '/app/graph/tool/dic'
          },
          {
            id: 621,
            parentId: 62,
            name: '关系抽取',
            link: '/app/graph/tool/rel'
          }
        ]
      },
      {
        id: 63,
        name: '设备树',
        link: '/app/device/tree'
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
