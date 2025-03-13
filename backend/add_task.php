<?php
include 'config.php';

try {
    $con->beginTransaction();
    $stmt = $con->prepare("INSERT INTO tasks (task) VALUES (:addtask)");
    $stmt->bindValue(':addtask', $_POST['addtask']);
    $stmt->execute();

    $con->commit();
} catch (PDOException $e) {
   echo('erro:' . $e->getMessage());
}
?>