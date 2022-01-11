declare module '*.png';

declare module '*.jpg';

declare module '*.jpeg';

declare module '*.md';

declare module 'js-md5';

declare module 'lodash';

declare module 'jquery';

declare module 'crypto-js';

declare module 'ahooks';

declare type Key = string | number;

declare interface Window {
    sendReturnUrl: number;
}

type DATrackerType = {
    login: Function;
    track: Function;
    init: Function;
    people: {
        set: Function;
    };
};

declare interface Window {
    DATracker: DATrackerType;
}
declare const DATracker: DATrackerType;

type WaterMark = {
    mark: Function;
};

declare interface Window {
    WaterMark: WaterMark;
}
declare const WaterMark: WaterMark;
