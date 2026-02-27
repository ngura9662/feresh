<?php
session_start();
if($_SESSION['role']!="admin") header("Location: ../index.php");
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Admin Dashboard</title>
    <?php include '../includes/header.php'; ?>
</head>
<body>

<div class="topbar">ONLINE BOOK REVIEW SYSTEM</div>

<div class="dashboard">
    <div class="sidebar">
        <h3>MENU</h3>
        <a href="add_user.php">Add User</a>
        <a href="view_users.php">View Users</a>
        <a href="view_reviews.php">View Reviews</a>
        <a href="../logout.php">Logout</a>
    </div>

    <div class="main-content">
        <h2>Admin Dashboard</h2>
        <!-- additional admin dashboard information could go here -->
    </div>
</div>

<p class="footer">SUZA ©COPYRIGHT 2026</p>

</body>
</html>