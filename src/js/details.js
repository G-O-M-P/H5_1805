/* 
* @Author: Marte
* @Date:   2018-09-19 15:44:52
* @Last Modified by:   Marte
* @Last Modified time: 2018-09-21 10:08:43
*/
// 购物车
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
            document.cookie = "goodsNo="+"&"+$goodsNo+";path=/;";
            $(".incart-goods").html(function(){ 
                $innerhtml += "</ul>"
                return $innerhtml
            }) 
        })
    }
    else{
        let $goodsNoCok = $.cookie("goodsNo");
        // $goodsNo = ""+$goodsNo;
        // if($.inArray($goodsNo,$goodsNoCok)===-1){
        // }
        $goodsNoCok = $goodsNoCok.split("&");
        console.log($goodsNoCok)
        $(".incart-goods").html(function(){
            let $renew = $shopcart;
            $renew += "</ul>";
            return $renew
        })
        let count = 0;
        $(".addcart").on("click",function(){
            $shopcart = $.cookie("shopcart");
            $shopcart = JSON.parse($shopcart);
            $goodsNo = ""+$goodsNo;
            if($.inArray($goodsNo,$goodsNoCok)===-1&&count!==1){
                $goodsNoCok = $.cookie("goodsNo");
                $goodsNoCok += "&" + $goodsNo;
                document.cookie = "goodsNo=" + $goodsNoCok + ";path=/;";
                console.log($goodsNoCok,$.inArray($goodsNo,$goodsNoCok),$goodsNo)
                $shopcart += `
                <li>
                    <img src="${$URL}" />
                    <span>${$Name}</span>
                    <span class="goods-cancel">&times</span>
                </li>
                `
                document.cookie = "shopcart="+JSON.stringify($shopcart)+";path=/;";
                $(".incart-goods").html(function(){
                    $shopcart += "</ul>";
                    return $shopcart
                })
                count++;
            }
        })
    }
}


jQuery(function($){
    cart();
})

// 获取cookie生成详情页
jQuery(function($){
    let $showBox = $(".show-box");
    let $cookies = $.cookie("data");
    let $items = $(".items");
    let $URL='';
    let $Name = '';
    let $price,$marketprice;
    $cookies = JSON.parse($cookies);
    $goodsNo = Number(location.search.substring(1).split("=")[1]);
    for(let i=0;i<$cookies.length;i++){
        if($cookies[i].goodsNo===$goodsNo){
            $URL = $cookies[i].imgurl;
            $Name = $cookies[i].name;
            $price = $cookies[i].price;
            $marketprice = $cookies[i].marketprice;
        }
    }
    $URL = '../' + $URL;
    $showBox.find("img").prop("src",function(){        
        return $URL;
    })
    $items.children().children().children().prop("src",function(){
        return $URL;
    })
    $(".small-icon").prop("src",function(){
        return $URL;
    })
    $(".nav-bar-in").children().eq(2).text($Name);
    $(".goods-title").html("<h1>"+$Name+"</h1>");
    $(".market-price").html("商&nbsp;城&nbsp;价："+"<span>"+$marketprice+"</span>");
    $(".net-price").html("商&nbsp;城&nbsp;价："+"<span>"+$price+"</span>");
});

jQuery(function($){
$('.show-box').lxzoom({width:400,height:400}).addClass('box');
$('.items').on('click','img',function(){
    $('.goods img').attr({
        'src':this.src,
        'data-big':this.dataset.big
    });
})
});

// 跳转购物车页面
jQuery(function($){
    $(".buynow").on('mouseover',function(){
        $(".buynow").attr({
            "href":"./shopcart.html"
        });
    })
});

