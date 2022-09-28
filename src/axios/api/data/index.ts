import { get, put, post, del } from '../../http';

// 字典接口
export const getFileData = (data: any) => get({ url: '/fileInfo/', data }); // 获取文件接口
export const getFileById = (data: any) => get({ url: '/fileInfo/' + data }); // 获取文件详情
export const delFile = (data: any) => del({ url: '/fileInfo/' + data }); // 删除文件
export const fileUpload = (data: any) => post({ url: '/fileInfo/add', data }); // 文件上传
export const tripleAdd = (data: any) => post({ url: '/triple/add', data }); // 导入三元组
export const equipmentAdd = (data: any) => post({ url: '/equipment/add', data }); // 导入设备树
export const updateFileName = (data: any) => put({ url: '/fileInfo/updateName', data }); // 文件更新
export const updateFileContent = (data: any) => put({ url: '/fileInfo/updateContent', data }); // 文件内容更新
export const manualImport = (data: any) => post({ url: '/fileInfo/manualImport', data }); // 人工导入

export const getTripleTreeData = (data: any) => get({ url: '/triple/tree', data }); // 树

// export const getActiveDic = (data: any) => get({ url: '/dict/marking', data }); // 获取正在标注的字典
// export const postDic = (data: any) => post({ url: '/dict/', data }); // 插入字典词条
// export const updateDic = (data: any) => put({ url: '/dict/', data }); // 更新字典
// export const delDic = (data: any) => del({ url: '/dict/' + data.id, data }); // 删除字典

// 字典数据
// export const getDicByKey = (data: any) => get({ url: '/dictData/dict/' + data.dictId, data }); // 查询单条字典信息
// export const postDictData = (data: any) => post({ url: '/dictData/', data }); // 插入字典数据
// export const putDictData = (data: any) => put({ url: '/dictData/', data }); // 插入字典数据
// export const delDictData = (data: any) => del({ url: '/dictData/' + data.id, data }); // 删除字典数据
