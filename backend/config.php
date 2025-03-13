<?php

$hostname = 'localhost';
$database = 'todo_list_db';
$username = 'root';
$password = '190608';

try {
    $con = new PDO("mysql:host=$hostname;dbname=$database", $username, $password);
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo("Não foi possível estabelecer a conexão com o banco de dados: " . $e->getMessage());
}
?>