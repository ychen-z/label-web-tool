import { get, put, post, del } from '../../http';

// 数据
export const getFileData = (data: any) => get({ url: '/fileInfo/', data }); // 获取文件接口
export const getFileById = (data: any) => get({ url: '/fileInfo/' + data }); // 获取文件详情
export const getFileContent = (data: any) => get({ url: '/fileInfo/' + data.type + '/' + data.id }); // 获取文件详情
export const delFile = (data: any) => del({ url: '/fileInfo/' + data }); // 删除文件
export const fileUpload = (data: any) => post({ url: '/fileInfo/add', data }); // 文件上传
export const tripleAdd = (data: any) => post({ url: '/triple/add', data }); // 导入三元组
export const equipmentAdd = (data: any) => post({ url: '/equipment/add', data }); // 导入设备树
export const updateFileName = (data: any) => put({ url: '/fileInfo/updateName', data }); // 文件更新
export const updateFileContent = (data: any) => put({ url: '/fileInfo/updateContent', data }); // 文件内容更新
export const manualImport = (data: any) => post({ url: '/fileInfo/manualImport', data }); // 人工导入

export const getTripleTreeData = (data: any) => get({ url: '/triple/tree', data }); // 树

// 设备树
export const getEquipmentTreeData = (data: any) => get({ url: '/equipment/tree', data }); // 获取设备树结构
export const getEquipmentSubTreeData = (data: any) => get({ url: '/equipment/subTree', data }); // 获取子树
export const getEquipmentAutoComplete = (data: any) => get({ url: '/equipment/autoComplete?keyword=' + data }); // 获取设备搜索自动补齐
export const postEquipmentAdd = (data: any) => post({ url: '/equipment/tree/add', data }); // 添加树节点
export const delEquipmentById = (data: any) => del({ url: '/equipment/tree/delete/' + data }); // 删除子树
