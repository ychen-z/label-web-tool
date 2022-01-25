import { get, put, post, del } from '../../http';

// 字典接口
export const getDicAll = (data: any) => get({ url: '/dict/', data }); // 获取字典列表
export const addDic = (data: any) => put({ url: '/dict/', data }); // 更新字典
export const updateDic = (data: any) => put({ url: '/dict/', data }); // 更新字典
export const getDicByKey = (data: any) => get({ url: '/dict/' + data }); // 查询单条字典信息
export const postDic = (data: any) => post({ url: '/dict/', data }); // 插入字典词条
export const delDic = (data: any) => del({ url: '/dict/delete', data }); // 删除字典词条
