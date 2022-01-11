// 用户与菜单相关

interface Action {
    type: 'QUERY_AUTH_MENUS' | 'SET_QEURY_TASK' | 'UPDATE_TASK_COUNT' | 'TASK_QUERY_SUCCESS';
    payload?: {
        [index: string]: any;
    };
}

function loginReducer(state: any, action: Action) {
    switch (action.type) {
        case 'QUERY_AUTH_MENUS': // 获取用户菜单相关信息
            return {
                ...state,
                fetch: false,
                user: action.payload && action.payload.user,
                menus: action.payload && action.payload.menus
            };
        case 'SET_QEURY_TASK': // 请求代办数
            return {
                ...state,
                fetch: true
            };

        case 'TASK_QUERY_SUCCESS': // 请求成功重置
            return {
                ...state,
                fetch: false
            };
        case 'UPDATE_TASK_COUNT': // 设置菜单（根据代办数量）
            state.menus.map((item: { code: string; number: number }) => {
                if (item.code === 'task-todo') {
                    item.number = action.payload && action.payload.number;
                }
            });
            return {
                ...state
            };
        default:
            return state;
    }
}

export default loginReducer;
