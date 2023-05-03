<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "orders";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$table = $_REQUEST['body'];
$total = $_REQUEST['total'];
$cart = $_REQUEST['cart'];
echo $table;
echo $total;
echo $cart;
// $sql = "INSERT INTO table_order (table_n, total, cart_data)
// VALUES ($table, $total, $cart)";

// if ($conn->query($sql) === TRUE) {
//     echo "New record created successfully";
// } else {
//     echo "Error: " . $sql . "<br>" . $conn->error;
// }

$conn->close();
