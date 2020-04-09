var flag = true;
var username = getCookie("username");
$(".login a").click(function(){
    removeCookie("username");
    $(".login").css("display","none").children("span").text(" ");
    $(".no-login").css("display","block");
})
if(username){
    $(".login").css("display","block").children("span").text(username);
    $(".no-login").css("display","none");
    flag = true;
}else{
    $(".login").css("display","none").children("span").text(" ");
    $(".no-login").css("display","block");
    flag = false;
}
if(flag){
    var data = localStorage.getItem("data");
    if(!data || data == "[]"){
        $(".main").css("display","none").next().css("display","block");
    }else{
        $(".main").css("display","block").next().css("display","none");
        data = JSON.parse(data);
        var idArr = data.map(function(v){
            return v.id;
        });
        var ids = idArr.join(",");
        pAjax({
            url: "./server/cart.php",
            type: "post",
            data: {
                ids:ids
            }
        }).then(res => {
            if (res.status == 200) {
                res = res.data;
                var str = "";
                for(var i = 0; i<res.length; i++){
                    for(var j = 0; j<data.length; j++){
                        if(data[j].id==res[i].id){
                            str +=`
                            <tr data-id="${data[j].id}" data-color="${data[j].color}" data-edition="${data[j].introduce}">
                                <td class="checkOne"><input type="checkbox" class="one"></td>
                                <td><img src=${res[i].imgpath} width="100" height="70"></td>
                                <td>${res[i].name}&nbsp;&nbsp;${data[j].introduce}&nbsp;&nbsp;${data[j].color}</td>
                                <td>${data[j].price}</td>
                                <td>
                                    <a href="javaScript:;" class="jian">-</a>
                                    <span  class="number" data-stock="${res[i].stock}">${data[j].number}</span>
                                    <a href="javaScript:;" class="add">+</a>
                                </td>
                                <td>${parseInt(data[j].price)*data[j].number}元</td>
                                <td><button class="remove">删除购物车</button></td>
                            </tr>
                            `
                        }
                    }
                }
                $("tbody").html(str);
                $(".checkAll").click(function(){
                    if($(this).prop("checked")){
                        $(".one").prop("checked",true);
                    }else{
                        $(".one").prop("checked",false);
                    }
                    total()
                });
                $(".one").click(function(){
                    var xuan = Array.prototype.slice.call($(".one")).every(function(v){
                        return $(v).prop("checked");
                    });
                    if(xuan){
                        $(".checkAll").prop("checked",true);
                    }else{
                        $(".checkAll").prop("checked",false);
                    }
                    total()
                });
                $(".jian").click(function(){
                    $(this).next().text($(this).next().text()-0-1);
                    if($(this).next().text()-0<=1){
                        $(this).next().text(1)
                    }
                    var that  = $(this);
                    var brr = data.find(function(v){
                        return v.id == that.parents("tr").attr("data-id")&v.color == that.parents("tr").attr("data-color")&v.edition == that.parents("tr").attr("data-edition");
                    });
                    brr.number = $(this).next().text()-0;
                    localStorage.setItem("data",JSON.stringify(data));
                    total()
                });
                $(".add").click(function(){
                    $(this).prev().text($(this).prev().text()-0+1);
                    var stock = $(this).prev().attr("data-stock");
                    if($(this).prev().text()-0>=stock){
                        $(this).prev().text(stock);
                    }
                    var that  = $(this);
                    var brr = data.find(function(v){
                        return v.id == that.parents("tr").attr("data-id")&v.color == that.parents("tr").attr("data-color")&v.edition == that.parents("tr").attr("data-edition");
                    });
                    brr.number = $(this).prev().text()-0;
                    localStorage.setItem("data",JSON.stringify(data));
                    total()
                });
                total();
                $(".remove").click(function(){
                    var that = $(this).parents("tr");
                    var index = data.findIndex(function(v){
                        return v.id == that.attr("data-id")&v.color == that.attr("data-color")&v.edition == that.attr("data-edition");
                    });
                    data.splice(index,1);
                    localStorage.setItem("data",JSON.stringify(data));
                    $(this).parents("tr").remove();
                    if(data.length==0){
                        $(".empty").css("display","block").prev().css("display","none");
                    }
                    total();
                });
            } else{
                alert("数据拉取失败请稍后重试！");
            }
        });
    }
}
function total(){
    var totalNum = 0;
    var totalPrice = 0;
    $(".number").each(function(i,v){
        $(v).parent().next().text(parseInt($(v).parent().prev().text())*$(v).text());
        if($(v).parent().siblings(".checkOne").children(".one").prop("checked")){
            totalNum += $(v).text()-0;
            totalPrice += $(v).parent().next().text()-0;
        }
    });
    $(".totalNum").text(totalNum+"件");
    $(".totalPrice").text(totalPrice+"元");
}