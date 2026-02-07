function getOrder() {
    return JSON.parse(localStorage.getItem("order")) || [];
}

function saveOrder(orders) {
    localStorage.setItem("order", JSON.stringify(orders));
}
