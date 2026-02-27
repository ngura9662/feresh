<?php session_start(); ?>

<!DOCTYPE html>

<html>
<head>
<meta charset="UTF-8">
<title>Online Book Review System</title>

<link rel="stylesheet" href="assets/css/style.css">

</head>
<body>

<!-- SYSTEM TITLE -->

<h2 class="main-title">ONLINE BOOK REVIEW SYSTEM</h2>

<!-- LOGIN BOX -->

<div class="login-container">

<div class="login-header">
    LOGIN
</div>

<div class="login-body">

    <?php
    if(isset($_GET['error'])){
        echo '<p class="error">Invalid username or password</p>';
    }
    ?>

    <form action="includes/login_hander.php" method="POST">

        <label>Username: <span>*</span></label>
        <input type="text" name="username" required >

        <label>Password: <span>*</span></label>
        <input type="password" name="password" required>

        <button id="log" type="submit">Login</button>

    </form>

</div>

</div>

<!-- FOOTER -->

<p class="footer">SUZA ©LICOYRIGHT 2026</p>

</body>
</html>
