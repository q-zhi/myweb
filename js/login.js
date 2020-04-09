var username = document.querySelector("[type='text']");
var span =document.querySelector("span");
var btn = document.querySelector("button");
var password = document.querySelector("[type='password']");
btn.onclick = function () {
    if (username.value.trim() == "") {
        span.innerText = "用户名不能为空！";
        return false;
    }
    if (password.value.trim() == "") {
        span.innerText = "密码不能为空！";
        return false;
    }
    pAjax({
        url: "./server/login.php",
        type: "post",
        data: {
            username: username.value.trim(),
            password: password.value.trim()
        }
    }).then(res => {
        if (res.status == 200) {
            setCookie("username", username.value.trim(),3600);
            alert(res.msg);
            location.href = "./home.html"
        } else if (res.status == 3) {
            span.innerText = res.msg;
        } else if (res.status == 4) {
            span.innerText = res.msg;
        }
    })
}