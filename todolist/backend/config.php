<?php
try {
    $con = new PDO("mysql:host=localhost;dbname=todo_list_db", "root", "",);
        $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo("Não foi possível estabelecer a conexão com o banco de dados: " . $e->getMessage());
}