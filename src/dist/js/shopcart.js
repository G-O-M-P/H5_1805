"use strict";

// 根据cookie生成内容
jQuery(function ($) {
	var $cookies = $.cookie("data");
	var $goodsNo = $.cookie("goodsNo").split("&");
	var $innerhtml = "\n\t<li class=\"clearfix\">\n        <p class=\"col goods\">\u5546\u54C1</p>\n        <p class=\"col price\">\u5355\u4EF7</p>\n        <p class=\"col amount\">\u6570\u91CF</p>\n        <p class=\"col count\">\u5C0F\u8BA1</p>\n        <p class=\"col action\">\u64CD\u4F5C</p>\n    </li>";
	$cookies = JSON.parse($cookies);
	var $URL = '',
	    $Name = '',
	    $price = void 0;
	for (var i = 1; i < $goodsNo.length; i++) {
		for (var j = 0; j < $cookies.length; j++) {
			if ($cookies[j].goodsNo === Number($goodsNo[i])) {
				$URL = $cookies[j].imgurl;
				$Name = $cookies[j].name;
				$URL = '../' + $URL;
				$price = $cookies[j].price.substring(1);
				$innerhtml += "\n\t\t\t    \t<li class=\"clearfix con\">\n\t\t\t\t\t    <p class=\"good_check\"><input type=\"checkbox\" name=\"good\" value=\"\" /></p>\n\t\t\t\t\t    <p class=\"goods_pic\"><img src=\"../" + $URL + "\"></p>\n\t\t\t\t\t    <p class=\"good_name\">" + $Name + "</p>\n\t\t\t\t\t    <p class=\"good_price\">\uFFE5&nbsp;" + $price + "</p>\n\t\t\t\t\t    <p class=\"num\">\n\t\t\t\t\t        <span class=\"cutnum\">-</span>\n\t\t\t\t\t        <input class=\"nownum\" type=\"text\" value=\"1\" />\n\t\t\t\t\t        <span class=\"addnum\">+</span>\n\t\t\t\t\t    </p>\n\t\t\t\t\t    <p class=\"good_total\">\uFFE5&nbsp;" + $price + "</p>\n\t\t\t\t\t    <p class=\"good_del\">\n\t\t\t\t\t        <a href=\"javascript:;\">\u5220\u9664</a>\n\t\t\t\t\t    </p>\n\t\t\t\t\t</li>";
			}
		}
	}
	$("#cart").html($innerhtml);
});

$(function () {

	$('#cart').on('click', '.addnum', function () {
		var val = $(this).prev().val();
		val++;
		if (val >= 100) {
			val = 100;
		}
		$(this).prev().val(val);
		price($(this));
		var arr = checknum();
		allnum(arr);
		allprice(arr);
	});

	//减数量
	$('#cart').on('click', '.cutnum', function () {
		var val = $(this).next().val();
		val--;
		if (val <= 1) {
			val = 1;
		}
		$(this).next().val(val);
		price($(this));
		var arr = checknum();
		allnum(arr);
		allprice(arr);
	});

	//小计
	function price(now) {
		var pri = now.parent().prev().text();
		pri = $.trim(pri);
		pri = pri.substring(2);
		var num = now.parent().find('input').val();
		var all = pri * num;

		now.parent().next().html('￥&nbsp;' + all.toFixed(2));
	}

	//删除单行
	$('#cart').on('click', '.good_del', function () {
		var mes = confirm('您确定要删除该行吗？');
		console.log(mes);
		if (mes) {
			$(this).parent().remove();
		}
		update();
	});

	function update() {
		if ($('.addnum').size() == 0) {
			$('#del').remove();
		}
	}

	//全选
	var ischecked = true;
	$('#allchecked').on('click', function () {
		if (ischecked) {
			$('#allchecked input').prop('checked', 'checked');
			$('.good_check input').prop('checked', 'checked');
		} else {
			$('#allchecked input').removeAttr('checked');
			$('.good_check input').removeAttr('checked');
		}
		ischecked = !ischecked;
	});

	//全删
	$('#delall').on('click', function () {
		var arr = checknum();

		var mes = confirm('您确定要删除多行吗？');
		if (mes) {
			for (var i = arr.length - 1; i >= 0; i--) {
				$('.good_check').eq(arr[i]).parent().remove();
			}
			update();
		}
		console.log(arr);
	});

	//勾选的数量
	function checknum() {
		var arr = [];
		var le = $('.good_check input').length;
		for (var i = 0; i < le; i++) {
			if ($('.good_check input').eq(i).prop('checked')) {
				arr.push(i);
			}
		}
		return arr;
	}

	//全选补充
	$('#cart').on('click', '.good_check', function () {
		var arr = checknum(); //被勾选的
		if (arr.length == $('.good_check').length) {
			$('#allchecked input').prop('checked', 'checked');
		} else {
			$('#allchecked input').removeAttr('checked');
		}

		//总数量
		allnum(arr);
		//总价格
		allprice(arr);
	});

	//数量
	function allnum(arr) {
		var num = 0;
		for (var i = 0; i < arr.length; i++) {
			num += parseInt($('.nownum').eq(arr[i]).val());
		}
		$('#allnum').html('已选 ' + num + '件商品');
		//		console.log(123);
	}

	function allprice(arr) {
		var price = 0;
		for (var i = 0; i < arr.length; i++) {
			var nowpri = $('.good_total').eq(arr[i]).text();
			nowpri = $.trim(nowpri);
			nowpri = nowpri.substring(2);
			price += parseInt(nowpri);
		}
		$('#totalprice').html('总计（不含运费）：￥' + price.toFixed(2));
	}
});