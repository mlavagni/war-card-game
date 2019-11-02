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

// function flipCards(){

// }

function findWinner (card1, card2){
   return (card1 > card2) ? card1 : card2
}



function flipUpCard(){


}

function AddCarsdsToArray(){
   // arrayCards
}

function createDeck() {
   for (i= 2; i < 15; i++){
       let cHeart = "../assets/card-deck-css/images/hearts";
       let cClubs = "../assets/card-deck-css/images/clubs";
       let cDiamonds = "../assets/card-deck-css/images/diamonds";
       let cSpades = "../assets/card-deck-css/images/spades";
        arrayCards.push({cHeart: i}, {cClubs: i}, {cDiamonds :i}, {cSpades: i});
   }
}

function shufleCards(arrayCards){
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
        

function dealCards(arrayCards){
    console.log("entro a deal cards")
    for ( i = 1; i <= arrayCards.length; i++){
        console.log("entro al for")
        if (i % 2 === 0){
            console.log("par")
            player1.cards.push(arrayCards[i])
        }else{
            console.log("impar")
            player2.cards.push(arrayCards[i])
        }
    }
}


function ressetGame(){
    location.reload(); 
 }

createDeck()
