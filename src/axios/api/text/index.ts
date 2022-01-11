import { get, put, post, del } from '../../http';

// 语料
export const getTextAll = (data: any) => get({ url: '/texts/all', data }); // 获取字典列表
export const updateText = (data: any) => put({ url: '/texts', data }); // 更新字典  TODO: 新增
export const getTextByKey = (data: any) => get({ url: '/texts/' + data }); // 查询单条字典信息 TODO: 新增
export const postText = (data: any) => post({ url: '/texts/insert', data });
export const delText = (data: any) => del({ url: '/texts/delete', data });
