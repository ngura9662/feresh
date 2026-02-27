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
    $stmt=$pdo->prepare("DELETE FROM reviews WHERE review_id=?");
    $stmt->execute([$_GET['delete']]);
}

$sql="SELECT reviews.*, users.full_name
      FROM reviews
      JOIN users ON users.user_id=reviews.user_id";

$reviews=$pdo->query($sql);
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>View Reviews</title>
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
        <h2>VIEW REVIEWS</h2>

        <div class="form-panel">
            <table>
            <tr>
                <th>Reader Name</th>
                <th>Book Title</th>
                <th>Review Date</th>
                <th>Action</th>
            </tr>

        <?php foreach($reviews as $r): ?>
        <tr>
            <td><?= htmlspecialchars($r['full_name']) ?></td>
            <td><?= htmlspecialchars($r['book_title']) ?></td>
            <td><?= htmlspecialchars($r['review_date']) ?></td>
            <td><a href="?delete=<?= $r['review_id'] ?>">Delete</a></td>
        </tr>
        <?php endforeach; ?>
        </table>
        </div>
    </div>
</div>

<p class="footer">SUZA ©COPYRIGHT 2026</p>

</body>
</html>