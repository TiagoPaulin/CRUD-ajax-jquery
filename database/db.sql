CREATE DATABASE product;

USE product;

CREATE TABLE tb_product (

    id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL

);