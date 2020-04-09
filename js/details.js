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
var params = window.location.search;
var reg = /id=(\d+)/;
var id = params.match(reg)[1];
$(function () {
    pAjax({
        url: "./server/details.php",
        data: {
            id: id
        },
        type: "post",
    }).then(res => {
        if (res.status == 200) {
            var img = $(".swiper-slide a img");
            var data = res.data;
            var imgArr = data.smallimgs.split("====");
            var colorArr = data.colors.split("====");
            for (var i = 0; i < imgArr.length; i++) {
                $(img[i]).attr("src", imgArr[i]);
            }
            for (var i = 0; i < colorArr.length; i++) {
                var p = $("<p>" + colorArr[i] + "</p>");
                $(".color").append(p).children("p:first").addClass("checked");
            }
            var pirce2 = Number(data.price) + 400;
            $(".edition").children("p:last-child").children("span:last-child").text(data.price + "元").parent("p").prev().children("span:last-child").text(pirce2 + "元");
            $(".txt").children("h2").text(data.name).next().text(data.introduce).next().text($(".edition").children(".checked").children("span:last-child").text());
            $(".edition p").click(function () {
                $(this).addClass("checked").siblings().removeClass("checked");
                $(".txt").children("p:nth-child(3)").text($(this).children("span:last-child").text());
            });
            $(".color p").click(function () {
                $(this).addClass("checked").siblings().removeClass("checked");
            });
            $(".cart").click(function () {
                var username = getCookie("username");
                if (!username) {
                    alert("请先登录！");
                    window.location.href = "./login.html";
                    return false;
                }
                var color = $(".color .checked").text();
                var edition = $(".edition .checked span:first-child").text();
                var price = $(".edition .checked span:last-child").text();
                var data = localStorage.getItem("data");
                if (data) {
                    data = JSON.parse(data);
                    var index = data.findIndex(function (v) {
                        return v.id == id && v.color == color && v.edition == edition;
                    });
                    if (index >= 0) {
                        data[index].number++;
                    } else {
                        var obj = {
                            username: username,
                            id: id,
                            number: 1,
                            color: color,
                            edition: edition,
                            price: price
                        }
                        data.push(obj);
                    }
                    localStorage.setItem("data", JSON.stringify(data));
                } else {
                    var data = [];
                    var obj = {
                        username: username,
                        id: id,
                        number: 1,
                        color: color,
                        edition: edition,
                        price: price
                    }
                    data.push(obj);
                    localStorage.setItem("data", JSON.stringify(data));
                }
                alert("加入购物车成功！");
                window.location.href = "cart.html";
            });
            var mySwiper = new Swiper(".swiper-container", {
                direction: "horizontal",
                loop: true,
                speed: 1000,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                    type: 'bullets',
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
            })
            var box = document.querySelector(".swiper-container");
            box.onmouseenter = function () {
                mySwiper.autoplay.stop();
            }
            box.onmouseleave = function () {
                mySwiper.autoplay.start();
            }
        } else {
            alert("请求失败！请稍后重试")
        }
    })
})