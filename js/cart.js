let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartContainer = document.getElementById("cart-container");

const cartmessage = document.querySelector('.cart-message-container')
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

        deleteBtn.addEventListener('click', () => {

            cart = cart.filter(item => item.id !== game.id)


            updateCart()



            // if (cart.length === 0) {
            //     cartmessage.innerHTML = ' <p class="cart-message">Cart is empty !</p>  <img class="cart-empty-icon" src="empty-cart.png" >'
            // }



        })

        const decreaseBtn = card.querySelector('.decrease')
        const increaseBtn = card.querySelector('.increase')

        decreaseBtn.addEventListener('click', () => {
            if (game.Quantity > 1) {

                game.Quantity--
            }

            else {
                cart = cart.filter(item => item.id !== game.id)
            }
            updateCart()


            // if (cart.length === 0) {
            //     cartmessage.innerHTML = ' <p class="cart-message">Cart is empty !</p>  <img class="cart-empty-icon" src="empty-cart.png" >'
            // }


        })



        increaseBtn.addEventListener('click', () => {
            game.Quantity++;
            updateCart()



        })






        cartContainer.appendChild(card)
        updatetotal()
    });

}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart))
    updatetotal()
    CartRender()


}




function updatetotal() {


    totalcost = cart.reduce((sum, item) => sum + item.price * item.Quantity, 0)
    document.getElementById('cart-total').innerHTML = totalcost



}

const clearButton = document.getElementById('clear-cart')
clearButton.addEventListener('click', () => {
    const confirmClear = confirm("Are you sure you want to clear the cart?");

    if (!confirmClear) return;


    cart = [];
    localStorage.removeItem('cart');
    updatetotal()
    CartRender();

})




CartRender()