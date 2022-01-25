import { cloneDeep } from 'lodash';
import moment from 'moment';

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

// 是否为Promise函数
export const isPromise = str => Object.prototype.toString.call(str) === '[object Promise]';

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

export const flatten = (arr, depth = 1) => arr.reduce((a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v), []);
