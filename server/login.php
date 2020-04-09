<?php
header("content-type:text/html;charset=utf8");
$username = $_POST["username"];
$password = $_POST["password"];
$con = mysqli_connect("localhost","root","root","test");
mysqli_query($con,"set names utf8");
$res = mysqli_query($con,"select * from user where username='$username'");
$row = mysqli_fetch_assoc($res);
if($row){
    $sql = "select * from user where username='$username' and password='$password'";
    $res = mysqli_query($con,$sql);
    $row = mysqli_fetch_assoc($res);
    if($row){
        $arr = [
            "msg"=>"登陆成功",
            "status"=>200
        ];
    }else{
        $arr = [
            "msg"=>"登陆失败",
            "status"=>4
        ];
    }
}else{
    $arr = [
        "msg"=>"用户名不存在",
        "status"=>3
    ];
}
echo json_encode($arr);