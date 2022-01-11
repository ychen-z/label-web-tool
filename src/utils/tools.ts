import { cloneDeep } from 'lodash';
import moment from 'moment';
import { UserType, CodeNameRes } from '@/axios/interface';

// 获取url中的参数
export const getParams: () => { [index: string]: string } = () => {
    const search = location.search;
    var reg = /(\w+)=([^&]+)/g,
        params: { [index: string]: string } = {},
        result: RegExpExecArray | null = null;

    while ((result = reg.exec(search))) {
        params[result[1]] = decodeURI(result[2]);
    }
    return params;
};

// 将部门字符串转换成部门层级数组
export const deptToArr = (source: string | undefined, count: number) => {
    if (!source) {
        return [''];
    }
    let arr: string[] = [];
    for (let i = 0, len = Math.floor(source.length / count) - 1; i < len; i++) {
        let subStr = source.slice(0, -(count * (i + 1)));
        arr.push(subStr);
    }
    arr.reverse().push(source);
    return arr;
};

/**
 * 深拷贝
 */
export const deepClone = (source: any) => {
    if (!source || typeof source !== 'object') {
        return source;
    }
    var targetObj: any[] | { [index: string]: any } = source.constructor === Array ? [] : {};
    for (var keys in source) {
        if (source.hasOwnProperty(keys)) {
            if (source[keys] && typeof source[keys] === 'object') {
                // @ts-ignore
                targetObj[keys] = source[keys].constructor === Array ? [] : {};
                // @ts-ignore
                targetObj[keys] = deepClone(source[keys]);
            } else {
                // @ts-ignore
                targetObj[keys] = source[keys];
            }
        }
    }
    return targetObj;
};

/**
 * 处理Object的属性值可能为空的情况，eg data = {data: {a: b: {c: 'd'}}} 取data.a.b 使用方法 pathOr({}, ['a', 'b'],data};
 * @param initialValue 默认返回值
 * @param keyList 要取相应值的key列表
 * @param origin 原始值
 * @returns {*} 如果为空 返回initialValue，不为空 返回相应值
 */
export const pathOr = <T>(initialValue: T, keyList: string[], origin: any) => {
    const result = keyList.reduce((account, current) => {
        if (Object.prototype.toString.call(account) === '[object Object]') {
            return account[current] || initialValue;
        }
        return initialValue;
    }, origin);
    return result === initialValue ? initialValue : deepClone(result);
};

// 去除前后空格
export const empty = (str: string) => str.replace(/^\s+|\s+$/g, '');

// 去除所有空格
export const emptyAll = (str: string) => str.replace(/\s/g, '');

// 是否包含英文
export const includeEn = (str: string) => str.search(/[a-zA-Z]+/) > -1;

// 函数防抖 (只执行最后一次点击)
export const debounce = (fn: Function, delay = 300) => {
    let timer: NodeJS.Timeout | null;
    return function(...args: any) {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            // @ts-ignore
            fn.apply(this, args);
        }, delay);
    };
};

// 节流（n秒内只下执行一次）
export const throttle = (fn: any, delay = 500) => {
    let flag = false;
    return function(...args: any) {
        if (!flag) {
            flag = true;
            setTimeout(() => {
                console.log(flag);

                flag = false;
                // @ts-ignore
                fn.apply(this, args);
            }, delay);
        }
    };
};

export const getSelectedObj = (rules: string[], target: string, obj: Record<string, any> = {}): Record<string, any> | undefined => {
    if (!obj) {
        return;
    }
    const arr = obj[target].split(' | ');
    const res = {};
    rules.forEach((item, index) => {
        res[item] = arr[index];
    });
    return res;
};

// 从select的label中获取user信息
export const getUserObj = (obj: UserType) => {
    if (!obj) {
        return;
    }
    const arr = obj?.userName?.split(' | ');
    return {
        userId: arr[1],
        userName: arr[0]
    };
};

// 从select的label中获取code,name信息
export const getCodeNameObj = (obj: CodeNameRes) => {
    if (!obj) {
        return;
    }
    const arr = obj?.name?.split(' | ');
    return {
        code: arr[1],
        name: arr[0]
    };
};

// 从select的label中获取user信息
export const getUserPathObj = (obj: UserType) => {
    if (!obj) {
        return;
    }
    const arr = obj?.userName?.split(' | ');
    return {
        userId: arr[1],
        userName: arr[0],
        fullPathName: arr[2]
    };
};

// 转化成百分比
export const getPercent = (num: number | undefined, count = 1) => {
    if (typeof num !== 'number') {
        return '';
    }
    return `${parseFloat((num * 100).toFixed(count))}%`;
};

export const sortData = (data: any) => {
    const d = cloneDeep(data);
    // 按照sort排序
    d.sort((a: any, b: any) => {
        return a.sort - b.sort;
    });
    return d;
};

export const dataToJson = (one: any, data: any) => {
    let kids;
    if (!one) {
        // 第1次递归
        kids = data.filter((item: any) => !item.parentId);
    } else {
        kids = data.filter((item: any) => item.parentId === one.id);
    }
    kids.forEach((item: any) => (item.children = dataToJson(item, data)));
    return kids.length ? kids : [];
};

/** 处理原始数据，将原始数据处理为层级关系 **/
export const makeSourceData = (data: any) => {
    const d = cloneDeep(data);
    // 按照sort排序
    d.sort((a: any, b: any) => {
        return a.sort - b.sort;
    });
    const sourceData = dataToJson(null, d) || [];
    return sourceData;
};

// 柯里化
export const curry = (fn: Function) => {
    if (typeof fn !== 'function') {
        throw Error('No function provided');
    }
    return function curriedFn(...args: any[]) {
        if (args.length < fn.length) {
            return (...argus: any[]) => curriedFn(...args, ...argus);
        }
        return fn(...args);
    };
};

// 获取名字加工号
export const getName = (Obj: { userName: string; userId: string }) => {
    if (!Obj || !Object.values(Obj).length) return '--';

    return `${Obj.userName} | ${Obj.userId}`;
};

// 获取职级
export const getPostLevel = (proLevel: string, mngLevel: string) => {
    switch (true) {
        case !!proLevel && !!mngLevel:
            return `${mngLevel}/${proLevel}`;
        case !!proLevel:
            return proLevel;
        case !!mngLevel:
            return mngLevel;
        default:
            return '';
    }
};

// 时间转义
// export const formatData = (data: string) => data.replace(/^(.+)T(.+)(\.)(.*)/, '$1 $2');

// form表单 input只填空格 回车 相当于没填
export const validateEmpty = (errInfo: string) => {
    return () => ({
        validator(rule: any, value: any) {
            if (!value) {
                return Promise.reject('');
            }
            const tempValue = value.replace(/[\r\n\s]/g, '');
            if (tempValue) {
                return Promise.resolve();
            }
            return Promise.reject(errInfo);
        }
    });
};

// 获取路径数组
export const getPathNameList = () => {
    if (window.__POWERED_BY_QIANKUN__) {
        return window.location.pathname.split('/').splice(1);
    }
    return window.location.pathname.split('/');
};

// 时间转换
export const moments = (val: string | number | Date | undefined, type?: string): string | Date => {
    if (!val) {
        return '-';
    }
    const date = new Date(val);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    const format = type
        ? type.replace(/Y{2,4}|M{1,2}|D{1,2}|d{1,4}|H{1,2}|m{1,2}|s{1,2}/g, match => {
              switch (match) {
                  case 'YY':
                      return String(year).slice(-2);
                  case 'YYY':
                  case 'YYYY':
                      return String(year);
                  case 'M':
                      return String(month);
                  case 'MM':
                      return String(month).padStart(2, '0');
                  case 'D':
                      return String(day);
                  case 'DD':
                      return String(day).padStart(2, '0');
                  case 'H':
                      return String(hour);
                  case 'HH':
                      return String(hour).padStart(2, '0');
                  case 'm':
                      return String(minute);
                  case 'mm':
                      return String(minute).padStart(2, '0');
                  case 's':
                      return String(second);
                  case 'ss':
                      return String(second).padStart(2, '0');
                  default:
                      return match;
              }
          })
        : date;
    return format;
};

// 组织冒泡
export const stopOnClick = (e: any) => {
    e.nativeEvent.stopImmediatePropagation();
    e.stopPropagation();
};

// 计算相隔分钟数
export const getMin = (a, b) =>
    moment
        .duration(
            moment(a).valueOf() -
                moment(b)
                    .valueOf()
                    .valueOf()
        )
        .as('minutes');

// 计算相隔分钟数
export const getMins = (a, b) => moment.duration(a.valueOf() - b.valueOf()).as('minutes');

// 获取评审活动名称
export const getEvaluateName = (list: Record<string, any>) => {
    const arr: any = [[], [], []]; // 末级职类 / 等级 / 结束时间
    list.forEach(item => {
        arr[0].push(item.positionTypeName?.split('-').reverse()[0]);
        arr[1].push(item.positionLevelNow);
        arr[2].push(moment(item.evaluateEnd).format('MMDD'));
    });
    return arr
        .map(item => [...new Set(item)])
        .map(item => item.filter(Boolean).join('&'))
        .filter(Boolean)
        .join(' / ');
};

// 对象数组根据唯一值去重
export const newSetObjArr = (list: Record<string, any>[], key: string) => {
    const keyList = [...new Set(list.map(item => item[key]))];
    return keyList.map(item => list.find(x => x[key] === item) || {});
};

export const flatten = (arr, depth = 1) => arr.reduce((a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v), []);

// 非空、非0判断
export const getNumber = (num, text = '--') => {
    if (num || typeof num == 'number') {
        return num;
    }
    return text;
};

// 根据级联末级获取完整code数组  '501231' -> ['50','5012','501213']
export const formatCompleteCode = (code, step = 2) => {
    if (typeof code !== 'string') return code;
    let target: string[] = [];

    for (let acc = 1; (acc - 1) * step < code.length; acc++) {
        target.push(code.slice(0, acc * step));
    }
    return target;
};
