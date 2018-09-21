'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// 配置
require.config({

	// 配置短路径（别名）
	paths: {
		'jquery': '../lib/jquery-3.2.1',
		'index': './index',
		'cookie': './jquery.cookie'
	},

	shim: _defineProperty({
		// 配置模块间依赖关系
		'cookie': ['jquery'],
		'index': ['jquery']
	}, 'index', ['cookie'])
});

// 首页依赖
// 	* common.js    利用js加载js
// 	* 安全使用$
// 	* 引入模块规范
// 		* 引入的模块如果没有遵循相应的规范，则在回调函数中得到不到值

require(['jquery', 'index', 'cookie'], function ($) {});