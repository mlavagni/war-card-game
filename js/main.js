/*----- constants -----*/
const arrayCards = [];
const player = new Audio();
/*----- app's state (variables) -----*/
let isGameOver = true;
let isWar = false;
let startIdx = 1;
let countGames = 0;
let explotionSound = "assets/sounds/exploding.wav";
let gunsSound = "assets/sounds/Machine gun.wav";
let victorySound ="assets/sounds/Cheering 3-SoundBible.com-1680253418.wav"
let player1 = {
    num: 1,
    cards: [],
}

let player2 = {
    num: 2,
    cards: [],
}

/*----- cached element references -----*/
const ressetEl = document.getElementById("resset");
const newGameEl = document.getElementById("newGame");
const batleCardsEl = document.getElementById("batleCards");
const nextMoveEl = document.getElementById("nextMoveImg");
const gameBoardEl = document.getElementById("gameBoard");
const homeDivEl = document.getElementById("home");
const warCardsEl = document.querySelectorAll(".warCard");
const p1LabelEl = document.getElementById("p1CardsArray");
const p2LabelEl = document.getElementById("p2CardsArray");
const soundEl = document.getElementById("left");

/*----- event listeners -----*/
nextMoveEl.addEventListener('click', nextMoveClick);
ressetEl.addEventListener('click', ressetGame);
newGameEl.addEventListener('click', newGame);

/*----- event functions -----*/
function nextMoveClick(){
    if(!areNotEnoughCards()) { 
        nextMoveEl.removeEventListener('click', nextMoveClick);
        flipUpCards(); 

        setTimeout(function() {  
            findWinner(); 
    }, 2000);
    
    }

}

function ressetGame(){
    location.reload(); 
 }

function playMusic(sound){
    player.src = sound;
   player.currentTime = 0;
   player.play(player.src);
   setInterval(function(){
       if(player.currentTime > 5){
           player.pause();
       }
   })
}

function newGame(){
    playMusic(gunsSound);
    if (isGameOver){
        isGameOver = false;     
        homeDivEl.style.visibility = 'hidden';
        gameBoardEl.style.visibility = 'visible';
        
        if (countGames < 1) {
            addBackCards() 
            createDeck();
            shufleCards();
            shufleCards();
        }
        ressetNewGame();
        countGames++
        shufleCards();
        dealCards();
        addScorePlayerLabel();
    }
}

function ressetNewGame(){
    player1.cards = [];
    player2.cards = [];
    isGameOver = false;
    isWar = false;
    startIdx = 1;
    deleteCards();   
}

function findWinner(){
    if (!isGameOver){
        let valCard1 = player1.cards[player1.cards.length-startIdx].value;
        let valCard2 = player2.cards[player2.cards.length-startIdx].value;

        if(valCard1 === valCard2){
            playMusic(explotionSound);
            tempAlert("War!!!!!!!! ", 4000)
            startIdx = (startIdx===1) ? startIdx = 4 : startIdx += 3
            isWar=true
            setTimeout(wait3s, 3000)
        }else{  
            
            if(valCard1 > valCard2){
                tempAlert("Player One wins ", 1300)
                player1.cards = player1.cards.splice(player1.cards.length - startIdx).concat(player2.cards.splice(player2.cards.length - startIdx).concat(player1.cards))   
            }else if(valCard1 < valCard2){
                tempAlert("Player two wins ", 1300)
                player2.cards = player1.cards.splice(player1.cards.length - startIdx).concat(player2.cards.splice(player2.cards.length - startIdx).concat(player2.cards))   
            }
            startIdx = 1;
            isWar = false;
            setTimeout(deleteCards, 1700) 
            areNotEnoughCards()
            
        }
    }
}

function addScorePlayerLabel(){
    p1LabelEl.textContent = player1.cards.length
    p2LabelEl.textContent = player2.cards.length
}

function wait3s(){
    if (!isGameOver){
        flipUpCards()
        findWinner()
    }
  
}

function areNotEnoughCards(){
    let message;
    isGameOver = false;
    if ((player1.cards.length <= startIdx) && (player2.cards.length <= startIdx)){
            alert("not enoght cards");
        } else{
    if (isWar){
       if ((player1.cards.length < 4) || (player2.cards.length < 4)){
        message =  (player1.cards.length > player2.cards.length) ? "Player 1 Wins the Game": "Player 2 Wins the Game";
        playMusic(victorySound);
        isGameOver = true;
        alert(message);
       }
    }else if ((player1.cards.length < 1) || (player2.cards.length < 1)){
        message =  (player1.cards.length > player2.cards.length) ? "Player 1 Wins the Game": "Player2 Wins the Game";
        isGameOver = true;
        playMusic(victorySound);
        alert(message);  
    }
}
    return isGameOver;
}

function deleteCards() {
    while (batleCardsEl.firstChild) {
        batleCardsEl.removeChild(batleCardsEl.firstChild);
    }
    warCardsEl.forEach(function(div){
        while(div.firstChild){
            div.removeChild(div.firstChild);
        }
    })
    addScorePlayerLabel()
    nextMoveEl.addEventListener('click', nextMoveClick);
  }


function tempAlert(msg,duration)
{
    var el = document.createElement("div");
    el.setAttribute("id", "messageDiv");
    el.innerHTML = `<span id=tempMessage> ${msg} </span`;
    setTimeout(function(){
    el.parentNode.removeChild(el); 
    },duration);
    document.body.appendChild(el);   
}

//Create deck of cards (52 cards)
function createDeck() {
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
    
       arrayCards.push(cardD,cardH,cardC,cardS);
   }
}

//Shufle the cards
function shufleCards(){
    var i = 0, j = 0, temp = null
    
    for (i = arrayCards.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1))
        temp = arrayCards[i]
        arrayCards[i] = arrayCards[j]
        arrayCards[j] = temp
    }
}
 
//Deal the cards 26 cards to each player
function dealCards(){  
    for ( i = 0; i < arrayCards.length; i++){
        if (i % 2 === 0){
            player1.cards.push(arrayCards[i])
        }else{
             player2.cards.push(arrayCards[i])
        }
    }
}

// Add the back side of the cards to the board
function addBackCards(){
    let card1  = addCardsToTheBoard("assets/card-deck/backs/blue.svg","backCardP1","cardBack")
    gameBoardEl.children[0].appendChild(card1)

    let card2  = addCardsToTheBoard("assets/card-deck/backs/red.svg","backCardP1","cardBack")
    gameBoardEl.children[2].appendChild(card2)
}

//Add cards to the board, parameters 
//url of the card
//idTag = the id of the image
//class tag = the class of the image
function addCardsToTheBoard(url, idTag,classTag){
    let imgEl = document.createElement('img');
    imgEl.setAttribute("src", url);
    imgEl.setAttribute("id", idTag);
    imgEl.classList.add(classTag);
    return imgEl
}

//Flip up each player cards up for regular game or war too
function flipUpCards(){
    if (!areNotEnoughCards()){
        if (!isWar){
            batleCardsEl.appendChild(addCardsToTheBoard(player2.cards[(player2.cards.length - startIdx)].url, "cardP2", "card"));
            batleCardsEl.appendChild(addCardsToTheBoard(player1.cards[(player1.cards.length - startIdx)].url, "cardP1", "card"));
        } else{
            gameBoardEl.children[3].appendChild((addCardsToTheBoard(player1.cards[(player1.cards.length - startIdx)].url, "cardWarP1", "card")));
            gameBoardEl.children[4].appendChild((addCardsToTheBoard(player2.cards[(player2.cards.length - startIdx)].url, "cardWarP2", "card")));
        }
    }
}

