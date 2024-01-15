$(document).ready(function (){
    $("#save_customer").click(function (){
        let customer_idF = $("#cust_id").val();
        let nameF = $("#name").val();
        let addressF = $("#address").val();
        let contactF = $("#contact").val();

        $.ajax({
            method:"POST",
            contentType:"application/json",
            url:"http://localhost:8081/JavaEE_Assignment_war_exploded/customer",
            async:true,
            data:JSON.stringify({
                customer_id:customer_idF,
                name:nameF,
                address:addressF,
                contact:contactF

            }),
            success: function (data) {
                alert("saved")
            },
            error: function (xhr, exception) {
                alert("Error")
            }
        })
    });


    $("#update_customer").click(function (){
        let customer_idF = $("#cust_id").val();
        let nameF = $("#name").val();
        let addressF = $("#address").val();
        let contactF = $("#contact").val();

        $.ajax({
            method:"PUT",
            contentType:"application/json",
            url:"http://localhost:8081/JavaEE_Assignment_war_exploded/customer",
            async:true,
            data:JSON.stringify({
                customer_id:customer_idF,
                name:nameF,
                address:addressF,
                contact:contactF

            }),
            success: function (data) {
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
                alert("Customer deleted successfully");
            },
            error: function (xhr, exception) {
                alert("Error deleting customer");
            }
        });
    });


    $("#reset_customer").click(function () {
        $("#cust_id").val("");
        $("#name").val("");
        $("#address").val("");
        $("#contact").val("");
    });


    $("#search_customer").click(function () {
        let customerId = $("#search_customer_id").val();

        // Add a check for a valid customer ID
        if (!customerId) {
            alert("Please enter a valid customer ID");
            return;
        }

        $.ajax({
            method: "GET",
            url: `http://localhost:8081/JavaEE_Assignment_war_exploded/customer?customer_id=${customerId}`,
            dataType: "json",
            success: function (data) {
                if (data && data.customer_id) {
                    // Update the input fields with the retrieved data
                    $("#name").val(data.name);
                    $("#address").val(data.address);
                    $("#contact").val(data.contact);

                    alert(`Customer found: ID - ${data.customer_id}, Name - ${data.name}, Address - ${data.address}, Contact - ${data.contact}`);
                } else {
                    alert("Customer not found");
                }
            },
            error: function (xhr, status, error) {
                console.error("Error searching for customer:", status, error);

                // Check for specific error status and handle accordingly
                if (xhr.status === 404) {
                    alert("Customer not found");
                } else {
                    alert("Error searching for customer");
                }
            }
        });
    });

});
