function updateCurrentDate() {
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    document.getElementById('current-date').textContent = "Current Date: " + formattedDate;
}


updateCurrentDate();
setInterval(updateCurrentDate, 1000);


const loadOrderCards = (orders) => {
    const orderDetailsSection = document.querySelector(".order_details_cards");

    // Clear existing cards
    while (orderDetailsSection.firstChild) {
        orderDetailsSection.removeChild(orderDetailsSection.firstChild);
    }

    for (let i = 0; i < orders.length; i++) {
        const order = orders[i];

        // Create a new card element
        const card = document.createElement("div");
        card.className = "card border-primary mb-3";
        card.style.cssText = "max-width: 18rem; margin-left: 10px; margin-right: 10px; box-sizing: content-box; box-shadow: 5px 5px 10px black;";

        // Create card body
        const cardBody = document.createElement("div");
        cardBody.className = "card-body text-primary";

        // Add order details to the card
        const orderIDElement = document.createElement("h5");
        orderIDElement.className = "card-title";
        orderIDElement.textContent = `Order ID: ${order.order_id}`;

        const orderDateElement = document.createElement("p");
        orderDateElement.className = "card-text";
        orderDateElement.textContent = `Order Date: ${order.date}`;

        const customerIDElement = document.createElement("p");
        customerIDElement.className = "card-text";
        customerIDElement.textContent = `Customer ID: ${order.customer_id}`;

        const totalElement = document.createElement("p");
        totalElement.className = "card-text";
        totalElement.textContent = `Total: Rs.${order.total} /=`;

        // Append elements to the card body
        cardBody.appendChild(orderIDElement);
        cardBody.appendChild(orderDateElement);
        cardBody.appendChild(customerIDElement);
        cardBody.appendChild(totalElement);

        card.appendChild(cardBody);

        // Append the card to the orderDetailsSection
        orderDetailsSection.appendChild(card);
    }
};

// Example array of orders
const ordersArray = [
    { order_id: 1, date: "2022-01-01", customer_id: "C123", total: 100.00 },
    { order_id: 2, date: "2022-01-02", customer_id: "C456", total: 150.00 },
    // Add more orders as needed
];

// Call the loadOrderCards function with the ordersArray
loadOrderCards(ordersArray);

export { loadOrderCards };

