const loadAllCustomerCode = () => {
    $('#customer_id').empty();
    $('#customer_id').append("<option selected>Select customer code</option>");

    $.ajax({
        url: "http://localhost:8081/JavaEE_Assignment_war_exploded/customer",
        method: "GET",
        dataType: "json",
        success: function (resp) {
            console.log(resp);
            for (const customer of resp) {
                let option = `<option data-name="${customer.name}">${customer.customer_id}</option>`;
                $("#customer_id").append(option);
            }
        },
        error: function (xhr, exception) {
            console.log("Error loading customer codes:", exception);
        }
    });
}
$('#customer_id').change((e) => {
    const customer_id = e.target.value;
    if ('Select customer code' !== customer_id) {
        const name = e.target.options[e.target.selectedIndex].dataset.name;

        $('#customer_name').val(name);
    }
})
loadAllCustomerCode();



const loadAllItemCode = () => {
    $('#order_item_id').empty();
    $('#order_item_id').append("<option selected>Select item code</option>");

    $.ajax({
        url: "http://localhost:8081/JavaEE_Assignment_war_exploded/item",
        method: "GET",
        dataType: "json",
        success: function (resp) {
            console.log(resp);
            for (const item of resp) {
                let option = `<option data-description="${item.description}" data-unitPrice="${item.unitPrice}" data-qty="${item.qty}">${item.code}</option>;`
                $("#order_item_id").append(option);
            }
        },
        error: function (xhr, exception) {
            console.log("Error loading item codes:", exception);
        }
    });
}
$('#order_item_id').change((e) => {
    const itemCode = e.target.value;
    if ('Select item code' !== itemCode) {
        const description = e.target.options[e.target.selectedIndex].getAttribute('data-description');
        $('#description').val(description);

        const unitPrice = e.target.options[e.target.selectedIndex].getAttribute('data-unitPrice');
        $('#unitPrice').val(unitPrice);

        const qty = e.target.options[e.target.selectedIndex].getAttribute('data-qty');
        $('#order_qty').val(qty);
    }
})
loadAllItemCode();



const loadAllOrder = () => {
    $("#order_table_body").empty();
    $.ajax({
        url: "http://localhost:8081/JavaEE_Assignment_war_exploded/orders",
        method: "GET",
        dataType: "json",
        success: function (resp) {
            console.log(resp);
            for (const order of resp) {
                let row = `<tr><td>${order.order_id}</td><td>${order.description}</td><td>${order.qty}</td><td>${order.qty}</td><td>${order.total}</td></tr>`;
                $("#order_table_body").append(row);

            }
        },
        error: function (xhr, exception) {
            console.log("Error loading orders:", exception);
        }
    });
}
$("#add_cart").click(function () {
    loadAllOrder();
    calculateTotal();
});
$("#unitPrice, #qty_on_hand").on("input", calculateTotal);

function calculateTotal(){
    const unitPrice = parseFloat($("#unitPrice").val()) || 0;
    const quantity = parseInt($("#qty_on_hand").val()) || 0;
    const total = (unitPrice * quantity).toFixed(2);
    $("#final_total").val(total);
}

