// function viewOrderDetails(orderId) {
//     console.log(Id)
//     window.location.href = `order-details.html?orderId=${orderId}`;

// }
console.log('orders-detail pages')
function getOrder() {
    return JSON.parse(localStorage.getItem("order")) || [];
}
const params = new URLSearchParams(window.location.search);
console.log(params)
const orderId = params.get("orderId");
console.log(orderId)
const orders = getOrder();
const order = orders.find(o => o.orderId === orderId);


const container = document.getElementById("orderDetails");

if (!order) {
    container.innerHTML = "<p>Order not found</p>";
} else {
    container.innerHTML = `
        <h3>Order ID: ${order.orderId}</h3>
        <p>Date: ${order.date}</p>
        <p>Status: ${order.status}</p>
        <p>Total: ₹${order.total}</p>

        <h4>Items</h4>
        ${order.items.map(item => `
            <div>
                <p>${item.name}</p>
                <p>Qty: ${item.Quantity}</p>
                <p>Price: ₹${item.price * item.Quantity}</p>
            </div>
        `).join("")}
    `;
}
