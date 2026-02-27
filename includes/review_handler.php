<?php
session_start();
require '../dbconfig.php';

$user_id=$_SESSION['user_id'];
$title=$_POST['book_title'];
$text=$_POST['review_text'];
$date=date("Y-m-d");

$stmt=$pdo->prepare(
"INSERT INTO reviews(user_id,book_title,review_text,review_date)
 VALUES(?,?,?,?)");

$stmt->execute([$user_id,$title,$text,$date]);

header("Location: ../reader/view_my_reviews.php");