'use strict';

var _shim;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

require.config({

    // 配置短路径（别名）
    paths: {
        'jquery': '../lib/jquery-3.2.1',
        'login': './login',
        'cookie': './jquery.cookie'
    },

    shim: (_shim = {
        // 配置模块间依赖关系
        'login': ['jquery']
    }, _defineProperty(_shim, 'login', ['cookie']), _defineProperty(_shim, 'cookie', ['jquery']), _shim)
});

// 首页依赖
//  * common.js    利用js加载js
//  * 安全使用$
//  * 引入模块规范
//      * 引入的模块如果没有遵循相应的规范，则在回调函数中得到不到值

require(['jquery', 'login'], function ($) {});