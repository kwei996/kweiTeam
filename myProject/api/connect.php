<?php

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "project";
    $conn = new mysqli($servername,$username,$password,$dbname);
    if($conn->connect_error){
        die("连接失败: " . $conn->connect_error);
    }
    // echo "连接成功";
?>