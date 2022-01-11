import { CHANGE_LOADINGDATA_DICTIONARY_SELECTOBJECT, CHANGE_LOADINGDATA_TEXTS_SELECTOBJECT } from '../types/actionTypes';
import { StoreType, LoadingDataType } from '../types/propsTypes';

const initStore: StoreType = {
    LoadingDataCom: {
        selectedRowKeys: null,
        dictionarySelectObject: { selectedRowKeys: [], selectedRows: [] },
        textsSelectObject: { selectedRowKeys: [], selectedRows: [] }
    }
};

const LoadingDataComReducer = (state: LoadingDataType = initStore.LoadingDataCom, action: any) => {
    if (action.type === CHANGE_LOADINGDATA_DICTIONARY_SELECTOBJECT) {
        const { dictionarySelectObject } = action;
        return {
            ...state,
            dictionarySelectObject
        };
    } else if (action.type === CHANGE_LOADINGDATA_TEXTS_SELECTOBJECT) {
        const { textsSelectObject } = action;
        return {
            ...state,
            textsSelectObject
        };
    }
    return state;
};

export default LoadingDataComReducer;
