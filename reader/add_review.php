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
    <title>Add Review</title>
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
        <h2>ADD REVIEW</h2>

        <div class="form-panel">
            <div class="panel-header">Submit Book Review</div>

            <form action="../includes/review_handler.php" method="POST" class="form-box">
                <div class="row">
                    <label>Book Title: <span>*</span></label>
                    <input name="book_title" required placeholder="">
                </div>

                <div class="row">
                    <label>Review Text: <span>*</span></label>
                    <textarea name="review_text" required style="height: 100px;"></textarea>
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
</div>

 <?php
   include "../includes/footer.php";
   ?>

</body>
</html>