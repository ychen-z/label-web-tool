export const PROBATION_FLOW_NODE: { [index: string]: number } = {
    PROBATION_STAGE_EVALUATE: 1, //试用期阶段性反馈
    PROBATION_CONCLUSION: 2, //试用期转正结论
    PROBATION_DEFENSE_EVALUATE: 3, // 试用期转正答辩评审
    PROBATION_REVIEW: 4 // 试用期转正审核
};

export const PROBATION_FLOW_NODE_BREAD_CRUMB = {
    [PROBATION_FLOW_NODE.PROBATION_STAGE_EVALUATE]: '试用期阶段性评估', //试用期阶段性评估
    [PROBATION_FLOW_NODE.PROBATION_CONCLUSION]: '转正结论', //试用期转正结论
    [PROBATION_FLOW_NODE.PROBATION_DEFENSE_EVALUATE]: '试用期转正答辩评审', // 试用期转正答辩评审
    [PROBATION_FLOW_NODE.PROBATION_REVIEW]: '试用期转正流程审核' // 试用期转正审核
};

export const PROBATION_EVALUATE: { [index: string]: any } = [
    {
        value: 1,
        icon: 'icon-tag_faces_black_24dp1',
        text: '非常满意',
        background: 'green'
    }, // 非常满意
    {
        value: 2,
        icon: 'icon-sentiment_satisfied_black_24dp',
        text: '满意',
        background: 'green'
    }, // 满意
    {
        value: 3,
        icon: 'icon-sentiment_neutral_black_24dp',
        text: '中规中矩',
        background: 'yellow'
    }, // 中规中矩
    {
        value: 4,
        icon: 'icon-sentiment_dissatisfied_black_24dp',
        text: '不太满意',
        background: 'red'
    }, // 不太满意
    {
        value: 5,
        icon: 'icon-sentiment_very_dissatisfied_black_24dp',
        text: '非常不满意',
        background: 'red'
    } // 非常不满意
];
export const DEVELOP_EVALUATE: { [index: string]: any } = [
    {
        value: 'LOW',
        text: '低'
    }, // 低
    {
        value: 'MIDDLE',
        text: '中'
    }, // 中
    {
        value: 'HIGH',
        text: '高'
    } // 高
];
export const PROBATION_CONCLUSIONS: { [index: string]: any } = [
    {
        value: 4,
        text: '建议转正，可直接发起转正审批',
        disabled: true
    },
    {
        value: 1,
        text: '建议转正，但需安排答辩'
    },
    {
        value: 2,
        text: '有些犹豫，答辩后再决定'
    },
    {
        value: 3,
        text: '不建议转正'
    }
];
export const PROBATION_RESULT: { [index: string]: any } = [
    {
        value: 1,
        text: '同意转正'
    },
    {
        value: 2,
        text: '不同意转正'
    }
];
export const PROBATION_RELY: { [index: string]: any } = [
    {
        value: 1,
        text: '答辩通过'
    },
    {
        value: 0,
        text: '答辩不通过'
    }
];
export const PROBATION_USER_STATUS = {
    PROBATION: 100,
    DEFENSE: 200,
    DEFENSE_COMPLETE: 300,
    REGULAR_PROCESS: 400,
    NOT_REGULAR: 500 // 不予转正
    // FINISHED: 900
};

export const PROBATION_STATUS_NAME: { [index: string]: any } = {
    [PROBATION_USER_STATUS.PROBATION]: {
        userListName: '试用中'
    },
    [PROBATION_USER_STATUS.DEFENSE]: {
        userListName: '答辩中'
    },
    [PROBATION_USER_STATUS.DEFENSE_COMPLETE]: {
        userListName: '答辩完成'
    },
    [PROBATION_USER_STATUS.REGULAR_PROCESS]: {
        userListName: '转正流程中'
    },
    [PROBATION_USER_STATUS.NOT_REGULAR]: {
        userListName: '不予转正'
    }
    // [PROBATION_USER_STATUS.FINISHED]: {
    //     userListName: '已完成'
    // }
};

export const PROBATION_STATUS_LIST = [
    {
        label: PROBATION_STATUS_NAME[PROBATION_USER_STATUS.PROBATION].userListName,
        value: PROBATION_USER_STATUS.PROBATION
    },
    {
        label: PROBATION_STATUS_NAME[PROBATION_USER_STATUS.DEFENSE].userListName,
        value: PROBATION_USER_STATUS.DEFENSE
    },
    {
        label: PROBATION_STATUS_NAME[PROBATION_USER_STATUS.DEFENSE_COMPLETE].userListName,
        value: PROBATION_USER_STATUS.DEFENSE_COMPLETE
    },
    {
        label: PROBATION_STATUS_NAME[PROBATION_USER_STATUS.REGULAR_PROCESS].userListName,
        value: PROBATION_USER_STATUS.REGULAR_PROCESS
    },
    {
        label: PROBATION_STATUS_NAME[PROBATION_USER_STATUS.NOT_REGULAR].userListName,
        value: PROBATION_USER_STATUS.NOT_REGULAR
    }
];

export const STAGE_EVALUATE_STATUS = {
    1: '非常满意',
    2: '满意',
    3: '中规中矩',
    4: '不太满意',
    5: '非常不满意'
};

export const STAGE_EVALUATE_LIST = [
    {
        label: '非常满意',
        value: 1
    },
    {
        label: '满意',
        value: 2
    },
    {
        label: '中规中矩',
        value: 3
    },
    {
        label: '不太满意',
        value: 4
    },
    {
        label: '非常不满意',
        value: 5
    }
];

export const CONCLUSION_EVALUATE_STATUS = {
    6: '建议转正',
    7: '有些犹豫',
    8: '不建议转正',
    11: '建议直接转正'
};

export const CONCLUSION_EVALUATE_LIST = [
    {
        label: '建议直接转正',
        value: 11
    },
    {
        label: '建议转正',
        value: 6
    },
    {
        label: '有些犹豫',
        value: 7
    },
    {
        label: '不建议转正',
        value: 8
    }
];

export const PROBATION_EVALUATE_SELECT = {
    ...STAGE_EVALUATE_STATUS,
    ...CONCLUSION_EVALUATE_STATUS,
    9: '答辩通过',
    10: '答辩不通过'
};

export const PROBATION_EVALUATE_STATUS = {
    0: '无',
    ...PROBATION_EVALUATE_SELECT
};

// 试用期列表答辩状态
export const PROBATION_DEFENSE_STATUS = {
    WAIT: 201,
    ALREADY: 202,
    FINISHED: 203,
    PASS: 1,
    NO_PASS: 0
};

export const PROBATION_DEFENSE_NAME = {
    [PROBATION_DEFENSE_STATUS.WAIT]: '待安排',
    [PROBATION_DEFENSE_STATUS.ALREADY]: '已安排',
    [PROBATION_DEFENSE_STATUS.FINISHED]: '已完成',
    [PROBATION_DEFENSE_STATUS.PASS]: '答辩通过',
    [PROBATION_DEFENSE_STATUS.NO_PASS]: '答辩不通过'
};

export const PROBATION_DEFENSE_LIST = [
    {
        label: PROBATION_DEFENSE_NAME[PROBATION_DEFENSE_STATUS.WAIT],
        value: PROBATION_DEFENSE_STATUS.WAIT
    },
    {
        label: PROBATION_DEFENSE_NAME[PROBATION_DEFENSE_STATUS.ALREADY],
        value: PROBATION_DEFENSE_STATUS.ALREADY
    },
    {
        label: PROBATION_DEFENSE_NAME[PROBATION_DEFENSE_STATUS.FINISHED],
        value: PROBATION_DEFENSE_STATUS.FINISHED
    },
    {
        label: PROBATION_DEFENSE_NAME[PROBATION_DEFENSE_STATUS.PASS],
        value: PROBATION_DEFENSE_STATUS.PASS
    },
    {
        label: PROBATION_DEFENSE_NAME[PROBATION_DEFENSE_STATUS.NO_PASS],
        value: PROBATION_DEFENSE_STATUS.NO_PASS
    }
];

export const PROBATION_REVIEW_TYPE = {
    PROBATION_DEFENSE: {
        title: '试用期转正答辩',
        label: '答辩结论'
    },
    PROBATION_CONCLUSION: {
        title: '试用期转正结论',
        label: '初始转正结论'
    }
};

// 审核状态
export const PROBATION_REVIEW_STATUS = {
    WAIT: 400, // 待发起
    FIFTH_REVIEW: 450,
    FORTH_REVIEW: 440,
    THIRD_REVIEW: 430,
    SECOND_REVIEW: 420,
    FIRST_REVIEW: 410,
    FINISHED: 490 // 审核完成
};

// 转正流程类型
export const REGULAR_FLOW_STATUS = {
    DIRECT_INDIRECT_LEADER: 'DIRECT_INDIRECT_LEADER',
    INDIRECT_LEADER: 'INDIRECT_LEADER',
    CUSTOMIZE: 'CUSTOMIZE'
};

export const REGULAR_FLOW_LIST = [
    {
        label: '间接主管审批',
        value: REGULAR_FLOW_STATUS.INDIRECT_LEADER
    },
    {
        label: '直接+间接主管审批',
        value: REGULAR_FLOW_STATUS.DIRECT_INDIRECT_LEADER
    },
    {
        label: '自定义审批流',
        value: REGULAR_FLOW_STATUS.CUSTOMIZE
    }
];
