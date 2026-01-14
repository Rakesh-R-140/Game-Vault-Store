const games = [
    {
        id: 1,
        name: 'GTA V',
        price: 999,
        image: "game-thumbnail/GTAV_CHARM_Epic_FirstParty_PortraitFOB_1200x1600_R02_1200x1600-a5528b33df876e64f5dee728830c80a3.avif",




    },
    {
        id: 2,
        name: 'PUBG',
        price: 699,
        image: "game-thumbnail/pubg-battlegrounds-1rx7f.avif",



    },
    {
        id: 3,
        name: 'Silent Breath',
        price: 'Coming soon!',
        image: "game-thumbnail/silent-breath-lh4ro.jpg",



    },
    {
        id: 4,
        name: 'Farcry 5',
        price: 1999,
        image: "game-thumbnail/FCZ_StorePortrait_1200x1600_1200x1600-a254f505d277fe3dc17beb12416bf11a.avif",



    },
    {
        id: 5,
        name: 'Hitman',
        price: 1699,
        image: "game-thumbnail/EGS_HITMANWorldofAssassinationDeluxeEdition_IOInteractiveAS_Bundles_S2_1200x1600-c70072e6dc295ab6faf1d0c22090c5fe.webp",



    },
    {
        id: 6,
        name: 'Red Dead redemption',
        price: 1299,
        image: "game-thumbnail/RDR2PC1227_Epic Games_860x1148-860x1148-b4c2210ee0c3c3b843a8de399bfe7f5c.avif",



    },
    {
        id: 7,
        name: 'Valorant',
        price: 699,
        image: "game-thumbnail/EGS_VALORANT_RiotGames_S2_1200x1600-773ea2de7951435e977ba5f5f6934442.avif",



    },
    {
        id: 8,
        name: 'Alan Waker',
        price: 1299,
        image: "game-thumbnail/EGS_AlanWake2DeluxeEdition_RemedyEntertainment_Editions_S2_1200x1600-db032e8c839da2be59801023a4cdf083.avif",



    }

]

const searchInput = document.getElementById("search-input");




let cart = JSON.parse(localStorage.getItem('cart')) || []




const CartContainer = document.getElementById('cart-count')


function updateUI() {
    localStorage.setItem('cart', JSON.stringify(cart))
    const totalQty = cart.reduce((sum, item) => sum + item.Quantity, 0)
    CartContainer.textContent = totalQty
}



updateUI()




const gamesContainer = document.getElementById('game-container')
function renderGames(gameList) {
    gamesContainer.innerHTML = "";

    gameList.forEach((game) => {
        const card = document.createElement("div");
        card.classList.add("game-card");

        // const existsInCart = cart.find(item => item.id === game.id);

        const existsInCart = cart.find(item => item.id === game.id);


        const ComingSoon = game.price === 'Coming soon!'

        card.innerHTML =
            `
        <img src="${game.image} alt="${game.name}"">
        <div
         class="game-info" >
         <p>
        ${game.name}
        </p>
     <p>
    ${ComingSoon ? 'Arriving Soon!!' : '₹' + game.price}
    </p>
        </div> 
      <button  class="${existsInCart ? 'added-to-cart' : ''}"> 
  ${ComingSoon ? "Remind Me" : (existsInCart ? "Add More" : "Add to Cart")}
    </button >  

    `;

        const button = card.querySelector("button");




        button.addEventListener("click", () => {





            if (game.price === 'Coming soon!') {
                return alert('We will inform You when the game is Arrived!!');
            }

            const alreadyExisting = cart.find(item => item.id === game.id)
            if (alreadyExisting) {
                alreadyExisting.Quantity += 1;

            }



            else {
                cart.push({
                    ...game, Quantity: 1


                })

            }






            updateUI()
            renderGames(gameList)




        });




        gamesContainer.appendChild(card);

    });
}




renderGames(games);

searchInput.addEventListener("input", (e) => {
    const searchValue = e.target.value.toLowerCase()

    const gameSearch = games.filter((item) =>
        item.name.toLowerCase().includes(searchValue))



    renderGames(gameSearch)
});

