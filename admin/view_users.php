<?php
session_start();
if(
    !isset($_SESSION['role']) ||
    $_SESSION['role'] !== "admin"
) {
    header("Location: ../index.php");
    exit;
}

require '../dbconfig.php';

if(isset($_GET['delete'])){
    $stmt=$pdo->prepare("DELETE FROM users WHERE user_id=?");
    $stmt->execute([$_GET['delete']]);
}

$users=$pdo->query("SELECT * FROM users");
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>View Users</title>
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
        <h2>VIEW USERS</h2>

        <div class="form-panel">
            <table>
        <tr>
            <th>Username</th>
            <th>Full Name</th>
            <th>Role</th>
            <th>Action</th>
        </tr>

        <?php foreach($users as $u): ?>
        <tr>
            <td><?= htmlspecialchars($u['username']) ?></td>
            <td><?= htmlspecialchars($u['full_name']) ?></td>
            <td><?= htmlspecialchars($u['user_role']) ?></td>
            <td class="user-delete"><a href="?delete=<?= $u['user_id'] ?>">Delete</a></td>
        </tr>
        <?php endforeach; ?>
        </table>
        </div>
    </div>
</div>

<p class="footer">SUZA ©COPYRIGHT 2026</p>

</body>
</html>