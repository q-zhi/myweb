/**
 * 发送ajax的函数
 * @param {1} obj 参数
 *      obj.url         表示请求的路径，必选项
 *      obj.type        表示请求方式，可选项，默认是get
 *      obj.async       表示是否异步，可选项，默认是异步
 *      obj.data        请求携带的数据(请求体),可选项，没有默认值
 *      obj.dataType    请求希望返回的数据类型，可选项，默认为json
 */
function pAjax(obj) {
    return new Promise(function (resolve, reject) {
        if (!obj.url) {
            throw new Error("请求的url不能为空");
        }
        if (Object.prototype.toString.call(obj.url) != '[object String]') {
            throw new Error("请求的url不是一个正确的url");
        }
        if (obj.type == "get") {
            obj.url += "?" + obj.data;
        }
        if (!obj.type) {
            obj.type = "get";
        }
        if (obj.type != "get" && obj.type != "post") {
            throw new Error("请求方式的参数必须是get或post");
        }
        if (obj.async == undefined) {
            obj.async = true;
        }
        if (Object.prototype.toString.call(obj.async) != '[object Boolean]') {
            throw new Error("是否异步的参数必须是一个布尔值");
        }
        if (obj.data) {
            if (Object.prototype.toString.call(obj.data) == '[object String]' && obj.data.indexOf("=") != -1) {
                obj.data = obj.data;
            } else if (Object.prototype.toString.call(obj.data) == '[object Object]') {
                var data = '';
                var f = '';
                for (var attr in obj.data) {
                    data += f + attr + "=" + obj.data[attr];
                    f = "&";
                }
                obj.data = data;
            } else {
                throw new Error("传入的数据类型不正确，只接受字符串或对象");
            }
        }
        if (!obj.dataType) {
            obj.dataType = "json"
        }
        if (obj.dataType != "json" && obj.dataType != "string") {
            throw new Error("想要的数据类型参数不正确，只接受json或string");
        }
        var xhr;
        try {
            xhr = new XMLHttpRequest();
        } catch (e) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.open(obj.type, obj.url, obj.async);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    res = xhr.responseText;
                    if (obj.dataType === "json") {
                        res = JSON.parse(res);
                    }
                    resolve(res);
                } else {
                    reject();
                }
            }
        }
        if (obj.type === "post") {
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            if (obj.data) {
                xhr.send(obj.data);
                return;
            }
        }
        xhr.send();
    })
}
/***************************调用模板*****************************/
// pAjax({
//     url:"3-demo.php", // 必须传
//     type:"get/post", // 可选项，默认是get
//     async:true/false, // 可选项，默认是true
//     data:"键=值&键=值", // 可以是字符串但要包含=是键值对的形式，或者是对象
//     data:{
//         键:值,
//         键:值
//     },
//     dataType:"json/string", // 可选项，默认是json
// }).then(function(res){
//     caches.delete(res);
// });