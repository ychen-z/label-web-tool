import { get, put, post, del } from '../../http';

// 字典接口
export const getTextAll = (data: any) => get({ url: '/text/', data }); // 获取语料列表
export const postText = (data: any) => post({ url: '/text/', data }); // 插入语料词条
export const updateText = (data: any) => put({ url: '/text/', data }); // 更新语料
export const delText = (data: any) => del({ url: '/text/' + data }); // 删除语料

// 语料数据
export const getTextByKey = (data: any) => get({ url: '/textData/text/' + data.textId, data }); // 查询单条语料信息
export const postTextData = (data: any) => post({ url: '/textData/', data }); // 插入语料数据
export const putTextData = (data: any) => put({ url: '/textData/', data }); // 插入语料数据
export const delTextData = (data: any) => del({ url: '/textData/' + data }); // 删除语料数据
