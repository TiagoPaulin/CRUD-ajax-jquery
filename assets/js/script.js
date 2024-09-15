$(document).ready(function() {

    readProducts()

    function insertProduct(name, description, price) {

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

    function updateProduct(id, name, description, price) {

        $.post("../controllers/update.php", {
            id : id,
            product_name : name,
            product_description : description,
            price : price
        })
        .done(function(data) {
            $("#message").html(data);
            $("#product-form")[0].reset();
            readProducts();
        })
        .fail(function(){
            $("#message").html("Erro ao atualizar produto")
        })

    }

    function readProducts() {
        $.get("../controllers/read.php", function(data) {
            var products = JSON.parse(data);
            var tbody = $("#products tbody");
            tbody.empty();

            $.each(products, function(index, product) {
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

    function deleteProducts(id){

        $.post("../controllers/delete.php", {id : id})
        .done(function(data) {
            $("#message").html(data);
            readProducts();
        })

    }

    $(document).on("click", ".delete", function() {
        var id = $(this).data('id')
        
        deleteProducts(id);
    })

    $(document).on("click",".edit", function () {
        
        var row = $(this).closest('tr')

        var id = $(this).data('id')
        var name = row.find('td:eq(0)').text()
        var description = row.find('td:eq(1)').text()
        var price = row.find('td:eq(2)').text()

        $("#name").val(name)
        $("#description").val(description)
        $("#price").val(price)

        $("#button-submit").text("Editar").data('id', id)
        
    })

    $("#product-form").on("submit", function(event) {
        event.preventDefault();
        
        var id = $("#button-submit").data('id');
        var name = $("#name").val();
        var description = $("#description").val();
        var price = $("#price").val();

    if (id) {

        updateProduct(id, name, description, price)
        $("#button-submit").text("Cadastrar").removeData('id')

    } else {

        insertProduct(name, description, price);

    }

    });

});
