/// <reference types="react" />
//全局变量 使用declare var声明变量
export declare namespace Models {
    interface TabData {
        key?: string; //如果存在key
        title: React.ReactNode;
        /** for user's custom extends */
        [key: string]: any;  ////key为string , value为number var map: { [key: string]: number; } = { "t": 3,"o": 5,"g": 10 }
    }
}

