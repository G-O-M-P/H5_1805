/* 
* @Author: Marte
* @Date:   2018-09-15 14:00:36
* @Last Modified by:   Marte
* @Last Modified time: 2018-09-21 08:56:58
*/

function cart(){
    let $cookies = $.cookie("data");
    let $shopcart = $.cookie("shopcart");
    $cookies = JSON.parse($cookies);
    $shopcart = JSON.parse($shopcart);
    let $URL='';
    let $Name = '';
    $goodsNo = Number(location.search.substring(1).split("=")[1]);
    for(let i=0;i<$cookies.length;i++){
        if($cookies[i].goodsNo===$goodsNo){
            $URL = $cookies[i].imgurl;
            $Name = $cookies[i].name;
            $URL = '../' + $URL;
        }
    }
    if($.cookie("shopcart")===null){
        $(".addcart").on("click",function(){
            let $innerhtml = '';
            $innerhtml ='<ul class="goods-order">';
            $innerhtml +=`
            <li>
                <img src="${$URL}" />
                <span>${$Name}</span>
                <span class="goods-cancel">&times</span>
            </li>
            `
            document.cookie = "shopcart="+ JSON.stringify($innerhtml)+";path=/;";
            $(".incart-goods").html(function(){ 
                $innerhtml += "</ul>"
                return $innerhtml
            }) 
        })
    }
    else{
        $shopcart = $.cookie("shopcart");
        $shopcart = JSON.parse($shopcart);
        $(".incart-goods").html(function(){
            let $renew = $shopcart;
            $renew += "</ul>";
            return $renew
        })
    }
}


jQuery(function($){
    cart();
})


// 轮播图
jQuery(function($){
    let $banner = $('.banner');
    let $ul = $banner.find("ul");

    // 无缝滚动关键1：复制第一张到最后
    $ul.append($ul.children("li").eq(0).clone(true));

    // 图片数量
    let $len = $ul.children("li").length;
    for(let i=0;i<$len;i++){
        $ul.children("li").eq(i).find("img").css({"width":$banner.width()+'px'});
    }

    // 默认索引值
    let $index = 0;

    // 添加分页效果
    let $page = $('<div></div>');
    $page.prop("class",function(){
        return "page";
    })
    for(let i=0;i<$len-1;i++){
        let $span = $('<span></span>');
        if(i === $index){
            $span.prop("class",function(){
                return "active";
            })
        }
        $page.append($span);
    }
    // 写入页面
    $banner.append($page);


    // 1）设置ul宽度，达到水平排列的效果
    $ul.css({"width":$banner.width()*$len + 'px'});

    // 每隔3s显示一张图片
    let $timer = setInterval(autoPlay,3000);

    $banner.on("mouseenter",function(){
        clearInterval($timer);
    });
    $banner.on("mouseleave",function(){
        $timer = setInterval(autoPlay,3000);
    });
    
    // 点击页码切换
    $(".page").on("click",function(e){
        if($(e.target).prop("tagName") === 'SPAN'){
            $index = $(e.target).index();
            show();
        }
    });


    function autoPlay(){
        $index++;

        show();

    }

    function show(){
        // 无缝滚动关键2：当滚动到复制那张图片时，瞬间重置回初始状态，并把index改成1
        for(let i=0;i<$len;i++){
            $ul.children("li").eq(i).find("img").css({"width":$banner.width()+'px'});
        }
        if($index>=$len){
            $ul.css("left",0);
            $index = 1;
        }else if($index<0){
            $index = $len-2;
        }
        $ul.animate({left:-$index * $banner.width()});

        // 显示页码高亮
        // 去除其他高亮，添加当前高亮
        for(let i=0;i<$len-1;i++){
            if(i===$index){
                $page.children().eq(i).prop("class",function(){
                    return "active";
                });
            }else{
                $page.children().eq(i).prop("class",function(){
                    return "";
                });
            }
        }

        // 当到达复制图片动画时，高亮显示第一个页码
        if($index === $len-1){
            $page.children().eq(0).prop("class",function(){
                return "active";
            });
        }

    }
})

// 下拉菜单切换
jQuery(function($){
    function shows(node){
        node.hover(function(){
            node.find(".category_lv2").show();
            node.find(".hide").show();
            node.find("dd").show();
            if(node.find(".hide").length!==0){
            node.css({"width":"78px","background-color":"#fff","border-left":"1px solid #F0F0F0","border-right":"1px solid #F0F0F0"});
            }
            if(node.find("dd").length!==0){
                node.find("dt").css({"background-color":"#fff"});
            }
        },function(){
            node.find(".category_lv2").hide();
            node.find(".hide").hide();
            node.find("dd").hide();
            if(node.find(".hide").length!==0){
            node.find(".hide").css({"display":"none"});
            node.css({"width":"80px","background-color":"#FAFAFA","border-bottom":"solid 1px #F0F0F0","border-width":"0 0 1px 0"});
            }
            if(node.find("dd").length!==0){
                node.find("dt").css({"background-color":"#FAFAFA"});
            }
        })
    }
    let $service = $(".topbar-line");
    let $category = $(".category");
    let $mycart = $(".my-cart");
    for(let i=0;i<$service.length;i++){
        shows($service.eq(i));
    }
    shows($category);
    shows($mycart);
});
// 楼层吸顶菜单
jQuery(function($){
let $box = $('.center-box');
let $bar = $('.navbar');

$(window).scroll(function(){
    if($(window).scrollTop()>=1400){
        $(".go-floor").find("li").eq(1).find("a").removeClass('select');
            $(".go-floor").find("li").eq(0).find("a").addClass('select');
            $(".go-floor").find("li").eq(2).find("a").removeClass('select');
        if($(window).scrollTop()>=1887){
            $(".go-floor").find("li").eq(1).find("a").addClass('select');
            $(".go-floor").find("li").eq(0).find("a").removeClass('select');
            $(".go-floor").find("li").eq(2).find("a").removeClass('select');
        }
        if($(window).scrollTop()>=2462){
            $(".go-floor").find("li").eq(1).find("a").removeClass('select');
            $(".go-floor").find("li").eq(0).find("a").removeClass('select');
            $(".go-floor").find("li").eq(2).find("a").addClass('select');
        }
        $box.addClass('fixed');
        $bar.css({"height":"76px"});
    }else{
        $box.removeClass('fixed');
        $bar.css({"height":"auto"});
    }
})
});
// 楼层点击跳转

jQuery(function($){
    $(".go-floor").find("li").eq(1).find("a").on("click",function(){
        $(window).scrollTop(1887);
    });
    $(".go-floor").find("li").eq(0).find("a").on("click",function(){
        $(window).scrollTop(1380);
    });
    $(".go-floor").find("li").eq(2).find("a").on("click",function(){
        $(window).scrollTop(2462);
    });
})

// 标签切换
jQuery(function($){
    let $nav = $(".tabs-nav");
    $nav.on("click",function(e){
        if($(e.target).prop("tagName")==='H3'){
            $(e.target).parent().addClass('tabs-selected');
            $(e.target).parent().siblings('.tabs-selected').removeClass('tabs-selected');
        }
        if($nav.children().eq(0).prop("class")=="tabs-selected"){
        $(".hotsale").show();
        $(".hotcomit").hide();
        $(".newgood").hide();
        }
        else if($nav.children().eq(1).prop("class")=="tabs-selected"){
            $(".hotsale").hide();
            $(".hotcomit").show();
            $(".newgood").hide();
        }
        else if($nav.children().eq(2).prop("class")=="tabs-selected"){
            $(".hotsale").hide();
            $(".hotcomit").hide();
            $(".newgood").show();
        }
    });
})


// ajax生成数据
jQuery(function($){
    $.ajax({
    type: "get",
    url: "../api/database.php",
    data:{"text":"ceshi"},
    async: true,
    success: function(str){
        let $data = JSON.parse(str);
        let $cok = JSON.stringify($data);
        let $cookies = document.cookie;
        if($.cookie('data')===null){
            document.cookie = "data=" + $cok;
        }
        let $hotsale = $(".hotsale");
        let $hotcomit = $(".hotcomit");
        let $newgood = $(".newgood");
        let $innerhtml='';
        function addhtml(i){
            $innerhtml += `
            <li class="goodsNo${$data[i].goodsNo}">
                <a class="picWindow" href="html/details.html?goodsNo=${$data[i].goodsNo}">
                    <img src="${$data[i].imgurl}" />
                </a>
                <a class="goodsName" href="html/details.html?goodsNo=${$data[i].goodsNo}">${$data[i].name}</a>
                <span>商城价:<em>${$data[i].price}</em></span>
            </li>
            ` 
        }
        for(let i=0;i<$data.length;i++){
            if($data[i].hotcomit){
               addhtml(i);
            }
        }
        $hotcomit.html("<ul>"+$innerhtml+"</ul>");
        $innerhtml = '';
        for(let i=0;i<$data.length;i++){
            if($data[i].hotsale){
                addhtml(i);
            }
        }
        $hotsale.html("<ul>"+$innerhtml+"</ul>");
        $innerhtml = '';
        for(let i=0;i<$data.length;i++){
            if($data[i].newgood){
                addhtml(i);
            }
        }
        $newgood.html("<ul>"+$innerhtml+"</ul>");
        $innerhtml = '';
    }
    });
})
