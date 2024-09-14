<?php

$host = '127.0.0.1'; 
$port = '3306';     
$user = 'root';
$password = '';
$database = 'product';

$conn = new mysqli($host, $user, $password, $database, $port);

if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

session_start();

?>
