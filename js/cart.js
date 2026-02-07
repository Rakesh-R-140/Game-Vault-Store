let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartContainer = document.getElementById("cart-container");

const cartmessage = document.querySelector('.cart-message-container')
const clearButton = document.getElementById('clear-cart')
const totalCost = document.getElementById('cart-total')



function cartMessages() {
    if (cart.length === 0) {
        cartmessage.innerHTML = ' <p class="cart-message">Cart is empty !</p>  <img class="cart-empty-icon" src="empty-cart.png" >'
    }
    else {
        cartmessage.innerHTML = '';
    }
}





function CartRender() {

    cartContainer.innerHTML = ''

    cartMessages()

    cart.forEach((game) => {

        const card = document.createElement('div')
        card.classList.add('game-card')

        card.innerHTML = `
    <img src="${game.image}">
    
    <h3>${game.name}</h3>
    <p>₹${game.price}</p>
    

    <div class="qty-controls">
    <div class="quantity-option" >
        <button class="decrease">−</button>
        <span>${game.Quantity}</span>
        <button class="increase">+</button>
   </div>

    <button class="remove-btn">Remove</button>
     </div>
`;

        const deleteBtn = card.querySelector('.remove-btn')
        const decreaseBtn = card.querySelector('.decrease')
        const increaseBtn = card.querySelector('.increase')


        increaseBtn.onclick = () => updateQuantity(game.id, 1)
        decreaseBtn.onclick = () => updateQuantity(game.id, -1)
        deleteBtn.onclick = () => remove(game.id)










        // decreaseBtn.addEventListener('click', () => {

        //     if (game.Quantity > 1) {

        //         game.Quantity--
        //     }

        //     else {
        //         cart = cart.filter(item => item.id !== game.id)
        //     }
        //     updateCart()


        // })








        cartContainer.appendChild(card)
        updateTotal()

    });



}


function getgrandtotal() {
    const subtotal = calculateTotal()


    const Tax = Math.round(subtotal * 0.18)
    const delivery = cart.length > 0 ? 60 : 0
    const grandtotal = Tax + subtotal + delivery
    return grandtotal;
}


function updateTotal() {

    const subtotal = calculateTotal()


    const Tax = Math.round(subtotal * 0.18)
    const delivery = cart.length > 0 ? 60 : 0
    const grandtotal = Tax + subtotal + delivery



    document.getElementById('subtotal').textContent = subtotal;
    document.getElementById('tax').textContent = Tax;
    document.getElementById('delivery').textContent = delivery;



    totalCost.textContent = grandtotal
}




function updateQuantity(id, change) {

    item = cart.find(game => game.id === id)

    if (!item) return;

    item.Quantity += change
    if (item.Quantity <= 0) {
        remove(id)

    }

    saveCart()


}


function remove(id) {

    cart = cart.filter(game => game.id !== id)




    saveCart()


}









function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart))
    updateTotal()
    CartRender()


}




function calculateTotal() {


    const totalcost = cart.reduce((sum, item) => sum + item.price * item.Quantity, 0)
    return totalcost;



}


clearButton.addEventListener('click', () => {
    if (cart.length === 0) return alert('cart is already cleared');

    const confirmClear = confirm("Are you sure you want to clear the cart?");

    if (!confirmClear) return;


    cart = [];
    localStorage.removeItem('cart');
    saveCart()
    CartRender();

})

document.getElementById('placeOrderBtn').addEventListener('click', (placeOrder))

function placeOrder() {
    console.log('order placed!!')
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }



    let total = getgrandtotal()

    const confirmCheckout = confirm(`are you sure placing your order?? ${total}`)


    if (!confirmCheckout) return;


    const subtotal = calculateTotal()


    const Tax = Math.round(subtotal * 0.18)
    const delivery = cart.length > 0 ? 60 : 0
    const grandtotal = Tax + subtotal + delivery


    let orders = getOrder()

    let order = {
        orderId: "ORD" + Date.now(),
        items: cart,
        total: grandtotal,
        date: new Date().toLocaleString(),
        status: 'Placed'

    }
    orders.push(order)

    saveOrder(orders)







    console.log(orders)

    cart = []
    localStorage.removeItem('cart')
    window.location.href = "success.html";







}

// function saveOrder(orders) {
//     console.log(orders)
//     localStorage.setItem("order", JSON.stringify(orders));
// }

// function getOrder() {
//     return JSON.parse(localStorage.getItem("order")) || []
// }



CartRender()