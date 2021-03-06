require.config({

    // 配置短路径（别名）
    paths:{
        'jquery':'../lib/jquery-3.2.1',
        'cookie':'./jquery.cookie',
        'shopcart':'./shopcart'
    },

    shim:{
        // 配置模块间依赖关系
        'cookie':['jquery'],
        'shopcart':['jquery'],
        'shopcart':['cookie']
    }
});


// 首页依赖
//  * common.js    利用js加载js
//  * 安全使用$
//  * 引入模块规范
//      * 引入的模块如果没有遵循相应的规范，则在回调函数中得到不到值

require(['jquery','shopcart','cookie'],function($){
});