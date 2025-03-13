<?php
include "config.php";

try {
    $con->beginTransaction();
    $stmt = $con->prepare("UPDATE tasks SET status = :status WHERE id = :id");
    $stmt->bindValue(':status', $_POST['status']);
    $stmt->bindValue(':id', $_POST['id']);
    $stmt->execute();
    $con->commit();
} catch (PDOException $e) {
    echo('erro:' . $e->getMessage());
}
?>

