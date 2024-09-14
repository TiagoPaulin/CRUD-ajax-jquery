$(document).ready(function() {
    function testeAJAX() {
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
            loadProducts(); 
        })
        .fail(function() {
            $("#message").html('Erro ao cadastrar produto: ');
        });
    }
    $("#product-form").on("submit", function(event) {
        event.preventDefault(); 
        testeAJAX(); 
    });
})