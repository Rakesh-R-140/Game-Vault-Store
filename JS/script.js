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


let CartCount = 0;

const CartContainer = document.getElementById('cart-count')



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
        CartCount++
        CartContainer.textContent = CartCount


    })


    gamesContainer.appendChild(card)
});

