<?php
include "config.php";

try {
$stmt = $con->prepare("SELECT * FROM tasks");
$stmt->execute();
$tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($tasks);
} catch (PDOException $e) {
    echo("erro: " . $e);
}
