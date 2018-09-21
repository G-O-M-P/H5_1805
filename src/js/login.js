/* 
* @Author: Marte
* @Date:   2018-09-20 15:12:24
* @Last Modified by:   Marte
* @Last Modified time: 2018-09-20 19:42:29
*/
function randomcode(){
    var code = '';
    var str = 'abcdefghifklnmopqrstuvwxyz'
    for(var i=0;i<4;i++){
        random = Math.random()
        if(random>0.5){
            code += str[parseInt(Math.random()*25)]
        }
        else{
            code += parseInt(Math.random()*10);
        }
    }
    return code;
}


jQuery(function($){
    let $checkCode = $(".checkCode");
    $checkCode.html(function(){
        return randomcode()
    });
    $checkCode.on("click",function(){
        $checkCode.html(function(){
            return randomcode()
        });
    })

    $("#To-login").on("click",function(){
        if($("#account").val()!=='' && $("#password").val()!=='' && $("#captcha").val() !== $(".checkCode").text()){
            let username = $("#account").val();
            let password = $("#password").val();
            let captcha = $("#captcha").val();
            let accountMSG = {
                "username":username,
                "password":password,
                "captcha":captcha
            }
            $.ajax({
                type: "get",
                url: "../api/login.php",
                data:accountMSG,
                async: true,
                success: function(res){
                    if(res === 'success'){
                        location.href = '../index.html';
                    }else{
                        alert('登录失败');
                    }
                }
            })
        }
        else{
            alert("用户名密码不能为空或验证码错误")
            return false
        }
    })
})