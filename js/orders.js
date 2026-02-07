let orders = getOrder();

function renderOrder(gameList) {
    const container = document.getElementById("ordersContainer");

    if (!Array.isArray(orders) || orders.length === 0) {
        container.innerHTML = "<p>No orders yet.</p>";
    } else {
        container.innerHTML = "";

        gameList.reverse().forEach((order, index) => {
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

            ${order.status === "Placed"
                    ? `<button class="deliver-btn" onclick="markDelivered(${orders.length - 1 - index})">
                        Mark as Delivered
                       </button>`
                    : ""
                }

${`<button  class="delete-btn" onclick="deleteOrder(${orders.length - 1 - index}) "> Delete  </button>  `

                }

        `;

            container.appendChild(div);
        });
    }
}












function markDelivered(index) {
    let orders = getOrder();
    orders[index].status = "Delivered";
    saveOrder(orders);
    location.reload();
}


function deleteOrder(index) {
    const confirmdelete = confirm('Are you sure want to delete this order??')
    if (!confirmdelete) return;

    let orders = getOrder()
    orders.splice(index, 1)
    saveOrder(orders)
    location.reload();

}
function searchOrders() {
    const ordervalue = document.getElementById('searchInput').value
    const statusValue = document.getElementById("statusFilter").value;


    const filterorder = orders.filter((order) => {
        let matchId = order.orderId.includes(ordervalue)
        let matchstatus = statusValue === '' || statusValue === order.status
        console.log(matchstatus && matchId)
        return matchId && matchstatus;

    })
    console.log(filterorder)
    renderOrder(filterorder)

}

console.log("Order History Loaded");
renderOrder(orders)