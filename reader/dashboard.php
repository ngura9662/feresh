<?php
session_start();
if(
    !isset($_SESSION['role']) ||
    $_SESSION['role'] !== "reader"
) {
    header("Location: ../index.php");
    exit;
}
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Reader Dashboard</title>
    <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>

<?php
      include "../includes/header.php";
    ?>

<div class="dashboard">
    <div class="sidebar">
        <h3>MENU</h3>
        <a href="add_review.php">Add Review</a>
        <a href="view_my_reviews.php">View My Reviews</a>
        <a href="../logout.php">Logout</a>
    </div>

    <div class="main-content">
        <h2>READER DASHBOARD</h2>
    </div>
</div>

 <?php
   include "../includes/footer.php";
   ?>

</body>
</html>