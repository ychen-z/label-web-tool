import { MenuItemType } from './interface';

const MENU_MAP: MenuItemType[] = [
    {
        id: 3,
        name: '实体抽取',
        link: '/app/tool',
        icon: 'icon-shiti'
    },
    {
        id: 1,
        name: '字典管理',
        link: '/app/dic',
        icon: 'icon-shujuzidian'
    },
    {
        id: 2,
        name: '语料管理',
        link: '/app/text',
        icon: 'icon-yuliao'
    }

    // {
    //     id: 4,
    //     name: '标签管理',
    //     link: '/app/label',
    //     icon: 'icon-yuliao'
    // }
];

export default MENU_MAP;
