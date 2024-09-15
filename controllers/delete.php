<?php

include('../includes/db_connection.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    
    if (isset($_POST['id'])) {
        $id = $_POST['id']; 

        
        $stmt = $conn->prepare("DELETE FROM tb_product WHERE id = ?");
        $stmt->bind_param('i', $id);

        if ($stmt->execute()) {
            echo "Produto excluído com sucesso";
        } else {
            echo "Erro ao excluir produto";
        }

        $stmt->close(); 
    } else {
        echo "ID do produto não fornecido";
    }

    $conn->close(); 

} else {
    echo "Método de requisição inválido";
}

?>
