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

// function flipCards(){

// }


function newGame(){
    shufleCards(arrayCards);
    dealCards();
}


function findWinner (card1, card2){
   return (card1 > card2) ? card1 : card2;
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
    for (i= 1; i < 15; i++){
        let cardD = {},cardH = {},cardC = {},cardS = {};

        cardD.url = `assets/card-deck/diamonds/diamonds-${i}.svg`;              
        cardD.value = i;

        cardH.url = `assets/card-deck/hearts/hearts-${i}.svg`;              
        cardH.value = i;

        cardC.url = `assets/card-deck/clubs/clubs-${i}.svg`;              
        cardC.value = i;

        cardS.url = `assets/card-deck/spades/spades-${i}.svg`;              
        cardS.value = i;

    //    let cHeart = "../assets/card-deck-css/images/hearts";
    //    let cClubs = "../assets/card-deck-css/images/clubs";

    //    let cSpades = "../assets/card-deck-css/images/spades";
        // arrayCards.push({url: cHeart, value: i}, {url: cClubs, value: i}, {url: cDiamonds, value: i}, {url: cSpades, value: i});
        arrayCards.push(cardD,cardH,cardC,cardS);
        console.log(arrayCards);
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
        

function dealCards(){
    for ( i = 1; i < arrayCards.length; i++){
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

createDeck()
dealCards()
flipUpCards()