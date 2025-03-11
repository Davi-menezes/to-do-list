<?php
include "config.php";

$con->beginTransaction();
$stmt = $con->prepare("UPDATE tasks SET task = ':addtask' WHERE id = ?");
$stmt->bindValue(':addtask', $_POST['addtask']);
$stmt->execute();