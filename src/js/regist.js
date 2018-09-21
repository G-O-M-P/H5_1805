jQuery(function($){
    let $username = $("#username");
    let $password = $("#password");
    let $btnReg = $(".btnReg");
    console.log(11)
    $username.on("blur",function(){
        $.ajax({
            type: "get",
            url: "../api/check.php",
            data:{"username":$username.val()},
            async: true,
            success: function(res){
            let $formGroup = $username.parent();
            let $txt = $('.help-block');
            let $icon = $('.form-control-feedback');
            if(res === 'no'){
                $formGroup.removeClass('has-success');
                $icon.removeClass('sr-only glyphicon-ok');
                $icon.addClass('glyphicon-remove');
                $formGroup.addClass('has-error','has-feedback');
                $txt.text('用户名太受欢迎');
            }else if(res === 'yes'){
                $formGroup.removeClass('has-error');
                $icon.removeClass('sr-only','glyphicon-remove');
                $icon.addClass('glyphicon-ok');
                $formGroup.addClass('has-success','has-feedback');
                $txt.text('');
            }
            }
        })
    })
    $btnReg.on("click",function($){
        jQuery(function($){
            $.ajax({
                type: "get",
                url: "../api/reg.php",
                data:{"username":$username.val(),"password":$password.val()},
                async: true,
                success: function(res){
                    console.log(res)
                    if(res === 'success'){
                        location.href = '../index.html';
                    }else{
                        alert('注册失败');
                    }
                }
            });
        })
    })
})