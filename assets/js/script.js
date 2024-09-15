$(document).ready(function() {

    readProducts()

    function insertProduct() {
        var name = $("#name").val();
        var description = $("#description").val();
        var price = $("#price").val();

        $.post("../controllers/create.php", {
            product_name: name,
            product_description: description,
            price: price
        })
        .done(function(data) {
            $("#message").html(data);
            $('#product-form')[0].reset();
            readProducts(); 
        })
        .fail(function() {
            $("#message").html('Erro ao cadastrar produto');
        });
    }

    function readProducts() {
        $.get("../controllers/read.php", function(data) {
            var products = JSON.parse(data);
            var tbody = $("#products tbody");
            tbody.empty();

            $.each(products, function(product) {
                var row = $('<tr></tr>');
                row.append(`<td>${product.product_name}</td>`);
                row.append(`<td>${product.product_description}</td>`);
                row.append(`<td>${product.price}</td>`);
                row.append(`<td><button class="edit" data-id="${product.id}">Editar</button></td>`);
                row.append(`<td><button class="delete" data-id="${product.id}">Excluir</button></td>`);
                tbody.append(row);
            });
        })
        .fail(function() {
            $("#message").html('Erro ao carregar produtos');
        });
    }

    $(document).on("click", ".delete", function() {
        var id = $(this).data('id')
        $.post("../controllers/delete.php", {id : id})
        .done(function(data) {
            $("#message").html(data)
            readProducts()
        })
    })

    $("#product-form").on("submit", function(event) {
        event.preventDefault(); 
        insertProduct(); 
    });

});
