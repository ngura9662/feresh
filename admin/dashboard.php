<?php
session_start();
if($_SESSION['role']!="admin") header("Location: ../index.php");
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Admin Dashboard</title>
    <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>

        <?php
             include "../includes/header.php";
         ?>

        <div class="dashboard">
                <div class="sidebar">
                    <h3 style="padding-left: 15px; ;">MENU</h3>
                    <a href="add_user.php">Add User</a>
                    <a href="view_users.php">View Users</a>
                    <a href="view_reviews.php">View Reviews</a>
                    <a href="../logout.php">Logout</a>
                </div>

                <div class="main-content">
                        <h2>ADMIN DASHBOARD</h2>
                </div>
        </div>


        <?php
        include "../includes/footer.php";
        ?>
</body>
</html>