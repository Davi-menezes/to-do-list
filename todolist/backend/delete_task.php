<?php
include "config.php";

try {
$con->beginTransaction();
$stmt = $con->prepare("DELETE FROM tasks WHERE id = :id");
$stmt = $pdo->prepare($sql);
$stmt->execute($_POST['id']);
} catch (PDOException $e) {
    echo ("erro: " . $e->getMessage());
}
