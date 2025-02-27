<!-- filepath: /d:/Projekte/OWNWEBSITES/MAVprev/signup_process.php -->
<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

var_dump($_POST); // Debugging line

// Database connection settings
$servername = "localhost";
$dbname = "myartificialvocabs";
$dbusername = "root"; // Change this to your database username
$dbpassword = ""; // Change this to your database password

// Create connection
$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Process signup form data
$username = $_POST['username'];
$user_email = $_POST['email'];
$password = $_POST['password'];

// Hash the password for security
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $username, $user_email, $hashed_password);

// Execute the statement
if ($stmt->execute()) {
    // Redirect to verification page
    header('Location: verify.html');
    exit();
} else {
    echo "Error: " . $stmt->error;
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>