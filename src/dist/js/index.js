"use strict";

/* 
* @Author: Marte
* @Date:   2018-09-15 14:00:36
* @Last Modified by:   Marte
* @Last Modified time: 2018-09-21 08:56:58
*/

function cart() {
    var $cookies = $.cookie("data");
    var $shopcart = $.cookie("shopcart");
    $cookies = JSON.parse($cookies);
    $shopcart = JSON.parse($shopcart);
    var $URL = '';
    var $Name = '';
    $goodsNo = Number(location.search.substring(1).split("=")[1]);
    for (var i = 0; i < $cookies.length; i++) {
        if ($cookies[i].goodsNo === $goodsNo) {
            $URL = $cookies[i].imgurl;
            $Name = $cookies[i].name;
            $URL = '../' + $URL;
        }
    }
    if ($.cookie("shopcart") === null) {
        $(".addcart").on("click", function () {
            var $innerhtml = '';
            $innerhtml = '<ul class="goods-order">';
            $innerhtml += "\n            <li>\n                <img src=\"" + $URL + "\" />\n                <span>" + $Name + "</span>\n                <span class=\"goods-cancel\">&times</span>\n            </li>\n            ";
            document.cookie = "shopcart=" + JSON.stringify($innerhtml) + ";path=/;";
            $(".incart-goods").html(function () {
                $innerhtml += "</ul>";
                return $innerhtml;
            });
        });
    } else {
        $shopcart = $.cookie("shopcart");
        $shopcart = JSON.parse($shopcart);
        $(".incart-goods").html(function () {
            var $renew = $shopcart;
            $renew += "</ul>";
            return $renew;
        });
    }
}

jQuery(function ($) {
    cart();
});

// 轮播图
jQuery(function ($) {
    var $banner = $('.banner');
    var $ul = $banner.find("ul");

    // 无缝滚动关键1：复制第一张到最后
    $ul.append($ul.children("li").eq(0).clone(true));

    // 图片数量
    var $len = $ul.children("li").length;
    for (var i = 0; i < $len; i++) {
        $ul.children("li").eq(i).find("img").css({ "width": $banner.width() + 'px' });
    }

    // 默认索引值
    var $index = 0;

    // 添加分页效果
    var $page = $('<div></div>');
    $page.prop("class", function () {
        return "page";
    });
    for (var _i = 0; _i < $len - 1; _i++) {
        var $span = $('<span></span>');
        if (_i === $index) {
            $span.prop("class", function () {
                return "active";
            });
        }
        $page.append($span);
    }
    // 写入页面
    $banner.append($page);

    // 1）设置ul宽度，达到水平排列的效果
    $ul.css({ "width": $banner.width() * $len + 'px' });

    // 每隔3s显示一张图片
    var $timer = setInterval(autoPlay, 3000);

    $banner.on("mouseenter", function () {
        clearInterval($timer);
    });
    $banner.on("mouseleave", function () {
        $timer = setInterval(autoPlay, 3000);
    });

    // 点击页码切换
    $(".page").on("click", function (e) {
        if ($(e.target).prop("tagName") === 'SPAN') {
            $index = $(e.target).index();
            show();
        }
    });

    function autoPlay() {
        $index++;

        show();
    }

    function show() {
        // 无缝滚动关键2：当滚动到复制那张图片时，瞬间重置回初始状态，并把index改成1
        for (var _i2 = 0; _i2 < $len; _i2++) {
            $ul.children("li").eq(_i2).find("img").css({ "width": $banner.width() + 'px' });
        }
        if ($index >= $len) {
            $ul.css("left", 0);
            $index = 1;
        } else if ($index < 0) {
            $index = $len - 2;
        }
        $ul.animate({ left: -$index * $banner.width() });

        // 显示页码高亮
        // 去除其他高亮，添加当前高亮
        for (var _i3 = 0; _i3 < $len - 1; _i3++) {
            if (_i3 === $index) {
                $page.children().eq(_i3).prop("class", function () {
                    return "active";
                });
            } else {
                $page.children().eq(_i3).prop("class", function () {
                    return "";
                });
            }
        }

        // 当到达复制图片动画时，高亮显示第一个页码
        if ($index === $len - 1) {
            $page.children().eq(0).prop("class", function () {
                return "active";
            });
        }
    }
});

// 下拉菜单切换
jQuery(function ($) {
    function shows(node) {
        node.hover(function () {
            node.find(".category_lv2").show();
            node.find(".hide").show();
            node.find("dd").show();
            if (node.find(".hide").length !== 0) {
                node.css({ "width": "78px", "background-color": "#fff", "border-left": "1px solid #F0F0F0", "border-right": "1px solid #F0F0F0" });
            }
            if (node.find("dd").length !== 0) {
                node.find("dt").css({ "background-color": "#fff" });
            }
        }, function () {
            node.find(".category_lv2").hide();
            node.find(".hide").hide();
            node.find("dd").hide();
            if (node.find(".hide").length !== 0) {
                node.find(".hide").css({ "display": "none" });
                node.css({ "width": "80px", "background-color": "#FAFAFA", "border-bottom": "solid 1px #F0F0F0", "border-width": "0 0 1px 0" });
            }
            if (node.find("dd").length !== 0) {
                node.find("dt").css({ "background-color": "#FAFAFA" });
            }
        });
    }
    var $service = $(".topbar-line");
    var $category = $(".category");
    var $mycart = $(".my-cart");
    for (var i = 0; i < $service.length; i++) {
        shows($service.eq(i));
    }
    shows($category);
    shows($mycart);
});
// 楼层吸顶菜单
jQuery(function ($) {
    var $box = $('.center-box');
    var $bar = $('.navbar');

    $(window).scroll(function () {
        if ($(window).scrollTop() >= 1400) {
            $(".go-floor").find("li").eq(1).find("a").removeClass('select');
            $(".go-floor").find("li").eq(0).find("a").addClass('select');
            $(".go-floor").find("li").eq(2).find("a").removeClass('select');
            if ($(window).scrollTop() >= 1887) {
                $(".go-floor").find("li").eq(1).find("a").addClass('select');
                $(".go-floor").find("li").eq(0).find("a").removeClass('select');
                $(".go-floor").find("li").eq(2).find("a").removeClass('select');
            }
            if ($(window).scrollTop() >= 2462) {
                $(".go-floor").find("li").eq(1).find("a").removeClass('select');
                $(".go-floor").find("li").eq(0).find("a").removeClass('select');
                $(".go-floor").find("li").eq(2).find("a").addClass('select');
            }
            $box.addClass('fixed');
            $bar.css({ "height": "76px" });
        } else {
            $box.removeClass('fixed');
            $bar.css({ "height": "auto" });
        }
    });
});
// 楼层点击跳转

jQuery(function ($) {
    $(".go-floor").find("li").eq(1).find("a").on("click", function () {
        $(window).scrollTop(1887);
    });
    $(".go-floor").find("li").eq(0).find("a").on("click", function () {
        $(window).scrollTop(1380);
    });
    $(".go-floor").find("li").eq(2).find("a").on("click", function () {
        $(window).scrollTop(2462);
    });
});

// 标签切换
jQuery(function ($) {
    var $nav = $(".tabs-nav");
    $nav.on("click", function (e) {
        if ($(e.target).prop("tagName") === 'H3') {
            $(e.target).parent().addClass('tabs-selected');
            $(e.target).parent().siblings('.tabs-selected').removeClass('tabs-selected');
        }
        if ($nav.children().eq(0).prop("class") == "tabs-selected") {
            $(".hotsale").show();
            $(".hotcomit").hide();
            $(".newgood").hide();
        } else if ($nav.children().eq(1).prop("class") == "tabs-selected") {
            $(".hotsale").hide();
            $(".hotcomit").show();
            $(".newgood").hide();
        } else if ($nav.children().eq(2).prop("class") == "tabs-selected") {
            $(".hotsale").hide();
            $(".hotcomit").hide();
            $(".newgood").show();
        }
    });
});

// ajax生成数据
jQuery(function ($) {
    $.ajax({
        type: "get",
        url: "../api/database.php",
        data: { "text": "ceshi" },
        async: true,
        success: function success(str) {
            var $data = JSON.parse(str);
            var $cok = JSON.stringify($data);
            var $cookies = document.cookie;
            if ($.cookie('data') === null) {
                document.cookie = "data=" + $cok;
            }
            var $hotsale = $(".hotsale");
            var $hotcomit = $(".hotcomit");
            var $newgood = $(".newgood");
            var $innerhtml = '';
            function addhtml(i) {
                $innerhtml += "\n            <li class=\"goodsNo" + $data[i].goodsNo + "\">\n                <a class=\"picWindow\" href=\"html/details.html?goodsNo=" + $data[i].goodsNo + "\">\n                    <img src=\"" + $data[i].imgurl + "\" />\n                </a>\n                <a class=\"goodsName\" href=\"html/details.html?goodsNo=" + $data[i].goodsNo + "\">" + $data[i].name + "</a>\n                <span>\u5546\u57CE\u4EF7:<em>" + $data[i].price + "</em></span>\n            </li>\n            ";
            }
            for (var i = 0; i < $data.length; i++) {
                if ($data[i].hotcomit) {
                    addhtml(i);
                }
            }
            $hotcomit.html("<ul>" + $innerhtml + "</ul>");
            $innerhtml = '';
            for (var _i4 = 0; _i4 < $data.length; _i4++) {
                if ($data[_i4].hotsale) {
                    addhtml(_i4);
                }
            }
            $hotsale.html("<ul>" + $innerhtml + "</ul>");
            $innerhtml = '';
            for (var _i5 = 0; _i5 < $data.length; _i5++) {
                if ($data[_i5].newgood) {
                    addhtml(_i5);
                }
            }
            $newgood.html("<ul>" + $innerhtml + "</ul>");
            $innerhtml = '';
        }
    });
});