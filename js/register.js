var btn = document.querySelector("button");
var span = document.querySelector("span");
btn.onclick = function () {
    var username = document.querySelector("#username").value.trim();
    var password = document.querySelector("#password").value.trim();
    var repassword = document.querySelector("#repassword").value.trim();
    var tel = document.querySelector("#tel").value.trim();
    if (username == "") {
        span.innerText = "用户名不能为空！";
        return false;
    }
    if (username.length < 4 || username.length > 8) {
        span.innerText = "用户名长度在4~8位！";
        return false;
    }
    if (password == "") {
        span.innerText = "密码不能为空！";
        return false;
    }
    if (password.length < 6 || password.length > 9) {
        span.innerText = "密码长度在6~9位！";
        return false;
    }
    if (repassword == "") {
        span.innerText = "确认密码不能为空！";
        return false;
    }
    if (repassword.length < 6 || repassword.length > 9) {
        span.innerText = "确认密码长度在6~9位！";
        return false;
    }
    if (repassword != password) {
        span.innerText = "两次密码不一致！";
        return false;
    }
    if(tel == ''){
        tel.parentElement.nextElementSibling.innerText = "手机号不能为空";
        return false;
    }
    var telReg = /^1[34578]\d{9}$/;
    if(!telReg.test(tel)){
        tel.parentElement.nextElementSibling.innerText = "请输入正确的手机号";
        return false;
    }
    pAjax({
        type: "post",
        url: "./server/register.php",
        data: {
            username: username,
            password: password,
            tel: tel,
        },
    }).then(res => {
        if (res.status == 200) {
            alert(res.msg);
            location.href = "login.html"
        } else if (res.status == 4) {
            alert(res.msg);
        } else if (res.status == 3) {
            alert(res.msg);
        }
    });
}