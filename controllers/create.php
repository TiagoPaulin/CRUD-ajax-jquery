<?php

    include('../includes/db_connection.php');


    if ($_SERVER['REQUEST_METHOD'] === 'POST') {

        $name = isset($_POST['product_name']) ? $_POST['product_name'] : '';
        $description = isset($_POST['product_description']) ? $_POST['product_description'] : '';
        $price = isset($_POST['price']) ? $_POST['price'] : '';


        if (!empty($name) && !empty($description) && !empty($price)) {

            $stmt = $conn->prepare("INSERT INTO tb_product (product_name, product_description, price) VALUES (?, ?, ?)");
            $stmt->bind_param('ssd', $name, $description, $price);

            if ($stmt->execute()) {
                print "Produto cadastrado com sucesso!";
            } else {
                print "Erro ao cadastrar o produto: " . $conn->error;
            }

            $stmt->close();
        } else {
            print "Todos os campos são obrigatórios!";
        }

        $conn->close();
    } else {
        print "Método de requisição inválido!";
    }
?>
