<?php
session_start();
if(
    !isset($_SESSION['role']) ||
    $_SESSION['role'] !== "reader"
) {
    header("Location: ../index.php");
    exit;
}

require '../dbconfig.php';

if(isset($_GET['delete'])){
    $stmt=$pdo->prepare("DELETE FROM reviews WHERE review_id=?");
    $stmt->execute([$_GET['delete']]);
}

$stmt=$pdo->prepare("SELECT * FROM reviews WHERE user_id=?");
$stmt->execute([$_SESSION['user_id']]);
$reviews=$stmt->fetchAll();
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>View My Reviews</title>
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
        <h2>VIEW MY REVIEWS</h2>

        <div class="form-panel">
            <table>
            <tr>
                <th>Book Title</th>
                <th>Review Date</th>
                <th>Action</th>
            </tr>

            <?php foreach($reviews as $r): ?>
            <tr>
                <td><?= htmlspecialchars($r['book_title']) ?></td>
                <td><?= htmlspecialchars($r['review_date']) ?></td>
                <td><a href="?edit=<?= $r['review_id'] ?>">Edit</a> <a href="?delete=<?= $r['review_id'] ?>">Delete</a></td>
            </tr>
            <?php endforeach; ?>
            </table>
        </div>
    </div>
</div>

 <?php
   include "../includes/footer.php";
   ?>

</body>
</html>