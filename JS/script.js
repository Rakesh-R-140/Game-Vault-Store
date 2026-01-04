const games = [
    {
        id: 1,
        name: 'GTA V',
        price: 999,
        image: "game-thumbnail/gta-5.webp"


    },
    {
        id: 2,
        name: 'PUBG',
        price: 699,
        image: "game-thumbnail/image3.webp"


    },
    {
        id: 3,
        name: 'Call of Duty',
        price: 1299,
        image: "game-thumbnail/images.jpg"


    },
]



let cart = JSON.parse(localStorage.getItem('cart')) || []






const CartContainer = document.getElementById('cart-count')
CartContainer.textContent = cart.length;



const gamesContainer = document.getElementById('game-container')

games.forEach((game) => {

    const card = document.createElement('div');

    card.classList.add('game-card')


    card.innerHTML =
        `
       <img src="${game.image}">
       <h3>${game.name}</h3>
       <p>$${game.price}</p>
       <button  >Add to Cart </button>

    `

    const button = card.querySelector('button')

    button.addEventListener('click', () => {




        const alreadyinCart = cart.find(item => item.id === game.id);
        if (alreadyinCart) {
            alert('already in Cart')
            return;
        }

        cart.push(game)
        localStorage.setItem('cart', JSON.stringify(cart))
        CartContainer.textContent = cart.length;
        console.log(CartContainer)
        console.log(cart)







    })


    gamesContainer.appendChild(card)
});

