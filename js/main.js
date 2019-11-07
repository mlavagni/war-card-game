/*----- constants -----*/
const arrayCards = [];
const player = new Audio();
/*----- app's state (variables) -----*/
let isGameOver = true;
let isWar = false;
let arrayCardsTable = [];
let arrayCardsInGame = [];
let cantPlayesr = 0;
let startIdxWar = 1;
let startIdx = 1;

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
soundEl.addEventListener('click', playMusic2);


function nextMoveClick(evt){
    playMusic("assets/sounds/exploding.wav");
    if(!areNotEnoughCards()) { 
        nextMoveEl.removeEventListener('click', nextMoveClick);
        flipUpCards(); 

        setTimeout(function() {  
            findWinner(); 
    }, 2000);
    
    }

}

function playMusic2(sound){
    playMusic("assets/sounds/Machine gun.wav")
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
    playMusic("assets/sounds/Machine gun.wav");
    if (isGameOver){
        isGameOver = false;     
        homeDivEl.style.visibility = 'hidden';
        // homeDivEl.setAttribute("id" ,"myelement")
        gameBoardEl.style.visibility = 'visible';

        let card1  = addCardsToTheBoard("assets/card-deck/backs/blue.svg","backCardP1","cardBack")
        gameBoardEl.children[0].appendChild(card1)

        let card2  = addCardsToTheBoard("assets/card-deck/backs/red.svg","backCardP1","cardBack")
        gameBoardEl.children[2].appendChild(card2)
    
        createDeck()
        shufleCards()
        shufleCards()
        dealCards()
        addScorePlayerLabel()
      }
}

function findWinner(){
    if (!isGameOver){
        let valCard1 = player1.cards[player1.cards.length-startIdx].value;
        let valCard2 = player2.cards[player2.cards.length-startIdx].value;

        if(valCard1 === valCard2){
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
    let message
    isGameOver = false;
    if (isWar){
       if ((player1.cards.length < 4) || (player2.cards.length < 4)){
        message =  (player1.cards.length > player2.cards.length) ? "Player 1 Wins the Game": "Player 2 Wins the Game"
        isGameOver = true;
        alert(message)
       }
    }else if ((player1.cards.length < 1) || (player2.cards.length < 1)){
        message =  (player1.cards.length > player2.cards.length) ? "Player 1 Wins the Game": "Player2 Wins the Game"
        isGameOver = true;
        alert(message)
    } 
    return isGameOver
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

function addCardsToTheBoard(url, idTag,classTag){
    let imgEl = document.createElement('img');
    imgEl.setAttribute("src", url);
    imgEl.setAttribute("id", idTag);
    imgEl.classList.add(classTag);
    return imgEl
}

function tempAlert(msg,duration)
{
    var el = document.createElement("div");
    el.setAttribute("style","position:absolute;top:35%;left:55%;background-color:white;height:7%;width:30%;font-size:2rem;text-align:center;");
    el.setAttribute("id", "messageDiv");
    el.innerHTML = msg;
    setTimeout(function(){
    el.parentNode.removeChild(el); 
    },duration);
    document.body.appendChild(el); 
    
}

function createDeck() {
    "<15"
    for (i= 2; i < 6; i++){
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

function shufleCards(){
    var i = 0, j = 0, temp = null
    
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


