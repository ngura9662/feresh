<?php
session_start();
require '../dbconfig.php';

$username = $_POST['username'];
$password = md5($_POST['password']);

$stmt = $pdo->prepare("SELECT * FROM users WHERE username=? AND password=?");
$stmt->execute([$username,$password]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if($user){
    $_SESSION['user_id'] = $user['user_id'];
    $_SESSION['username'] = $user['username'];
    $_SESSION['role'] = $user['user_role'];

    if($user['user_role']=="admin")
        header("Location: ../admin/dashboard.php");
    else
        header("Location: ../reader/dashboard.php");
}else{
    header("Location: ../index.php?error=1");
}