import { ReactElement } from 'react';

export interface MenuItemType {
    parentId?: string | null | number;
    name: string;
    code?: string;
    id: string | number;
    link?: string;
    number?: number;
    url?: string;
    icon?: ReactElement;
    menuId?: string;
    children?: Array<MenuItemType>;
}

export interface MenuType {
    menuList: Array<MenuItemType>;
    theme?: 'light' | 'dark';
    selectedKeys: string[];
    openKeys: string[];
    width?: Key;
    defaultOpenKeys: string[];
    firstHide?: boolean;
    defaultSelectedKeys: string[];
    inlineCollapsed?: boolean;
    setFirstHide: Function;
    selectMenuId?: (menuId: string) => void;
    taskNumber?: number;
    changeOpenKeys: Function;
}

export interface SiderProps {
    setCollapsed: Function;
    menus: Array<MenuItemType>; // 菜单类型
}
