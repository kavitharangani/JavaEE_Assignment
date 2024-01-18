// const loadAllOrders = () => {
//     $("#place-tbl-body").empty();
//     $.ajax({
//         url: "http://localhost:8081/JavaEE_Assignment_war_exploded/orders",
//         method: "GET",
//         dataType: "json",
//         success: function (resp) {
//             console.log(resp);
//             for (const orders of resp) {
//                 let row = `<tr><td>${orders.order_id}</td><td>${orders.customer_id}</td><td>${orders.customer_name}</td><td>${orders.order_item_id}</td><td>${orders.description}</td><td>${orders.total}</td></tr>;`
//                 $("#place-tbl-body").append(row);
//             }
//         }
//     });
// }
// $("#nav_recent").click(function () {
//     loadAllOrders();
// });


