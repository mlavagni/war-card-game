let isGameOver = true;
let isWar = false;

let arrayCards = [];
let arrayCardsTable = [];
let cantPlayesr = 0;


let player = {
    num: 1,
    score: 0,
    cards: []
}






// function flipCards(){

// }

function findWinner (card1, card2){
   return (card1 > card2) ? card1 : card2
}

function shufleCards(arrayCards){
    
    return Math.floor(Math.random() * Math.floor(arrayCards.length));
        
}

function flipUpCard(card){

}