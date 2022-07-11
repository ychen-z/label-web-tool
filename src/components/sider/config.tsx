import { MenuItemType } from './interface';

const MENU_MAP: MenuItemType[] = [
    {
        id: 10,
        name: '管理',
        link: '/app/mng',
        icon: 'icon-shujuzidian',
        children: [
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
            }
        ]
    },
    {
        id: 11,
        name: '语料',
        link: '/app/text',
        icon: 'icon-yuliao',
        children: [
            {
                id: 3,
                name: '实体语料',
                link: '/app/text/dic'
                // icon: 'icon-yuliao'
            },
            {
                id: 4,
                name: '关系语料',
                link: '/app/text/rel'
                // icon: 'icon-yuliao'
            }
        ]
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
