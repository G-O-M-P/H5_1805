"use strict";

jQuery(function ($) {
    var $username = $("#username");
    var $password = $("#password");
    var $btnReg = $(".btnReg");
    console.log(11);
    $username.on("blur", function () {
        $.ajax({
            type: "get",
            url: "../api/check.php",
            data: { "username": $username.val() },
            async: true,
            success: function success(res) {
                var $formGroup = $username.parent();
                var $txt = $('.help-block');
                var $icon = $('.form-control-feedback');
                if (res === 'no') {
                    $formGroup.removeClass('has-success');
                    $icon.removeClass('sr-only glyphicon-ok');
                    $icon.addClass('glyphicon-remove');
                    $formGroup.addClass('has-error', 'has-feedback');
                    $txt.text('用户名太受欢迎');
                } else if (res === 'yes') {
                    $formGroup.removeClass('has-error');
                    $icon.removeClass('sr-only', 'glyphicon-remove');
                    $icon.addClass('glyphicon-ok');
                    $formGroup.addClass('has-success', 'has-feedback');
                    $txt.text('');
                }
            }
        });
    });
    $btnReg.on("click", function ($) {
        jQuery(function ($) {
            $.ajax({
                type: "get",
                url: "../api/reg.php",
                data: { "username": $username.val(), "password": $password.val() },
                async: true,
                success: function success(res) {
                    console.log(res);
                    if (res === 'success') {
                        location.href = '../index.html';
                    } else {
                        alert('注册失败');
                    }
                }
            });
        });
    });
});