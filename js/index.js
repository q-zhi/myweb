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
var mySwiper = new Swiper(".swiper-container", {
    effect: 'fade',
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
        delay: 3000,
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
var fanhui = document.querySelector(".fanhui");
var fanhui1 = document.querySelector(".fanhui1");
window.onscroll = function () {
    var sct = document.documentElement.scrollTop || document.body.scrollTop;
    if (sct < 300) {
        fanhui.style.display = "none";
        fanhui1.style.display = "none";
    } else {
        fanhui.style.display = "block";
        fanhui1.style.display = "block";
    }
}
var rl1 = document.querySelector(".right-links1");
var rl = document.querySelector(".right-links");

function w() {
    var scr = document.body.clientWidth;
    if (scr < 1450) {
        rl1.style.display = "none";
        rl.style.display = "block";
    } else {
        rl1.style.display = "block";
        rl.style.display = "none";
    }
}
window.addEventListener("resize", w);
w();
//用户登录cookie
var username = getCookie("username");
$(".login a").click(function(){
    removeCookie("username");
    $(".login").css("display","none").children("span").text(" ");
    $(".unLogin").css("display","block");
})
if(username){
    $(".login").css("display","block").children("span").text(username);
    $(".unLogin").css("display","none");
}else{
    $(".login").css("display","none").children("span").text(" ");
    $(".unLogin").css("display","block");
}