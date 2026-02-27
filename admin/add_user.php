<?php
session_start();
if(
    !isset($_SESSION['role']) ||
    $_SESSION['role'] !== "admin"
) {
    header("Location: ../index.php");
    exit;
}
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Add User</title>
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
        <h2>ADD USER</h2>

        <div class="form-panel">
            <div class="panel-header">Create New User</div>

            <form action="../includes/user_handler.php" method="POST" class="form-box">
                <div class="row">
                    <label>Username: <span>*</span></label>
                    <input name="username" required placeholder="">
                </div>

                <div class="row">
                    <label>Full Name: <span>*</span></label>
                    <input name="full_name" required placeholder="">
                </div>

                <div class="row">
                    <label>Password: <span>*</span></label>
                    <input type="password" name="password" required>
                </div>

                <div class="row">
                    <label>Role: <span>*</span></label>
                    <select name="role" required>
                        <option value="">--Select Role--</option>
                        <option value="admin">Admin</option>
                        <option value="reader">Reader</option>
                    </select>
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
</div>

<p class="footer">SUZA ©COPYRIGHT 2026</p>

</body>
</html>