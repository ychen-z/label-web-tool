import { get, put, post, del } from '../../http';

// 字典接口
export const getDicAll = (data: any) => get({ url: '/dictionaries/all', data }); // 获取字典列表
export const updateDic = (data: any) => put({ url: '/dictionaries', data }); // 更新字典  TODO: 新增
export const getDicByKey = (data: any) => get({ url: '/dictionaries/' + data }); // 查询单条字典信息 TODO: 新增
export const postDic = (data: any) => post({ url: '/dictionaries/insert', data }); // 插入字典词条
export const delDic = (data: any) => del({ url: '/dictionaries/delete', data }); // 删除字典词条
