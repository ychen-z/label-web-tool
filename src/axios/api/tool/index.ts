import { get, put, post, del } from '../../http';

// 标签管理
export const getLabelList = (data: any) => get({ url: '/label/all', data }); // 获取字典列表
export const updateLabel = (data: any) => put({ url: '/label', data }); // 更新字典
export const postLabel = (data: any) => post({ url: '/label/add', data }); // 增加label
export const delLabel = (data: any) => del({ url: '/label/delete', data }); // 删除label
