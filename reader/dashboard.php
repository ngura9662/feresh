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
    <?php include '../includes/header.php'; ?>
</head>
<body>

<div class="topbar">ONLINE BOOK REVIEW SYSTEM</div>

<div class="dashboard">
    <div class="sidebar">
        <h3>MENU</h3>
        <a href="add_review.php">Add Review</a>
        <a href="view_my_reviews.php">View My Reviews</a>
        <a href="../logout.php">Logout</a>
    </div>

    <div class="main-content">
        <h2>READER DASHBOARD</h2>
        <!-- reader-specific content goes here -->
    </div>
</div>

<p class="footer">SUZA ©COPYRIGHT 2026</p>

</body>
</html>