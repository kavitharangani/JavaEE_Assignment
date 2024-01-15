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
                let option = `<option data-name="${customer.name}" data-qty="${customer.qty}">${customer.customer_id}</option>`;
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
        const qty = e.target.options[e.target.selectedIndex].dataset.qty;

        $('#customer_name').val(name);
        $('#customer_qty').val(qty);
    }
})



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
                let option = `<option data-description="${item.description}" data-unitPrice="${item.unitPrice}" data-qty="${item.qty}">${item.code}</option>`;
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
        const description = e.target.options[e.target.selectedIndex].dataset.description;
        $('#description').val(description);

        const unitPrice = e.target.options[e.target.selectedIndex].dataset.unitPrice;
        $('#unit_price').val(unitPrice);

        const qty = e.target.options[e.target.selectedIndex].dataset.qty;
        $('#order_qty').val(qty);
    }
})
loadAllItemCode();
loadAllCustomerCode();