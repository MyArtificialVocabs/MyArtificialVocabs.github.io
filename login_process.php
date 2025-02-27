<!-- filepath: /d:/Projekte/OWNWEBSITES/MAVprev/login_process.php -->
<?php
// Start the session
session_start();

// Process login form data
$username = $_POST['username'];
$password = $_POST['password'];

// Retrieve stored user data from local storage (simulated here for demonstration)
$stored_username = "<script>document.write(localStorage.getItem('username'));</script>";
$stored_password = "<script>document.write(localStorage.getItem('password'));</script>";

// Check if the username and password match the stored values
if ($username === $stored_username && $password === $stored_password) {
    // Redirect to MAVlearn.html
    header('Location: MAVlearn.html');
    exit();
} else {
    echo 'Invalid username or password.';
}
?>