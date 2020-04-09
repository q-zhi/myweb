$(".nav_active").hover(function () {
    $(this).children("div").slideDown();
}, function () {
    $(this).children("div").css("display", "none");
});
$(".nav form input").focus(function () {
    $(this).css("border-color", "#FF4500").next().css("border-color", "#FF4500").next().css("display", "none").next().css("display", "block");
});
$(".nav form input").blur(function () {
    var that = $(this);
    setTimeout(function () {
        that.css("border-color", "#e0e0e0").next().css("border-color", "#e0e0e0").next().css("display", "block").next().css("display", "none");
    }, 500);
})
var username = getCookie("username");
$(".login a").click(function () {
    removeCookie("username");
    $(".login").css("display", "none").children("span").text(" ");
    $(".no-login").css("display", "block");
})
if (username) {
    $(".login").css("display", "block").children("span").text(username);
    $(".no-login").css("display", "none");
} else {
    $(".login").css("display", "none").children("span").text(" ");
    $(".no-login").css("display", "block");
}
$(function () {
    pAjax({
        url: "./server/list.php",
        type: "post",
    }).then(res => {
        var total = res.length;
        var pageSize = 10;
        new Page({
            pageData: {
                total: total,
                pageSize: pageSize
            },
            language: {
                first: "首页",
                previous: "上一页",
                next: "下一页",
                last: "尾页"
            }
        }, function (currentPage) {
            var str = "";
            var arr = res.slice((currentPage - 1) * pageSize, currentPage * pageSize);
            for (var i = 0; i < arr.length; i++) {
                str += `
                    <li><a href="details.html?id=${arr[i].id}">
                        <img src="${arr[i].imgpath}" width="160px" height="110px">
                        <p>${arr[i].name}</p>
                    </a></li>
                        `
            }
            document.querySelector(".shopp ul").innerHTML = str;
        })
        $(".box").css({
            border: "none",
            margin: "0 auto"
        });
    })
})