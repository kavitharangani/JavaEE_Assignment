$(document).ready(function () {
    $("#save_customer").click(function () {
        let customer_idF = $("#cust_id").val();
        let nameF = $("#name").val();
        let addressF = $("#address").val();
        let contactF = $("#contact").val();

        $.ajax({
            method: "POST",
            contentType: "application/json",
            url: "http://localhost:8081/JavaEE_Assignment_war_exploded/customer",
            async: true,
            data: JSON.stringify({
                customer_id: customer_idF,
                name: nameF,
                address: addressF,
                contact: contactF

            }),
            success: function (data) {
                reset();
                alert("saved")
            },
            error: function (xhr, exception) {
                alert("Error")
            }
        })
    });


    $("#update_customer").click(function () {
        let customer_idF = $("#cust_id").val();
        let nameF = $("#name").val();
        let addressF = $("#address").val();
        let contactF = $("#contact").val();

        $.ajax({
            method: "PUT",
            contentType: "application/json",
            url: "http://localhost:8081/JavaEE_Assignment_war_exploded/customer",
            async: true,
            data: JSON.stringify({
                customer_id: customer_idF,
                name: nameF,
                address: addressF,
                contact: contactF

            }),
            success: function (data) {
                reset();
                alert("saved")
            },
            error: function (xhr, exception) {
                alert("Error")
            }
        })
    });


    $("#delete_customer").click(function () {
        let customer_idF = $("#cust_id").val();

        $.ajax({
            method: "DELETE",
            contentType: "application/json",
            url: "http://localhost:8081/JavaEE_Assignment_war_exploded/customer?customer_id=" + customer_idF,
            async: true,
            success: function (data) {
                reset();
                alert("Customer deleted successfully");
            },
            error: function (xhr, exception) {
                alert("Error deleting customer");
            }
        });
    });


    $("#reset_customer").click(function () {
        reset();
    });
    const reset = () => {
        $("#cust_id").val("");
        $("#name").val("");
        $("#address").val("");
        $("#contact").val("");
        loadAllCustomer();
    }


    $("#nav_cust").click(function () {
        loadAllCustomer();
    });
    const loadAllCustomer = () => {
        $("#customer-tbl-body").empty();
        $.ajax({
            url: "http://localhost:8081/JavaEE_Assignment_war_exploded/customer",
            method: "GET",
            dataType: "json",
            success: function (resp) {
                console.log(resp);
                for (const customer of resp) {
                    let row = `<tr><td>${customer.customer_id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.contact}</td></tr>;`
                    $("#customer-tbl-body").append(row);
                }
            }
        });
    }


//     $("#search_customer").click(function () {
//         let customerId = $("#search_customer_id").val();
//
//         if (!customerId) {
//             alert("Please enter a valid customer ID");
//             return;
//         }
//         $.ajax({
//             method: "GET",
//             url: `http://localhost:8081/JavaEE_Assignment_war_exploded/customer?customer_id=${customerId}`,
//             dataType: "json",
//             success: function (data) {
//                 if (data && data.customer_id) {
//                     $("#name").val(data.name);
//                     $("#address").val(data.address);
//                     $("#contact").val(data.contact);
//
//                     alert(`Customer found: ID - ${data.customer_id}, Name - ${data.name}, Address - ${data.address}, Contact - ${data.contact}`);
//                 } else {
//                     alert("Customer not found");
//                 }
//             },
//             error: function (xhr, status, error) {
//                 console.error("Error searching for customer:", status, error);
//
//                 // Check for specific error status and handle accordingly
//                 if (xhr.status === 404) {
//                     alert("Customer not found");
//                 } else {
//                     alert("Error searching for customer");
//                 }
//             }
//         });
//     });
//
// });



});
