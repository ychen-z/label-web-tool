import { MenuItemType } from './interface';

const MENU_MAP: MenuItemType[] = [
  {
    id: 1,
    name: '字典管理',
    link: '/app/mng',
    icon: 'icon-shujuzidian',
    children: [
      {
        id: 10,
        name: '实体字典',
        link: '/app/mng/dic'
      },
      {
        id: 11,
        name: '关系字典',
        link: '/app/mng/rel'
      }
    ]
  },
  {
    id: 3,
    name: '语料管理',
    link: '/app/text',
    icon: 'icon-yuliao',
    children: [
      {
        id: 30,
        name: '实体语料',
        link: '/app/text/dic'
        // icon: 'icon-yuliao'
      },
      {
        id: 31,
        name: '关系语料',
        link: '/app/text/rel'
        // icon: 'icon-yuliao'
      }
    ]
  },
  {
    id: 4,
    name: '抽取工具',
    link: '/app/tool',
    icon: 'icon-shiti',
    children: [
      {
        id: 41,
        name: '实体抽取',
        link: '/app/tool/dic'
      },
      {
        id: 42,
        name: '关系抽取',
        link: '/app/tool/rel'
      }
    ]
  },
  {
    id: 5,
    name: '文件管理',
    link: '/app/data',
    icon: 'icon-shiti',
    children: [
      {
        id: 50,
        name: '原始数据',
        link: '/app/data/origin'
      },
      {
        id: 51,
        name: '文本数据',
        link: '/app/data/text'
      },
      {
        id: 52,
        name: '实体数据',
        link: '/app/data/entity'
      },
      {
        id: 53,
        name: '三元组数据',
        link: '/app/data/triple'
      },
      {
        id: 54,
        name: '设备树',
        link: '/app/data/device'
      }
    ]
  },
  {
    id: 6,
    name: '图谱构建',
    link: '/app/graph',
    icon: 'icon-shiti'
  }
];

export default MENU_MAP;
