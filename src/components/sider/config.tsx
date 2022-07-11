import { MenuItemType } from './interface';

const MENU_MAP: MenuItemType[] = [
    {
        id: 1,
        name: '实体管理',
        link: '/app/mng/dic',
        icon: 'icon-shujuzidian'
    },
    {
        id: 2,
        name: '关系管理',
        link: '/app/mng/rel',
        icon: 'icon-shujuzidian'
    },
    {
        id: 3,
        name: '字典语料',
        link: '/app/dic-text',
        icon: 'icon-yuliao'
    },
    {
        id: 4,
        name: '关系语料',
        link: '/app/rel-text',
        icon: 'icon-yuliao'
    },
    {
        id: 5,
        name: '实体抽取',
        link: '/app/tool-handle',
        icon: 'icon-shiti'
    },
    {
        id: 6,
        name: '关系抽取',
        link: '/app/rel-handle',
        icon: 'icon-shiti'
    }

    // {
    //     id: 4,
    //     name: '标签管理',
    //     link: '/app/label',
    //     icon: 'icon-yuliao'
    // }
];

export default MENU_MAP;
