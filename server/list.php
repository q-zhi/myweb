<?php
header("content-type:text/html;charset=utf8");
$con = mysqli_connect('localhost','root','root','test');
mysqli_query($con,"set names utf8");
$sql = "select * from goods";
$res = mysqli_query($con,$sql);
while ($row = mysqli_fetch_assoc($res)) {
    $arr[] = $row;
}
echo json_encode($arr);