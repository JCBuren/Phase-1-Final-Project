const gameIDs = [80,104077,225747,236053,236717,206516,187419,242111,147482,216609,150036,194160,222286,230307]
const gameDescriptions = { 
    80:"Welcome to Vegas. New Vegas. It’s the kind of town where you dig your own grave prior to being shot in the head and left for dead…and that’s before things really get ugly.",
    104077:'How long can you survive a post-apocalyptic world? A land overrun with a "zombie" population, where you compete for limited resources. This is DayZ – this is your story',
    225747:'Valheim is a brutal exploration and survival game inspired by Norse mythology. Craft powerful weapons, construct longhouses, and slay mighty foes to prove yourself to Odin!',
    236053:'His vengeance against the Gods of Olympus years behind him, Kratos now lives as a man in the realm of Norse Gods and monsters. It is in this harsh, unforgiving world that he must fight to survive… and teach his son to do the same.',
    236717:'Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.',
    206516:'Arthur Morgan and the Van der Linde gang are outlaws on the run. With federal agents and the best bounty hunters in the nation massing on their heels, the gang must rob, steal and fight their way across the rugged heartland of America in order to survive.',
    187419:'Trapped on a small raft with nothing but a hook made of old plastic, players awake on a vast, blue ocean totally alone and with no land in sight! With a dry throat and an empty stomach,survival will not be easy!',
    242111: 'As the sun sets on the last day of summer camp, the teenage counselors of Hackett’s Quarry throw a party to celebrate. No kids. No adults. No rules. Things quickly take a turn for the worse.',
    147482:'Squad creates authentic combat experiences while pitting conventional and unconventional factions against each other. As part of a 50 person team, join a nine-person squad to face off against an opposing 50 player team in intense combat across large real-world environments.',
    216609:'Sea of Thieves offers the essential pirate experience, from sailing and fighting to exploring and looting – everything you need to live the pirate life and become a legend in your own right. With no set roles, you have complete freedom to approach the world, however you choose.',
    150036: "You've inherited your grandfather's old farm plot in Stardew Valley. Armed with hand-me-down tools and a few coins, you set out to begin your new life. Can you learn to live off the land and turn these overgrown fields into a thriving home?",
    194160: 'Forager is a 2D open world game inspired by exploration, farming and crafting games such as Stardew Valley, Terraria & Zelda. Gather, collect and manage resources. Craft useful items & structures to build your base. Level up and learn new skills, abilities, and blueprints.',
    222286:'Explore late 1500s Sengoku Japan, a brutal period of constant life and death conflict, as you come face to face with larger than life foes in a dark and twisted world. Unleash an arsenal of deadly prosthetic tools and powerful ninja abilities.',
    230307:'Over twenty years ago in Harran, we fought the virus—and lost. Now, we’re losing again. The City, one of the last large human settlements, is torn by conflict. Civilization has fallen back into the Dark Ages. And yet, we still have hope.',



}
const gameCard = '<h3 class="title">{title}</h3>\
  <img class="card-image" src="{image}" />\
  <div class="description"> {description}</div>\
  <div class="price">${price}</div>\
  <div class="button-container">\
  <button class="btn">Add to Cart</button>\
  </div>'



if (!String.prototype.supplant) {
    String.prototype.supplant = function (o) {
        return this.replace(/{([^{}]*)}/g,
            function (a, b) {
                var r = o[b];
                return typeof r === 'string' || typeof r === 'number' ? r : a;
            }
        )
    }
}

const buildGameCard = (game) => {
    let gameDiv = document.createElement("div")
        gameDiv.className = "rcorners2"
        gameDiv.innerHTML = gameCard.supplant(game)


    let gameFragment = document.createDocumentFragment()
        gameFragment.appendChild(gameDiv)


    let layout = document.querySelector(".layout")
        layout.appendChild(gameFragment)

    document.querySelectorAll('.btn')[document.querySelectorAll('.btn').length-1].addEventListener('click', () => {
        alert("Item added to Cart")
    })

    document.querySelectorAll('.btn')[document.querySelectorAll('.btn').length-1].addEventListener  ('mouseenter', (event) => {
        event.target.classList.add("btn-hover")
    })

    document.querySelectorAll('.btn')[document.querySelectorAll('.btn').length-1].addEventListener('mouseleave', (event) => {
        event.target.classList.remove("btn-hover")      
    })
}

fetch('https://www.cheapshark.com/api/1.0/games?ids='+gameIDs.toString())
.then(response => response.json())
.then(response => {

gameIDs.forEach((game) => {
        let gameData = { 
        title: response[game].info.title,
        description: gameDescriptions[game],
        price: response[game].cheapestPriceEver.price,
        image: response[game].info.thumb
    }

        buildGameCard(gameData)
      

    
})

    
    
})




const homeMessage = "You're Already on the Home Page";

document.querySelector('.home').addEventListener('click', () => {
    alert(homeMessage)
    });

const gamesMessage = "Under Construction! View Games Below."
document.querySelector('.games').addEventListener('click', () => {
    alert(gamesMessage)
    });

    
document.querySelector('.add-game-form').addEventListener('submit', (event) => {
event.preventDefault()

let createGame = {
    title: document.getElementById("gname").value,
    price: document.getElementById("gPrice").value, 
    image: document.getElementById("gameURL").value, 
    description: document.getElementById("g-description").value 
}

buildGameCard(createGame)

document.getElementById("gname").value = ""
document.getElementById("gPrice").value =""
document.getElementById("gameURL").value = ""
document.getElementById("g-description").value = ""



})
