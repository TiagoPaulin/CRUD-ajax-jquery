<?php

    include('../includes/db_connection.php');

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {

        $id = isset($_POST['id']) ? $_POST['id'] : '';
        $name = isset($_POST['product_name']) ? $_POST['product_name'] : '';
        $description = isset($_POST['product_description']) ? $_POST['product_description'] : '';
        $value = isset($_POST['price']) ? $_POST['price'] : '';

        if (!empty($id) && !empty($name) && !empty($description) && !empty($value)) {

            $stmt = $conn->prepare("UPDATE tb_product SET product_name = ?, product_description = ?, price = ? WHERE id = ?");
            $stmt->bind_param("ssdi", $name, $description, $price, $id);

            if($stmt->execute()) {

                print "Produto atualizado com sucesso";

            } else {

                print "Erro ao atualizar o produto: " . $conn->error;

            }

        } else {

            print "Todos os campos são obrigatórios";

        }

        $conn->close();

    }

?>