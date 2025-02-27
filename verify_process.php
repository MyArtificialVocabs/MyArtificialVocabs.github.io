<!-- filepath: /d:/Projekte/OWNWEBSITES/MAVprev/verify_process.php -->
<?php
// Process verification form data
$verification_code = $_POST['verification_code'];

// Check if the verification code is correct
if ($verification_code === '888888') {
    // Redirect to MAVlearn.html
    header('Location: MAVlearn.html');
    exit();
} else {
    echo 'Invalid verification code.';
}
?>