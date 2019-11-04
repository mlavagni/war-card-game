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
const gameBoardEl = document.getElementById("gameBoard");
const homeDivEl = document.getElementById("home");
/*----- event listeners -----*/
nextMoveEl.addEventListener('click', nextMoveClick);
ressetEl.addEventListener('click', ressetGame);
newGameEl.addEventListener('click', newGame);

function nextMoveClick(evt){
    if(!gameOver) {
       console.log("nextMove")  
      
      
        flipUpCards(); 
        setTimeout(function() {}, 1500);

       setTimeout(function() {  
        findWinner(); 
    }, 1500);
    
    }

}

function newGame(){
    gameOver = false;
    homeDivEl.style.visibility = 'hidden';
    gameBoardEl.style.visibility = 'visible';
   
    // let backCar1El = document.createElement('img');
    // backCar1El.setAttribute("src", "assets/card-deck/backs/blue.svg");
    // backCar1El.setAttribute("id",'"backCardP1');
    // backCar1El.classList.add("card");
    //gameBoardEl.children[0].appendChild(addCardsToTheBoard("assets/card-deck/backs/blue.svg",backCardP1,card));

    let backCar1El = document.createElement('img');
    backCar1El.setAttribute("src", "assets/card-deck/backs/blue.svg");
    backCar1El.setAttribute("id",'"backCardP1');
    backCar1El.classList.add("cardBack");
    gameBoardEl.children[0].appendChild(backCar1El)

    let backCar2El = document.createElement('img');
    backCar2El.setAttribute("src", "assets/card-deck/backs/red.svg");
    backCar2El.setAttribute("id",'"backCardP1');
    backCar2El.classList.add("cardBack");
    gameBoardEl.children[2].appendChild(backCar2El)
  
    createDeck()
    shufleCards()
    shufleCards()
    shufleCards()
    dealCards()
}

function addCardsToTheBoard(url, idTag,classTag){
    let backCar1El = document.createElement('img');
    backCar1El.setAttribute("src", url);
    backCar1El.setAttribute("id", idTag);
    backCar1El.classList.add(classTag);
    return backCar1El
}

function findWinner (){
    let valCard1 = player1.cards[player1.cards.length-1].value;
    let valCard2 = player2.cards[player2.cards.length-1].value;

    if(valCard1 === valCard2){
        tempAlert("War!!!!!!!!", 4000)
        war()
        isWar=true
    }else{

   
        let c2 = player2.cards.pop()
        let c1 = player1.cards.pop()

        if(valCard1 > valCard2){
            player1.cards.unshift(c2,c1)
            tempAlert("Player One wins", 3000)
            // batleCardsEl.children[0].remove();
            }else if(valCard1 < valCard2){
                player2.cards.unshift(c2,c1)
                tempAlert("Player two wins", 3000)
            //  batleCardsEl.children[0].removeChild();
            // }else{
            //     tempAlert("War!!!!!!!!", 4000)
                }
            
        while (batleCardsEl.firstChild) {
            batleCardsEl.removeChild(batleCardsEl.firstChild);
        }
    }
  
}

function tempAlert(msg,duration)
{
  
        var el = document.createElement("div");
        el.setAttribute("style","position:absolute;top:40%;left:35%;background-color:white;height:20%;width:40%;font-size:4rem;");
        el.innerHTML = msg;
        setTimeout(function(){
        el.parentNode.removeChild(el);
        },duration);
        document.body.appendChild(el);    
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

 function war(){
    let war2El = document.createElement('img');
    war2El.setAttribute("src", player2.cards[(player2.cards.length - 5)].url);
    war2El.setAttribute("id",'"cardP2');
    war2El.classList.add("card");
    gameBoardEl.children[4].appendChild(war2El)

    let war1El = document.createElement('img');
    war1El.setAttribute("src",(player1.cards[(player1.cards.length - 5)].url));
    war1El.setAttribute("id",'"cardP1');
    war1El.classList.add("card");
    gameBoardEl.children[3].appendChild(war1El)
 }

//  function gametest(){
//     createDeck()
//      shufleCards()
//      shufleCards()
//      shufleCards()
//      dealCards()
//     flipUpCards()
    
//  }


