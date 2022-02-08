import { get, put, post, del } from '../../http';

// 工具管理
export const setClusterAndVector = (data: any) => post({ url: '/textCluster/clusterAndVector', data }); // 聚类并向量化
export const getPreSample = (data: any) => get({ url: '/textCluster/preSample?rate=' + data }); // 聚类并向量化
export const getSampleData = (data: any) => get({ url: '/textData/sampleData', data });
export const postTrainModel = (data: any) => post({ url: '/textCluster/trainModel', data });
export const getCurrentRate = (data: any) => get({ url: '/textCluster/rate', data });
export const getHistoryRates = (data: any) => get({ url: '/textCluster/rates', data });
export const postModelMark = (data: any) => post({ url: '/textCluster/modelMark', data });

// 打标
export const getTextLabelCount = (data: any) => get({ url: '/textLabel/count', data });
export const getTextLabelOne = (data: any) => get({ url: '/textLabel/takeOne?type=model', data });
export const getTextLabelResult = (data: any) => get({ url: '/textLabel/textData/' + data.id, data });
export const postTextLabel = (data: any) => post({ url: '/textLabel/', data });

// 标签管理
export const getLabelList = (data: any) => get({ url: '/label/all', data }); // 获取字典列表
export const updateLabel = (data: any) => put({ url: '/label', data }); // 更新字典
export const postLabel = (data: any) => post({ url: '/label/add', data }); // 增加label
export const delLabel = (data: any) => del({ url: '/label/delete', data }); // 删除label
