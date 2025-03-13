<?php
include "config.php";

try {
    $con->beginTransaction();
    $stmt = $con->prepare("DELETE FROM tasks WHERE id = :id");
    $stmt->bindValue(':id', $_POST['id']);
    $stmt->execute();
    $con->commit();
} catch (PDOException $e) {
    echo ("erro: " . $e->getMessage());
}
?>
