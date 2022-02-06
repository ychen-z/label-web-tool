import { get, post } from '../../http';

// 工具管理
export const setClusterAndVector = (data: any) => post({ url: '/textCluster/clusterAndVector', data }); // 聚类并向量化
export const getPreSample = (data: any) => get({ url: '/textCluster/preSample?rate=' + data }); // 聚类并向量化
export const getSampleData = (data: any) => get({ url: '/textData/sampleData', data });
export const postTrainModel = (data: any) => post({ url: '/textCluster/trainModel', data });
export const getCurrentRate = (data: any) => get({ url: '/textCluster/rate', data });
export const getHistoryRates = (data: any) => get({ url: '/textCluster/rates', data });
