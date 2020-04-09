<?php
header("content-type:text/html;charset=utf8");
$id = $_POST["id"];
$con = mysqli_connect('localhost','root','root','test');
mysqli_query($con,"set names utf8");
$sql = "select * from goods where id = $id";
$res = mysqli_query($con,$sql);
$row = mysqli_fetch_assoc($res);
if($row){
    $arr = [
        "status"=>200,
        "msg"=>"ok",
        "data"=>$row
    ];
}else{
    $arr = [
        "status"=>404,
        "msg"=>"data is not found"
    ];
}
echo json_encode($arr);