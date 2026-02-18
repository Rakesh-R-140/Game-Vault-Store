let orders = getOrder();
const STATUS_FLOW = ["Placed", "Packed", "Shipped", "Delivered"];


function renderOrder(gameList) {
    const container = document.getElementById("ordersContainer");

    if (!Array.isArray(gameList) || gameList.length === 0) {
        container.innerHTML = "<p>No orders yet.</p>";
    } else {
        container.innerHTML = "";

        [...gameList].reverse().forEach((order, index) => {
            const div = document.createElement("div");
            div.className = "order-card";

            div.innerHTML = `
            <h3>Order ID: ${order.orderId}</h3>
            <p>Date: ${order.date}</p>
            <p>Total: ₹${order.total}</p>
            <p class="status ${order.status}">${order.status}</p>

            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item">
                        <span>${item.name}</span>
                        <span>Qty: ${item.Quantity}</span>
                        <span>₹${item.price * item.Quantity}</span>
                    </div>
                `).join("")}
            </div>

            
  <div class="order-actions">

    ${order.status !== "Delivered" && order.status !== "Cancelled" ? `
        <button class="deliver-btn"
            onclick="updateOrderStatus('${order.orderId}')">
            Move to Next Stage
        </button>
    ` : ""}

  

    <button class="view-btn"
        onclick="viewOrderDetails('${order.orderId}')">
        View Details
    </button>
 <button class="delete-btn" onclick="deleteOrder('${order.orderId}')">Delete</button>
</div>

           
            








                

        `;

            container.appendChild(div);
        });
    }
}












function updateOrderStatus(orderId) {
    let orders = getOrder();



    orders = orders.map(order => {

        if (!order) return order

        if (order.orderId === orderId) {
            let currentIndex = STATUS_FLOW.indexOf(order.status)
            console.log(currentIndex)
            if (currentIndex < STATUS_FLOW.length - 1) {
                order.status = STATUS_FLOW[currentIndex + 1]

            }
        }
        return order
    })



    saveOrder(orders);
    renderOrder(orders)
}


function deleteOrder(Id) {
    const confirmdelete = confirm('Are you sure want to delete this order??')
    if (!confirmdelete) return;

    let orders = getOrder();

    orders = orders.filter(order => order && order.orderId !== Id);

    saveOrder(orders);
    renderOrder(orders);
}

function searchOrders() {
    const ordervalue = document.getElementById('searchInput').value
    const statusValue = document.getElementById("statusFilter").value;

    const orders = getOrder();
    const filterorder = orders.filter((order) => {
        let matchId = order.orderId.includes(ordervalue)
        let matchstatus = statusValue === '' || statusValue === order.status
        console.log(matchstatus && matchId)
        return matchId && matchstatus;

    })
    console.log(filterorder)
    renderOrder(filterorder)

}

function viewOrderDetails(orderId) {
    console.log('hellow')
    window.location.href = `order-details.html?orderId=${orderId}`;
}

console.log("Order History Loaded");




renderOrder(orders)