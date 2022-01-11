import React from 'react';
import MyIcon from '@/components/icon';

import { MenuItemType } from './interface';
// import '../assets/css/iconfont.css';

const MENU_MAP: MenuItemType[] = [
    // {
    //     id: 1,
    //     name: '试用期人员列表',
    //     link: '/probationUser',
    //     icon: <MyIcon type="iconmenu-my-task" />
    // },
    // {
    //     id: 2,
    //     name: '转正答辩安排',
    //     link: '/probationDefense',
    //     icon: <MyIcon type="iconmenu-my-task" />
    // },
    {
        id: 3,
        name: '字典管理',
        link: '/dic',
        icon: <MyIcon type="iconmenu-my-task" />
    }
];

export default MENU_MAP;
