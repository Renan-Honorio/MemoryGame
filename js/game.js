
const grid = document.querySelector(".grid");
const audio = document.querySelector(".audio")
const spanPlayer = document.querySelector(".player")
const timer = document.querySelector(".timer")


const characters  = [
    'beth',
    'jerry',
    'jessica',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'summer',
    'meeseeks',
    'scroopy',
]

const creatElement = (tag, className) =>{
    const element = document.createElement(tag);
    element.className = className;
    return element
}

let firstCard = " ";
let secondCard = " ";

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll(".disable-card")

    if(disabledCards.length === 20){
        clearInterval(this.loop)
        setTimeout( () =>{
            alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML}`)
        }, 100)
        audio.muted = "true";
    }
}

const checkCards = () =>{
    const firstCharacter = firstCard.getAttribute("data-chacters");
    const secondCharacter = secondCard.getAttribute("data-chacters");

    if(firstCharacter ===  secondCharacter ){
        
        firstCard.firstChild.classList.add("disable-card");
        secondCard.firstChild.classList.add("disable-card");
        
        firstCard = " ";
        secondCard = " ";

        checkEndGame()
    }
    else{
        setTimeout( ()=>{

            firstCard.classList.remove("revel-card");
            secondCard.classList.remove("revel-card");

            firstCard = " ";
            secondCard = " ";

        }, 500 )

    }
}



const revealCard = ({ target }) =>{

    if(target.parentNode.className.includes("revel-card")){
        return;
    }

    if(firstCard == " "){
        target.parentNode.classList.add("revel-card");
        firstCard = target.parentNode;

    }else if(secondCard == " "){
        target.parentNode.classList.add("revel-card");
        secondCard = target.parentNode;
        checkCards()
    }

}   

const creatCard =  (characters) => {

    const card = creatElement("div", "card");
    const front =  creatElement("div", "face front");
    const back =  creatElement("div", "face back");

    front.style.backgroundImage = `url(../images/${characters}.png)`

    card.appendChild(front)
    card.appendChild(back)
    
    card.addEventListener("click",revealCard)
    card.setAttribute(`data-chacters`, characters)
    return card
}

const loadGame = () =>{

    const duplicateCharacters = [ ...characters, ...characters ]

    const shuffLedArray = duplicateCharacters.sort( () => Math.random()  - 0.5 )
    
    shuffLedArray.forEach((characters) =>{
       const card = creatCard(characters);
       grid.appendChild(card) 
    })

}

const startTimer = () =>{
   this.loop =  setInterval( () => {
        const ciurrentTimer = Number(timer.innerHTML);
        timer.innerHTML = ciurrentTimer +1
    },1000)
}

window.onload = () =>{
    spanPlayer.innerHTML =  localStorage.getItem("player")
    startTimer();
    loadGame();
}
