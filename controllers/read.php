<?php

    include('../includes/db_connection.php');

    $sql = "SELECT * FROM tb_product";
    $result = $conn->query($sql);

    $products = array();
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }

    print json_encode($products);

?>
