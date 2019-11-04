/*----- constants -----*/
const arrayCards = [];



/*----- app's state (variables) -----*/
let isGameOver = true;
let isWar = false;
let arrayCardsTable = [];
let cantPlayesr = 0;




let player1 = {
    num: 1,
    score: 0,
    cards: [],
    score: 0
}

let player2 = {
    num: 2,
    score: 0,
    cards: [],
    score: 0
}

/*----- cached element references -----*/
const ressetEl = document.getElementById("resset");
const newGameEl = document.getElementById("newGame");
const batleCardsEl = document.getElementById("batleCards");
const playerTwoEl = document.getElementById("playerTwo");
const nextMoveEl = document.getElementById("nextMoveImg");
/*----- event listeners -----*/
nextMoveEl.addEventListener('click', nextMoveClick);
ressetEl.addEventListener('click', ressetGame);
newGameEl.addEventListener('click', newGame);

function nextMoveClick(evt){
    if(!gameOver) {
       console.log("nextMove")  
       flipUpCards()
    }
}

function newGame(){
    gameOver = false;
    createDeck()
    shufleCards()
    shufleCards()
    shufleCards()
    dealCards()
}


function findWinner (){
    let valCard1 = player1.cards[player1.cards.length-1].value;
    let valCard2 = player2.cards[player2.cards.length-1].value;

    let c2 = player2.cards.pop()
    let c1 = player1.cards.pop()

   if(valCard1 > valCard2){
        player1.cards.unshift(c2,c1)
     }else if(valCard1 < valCard2){
         player2.cards.unshift(c2,c1)
        }else{
            console.log("war")
        }
        
    while (batleCardsEl.firstChild) {
        batleCardsEl.removeChild(batleCardsEl.firstChild);
    }
}

function rewardWinner(wPlayer, lplayer){
    console.log("llego a buscar winner")
    console.log(wPlayer + " player");
     let test = lplayer.cards.pop()
    // console.log("test " + test)
    // wPlayer.cards.unshift(lplayer.cards.pop)
}



function flipUpCards(){
    let img2El = document.createElement('img');
    img2El.setAttribute("src", player2.cards[(player2.cards.length - 1)].url);
    img2El.setAttribute("id",'"cardP2');
    img2El.classList.add("card");
    batleCardsEl.appendChild(img2El);

    let img1El = document.createElement('img');
    img1El.setAttribute("src",(player1.cards[(player1.cards.length - 1)].url));
    img1El.setAttribute("id",'"cardP1');
    img1El.classList.add("card");
    batleCardsEl.appendChild(img1El);
}

function AddCarsdsToArray(){
   // arrayCards
}

function createDeck() {
    console.log(arrayCards.length + " al iniciar")
    for (i= 2; i < 15; i++){
        let cardD = {},cardH = {},cardC = {},cardS = {};

        cardD.url = `assets/card-deck/diamonds/diamonds-${i}.svg`;              
        cardD.value = i;
       
        cardH.url = `assets/card-deck/hearts/hearts-${i}.svg`;              
        cardH.value = i;

        cardC.url = `assets/card-deck/clubs/clubs-${i}.svg`;              
        cardC.value = i;

        cardS.url = `assets/card-deck/spades/spades-${i}.svg`;              
        cardS.value = i;
        console.log(cardD.value + " ",cardH.value+ " ",cardC.value+ " ",cardS.value+ " ")
        arrayCards.push(cardD,cardH,cardC,cardS);
   }
}

function shufleCards(){
        var i = 0
          , j = 0
          , temp = null
      
        for (i = arrayCards.length - 1; i > 0; i -= 1) {
          j = Math.floor(Math.random() * (i + 1))
          temp = arrayCards[i]
          arrayCards[i] = arrayCards[j]
          arrayCards[j] = temp
        }
      }
        

function dealCards(){
      
    for ( i = 0; i < arrayCards.length; i++){
        if (i % 2 === 0){
            player1.cards.push(arrayCards[i])
        }else{
             player2.cards.push(arrayCards[i])
        }
    }
}


function ressetGame(){
    location.reload(); 
 }

 function gametest(){
    createDeck()
     shufleCards()
     shufleCards()
     shufleCards()
     dealCards()
    flipUpCards()
    
 }


