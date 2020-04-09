<?php
header("content-type:text/html;charset=utf8");
$ids = $_POST["ids"];
$con = mysqli_connect('localhost','root','root','test');
mysqli_query($con,"set names utf8");
$sql = "select * from goods where id in($ids)";
$res = mysqli_query($con,$sql);
$arr = [];
while($row = mysqli_fetch_assoc($res)){
    $arr[] = $row;
}
if(count($arr)>0){
    $result = [
        "status"=>200,
        "msg"=>"ok",
        "data"=>$arr
    ];
}else{
    $result = [
        "status"=>404,
        "msg"=>"data is not found",
    ];
}
echo json_encode($result);