<?php
require '../dbconfig.php';

$username=$_POST['username'];
$fullname=$_POST['full_name'];
$password=md5($_POST['password']);
$role=$_POST['role'];

$stmt=$pdo->prepare(
"INSERT INTO users(username,password,user_role,full_name)
 VALUES(?,?,?,?)");

$stmt->execute([$username,$password,$role,$fullname]);

header("Location: ../admin/view_users.php");