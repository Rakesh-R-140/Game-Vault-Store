console.log('order-details page');

function getOrder() {
    return JSON.parse(localStorage.getItem("order")) || [];
}

const params = new URLSearchParams(window.location.search);
const orderId = params.get("orderId");

const orders = getOrder().filter(Boolean);
const order = orders.find(o => o.orderId === orderId);

const container = document.getElementById("orderDetails");

if (!order) {
    container.innerHTML = "<p>❌ Order not found</p>";
} else {

    const STATUS_FLOW = ["Placed", "Packed", "Shipped", "Delivered"];

    let currentIndex = STATUS_FLOW.indexOf(order.status);

    let timelineHTML = `
<div class="order-timeline">
    ${STATUS_FLOW.map((status, index) => {
        let className = "";

        if (index < currentIndex) className = "completed";
        else if (index === currentIndex) className = "active";
        else className = "upcoming";

        return `<div class="timeline-step ${className}">${status}</div>`;
    }).join("")}
</div>
`;




    container.innerHTML = `
    <h3>Order ID: ${order.orderId}</h3>
    <p>Date: ${order.date}</p>
    <p>Status: ${order.status}</p>
    <p>Total: ₹${order.total}</p>

    ${timelineHTML}

    <h4>Items</h4>
    ${order.items.map(item => `
        <div class="order-item">
            <p>${item.name}</p>
            <p>Qty: ${item.Quantity}</p>
            <p>Price: ₹${item.price * item.Quantity}</p>
        </div>
 
       `).join("")}

${order.status === "Placed" || order.status === "Packed"
            ? `<button class="cancel-btn" onclick="cancelOrder('${order.orderId}')">
        ❌ Cancel Order
     </button>`
            : `<p class="cancel-disabled">
        ❌ Cancellation not available after shipping
     </p>`
        }



        
`







        ;





}
function cancelOrder(orderId) {
    const confirmCancel = confirm("Are you sure you want to cancel this order?");
    if (!confirmCancel) return;

    let orders = getOrder();

    orders = orders.map(order => {
        if (order.orderId === orderId) {
            order.status = "Cancelled";
        }
        return order;
    });
    console.log(orders)

    saveOrder(orders);

    alert("Order cancelled successfully");

    window.location.href = "orders.html";
}







console.log('hellow summa')