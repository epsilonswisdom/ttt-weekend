/*-------------------------------- Constants --------------------------------*/
// I found eight winning combos follow-up question is there a shorter method?
const winningCombos = [
	[0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [8, 4, 0]
]

/*---------------------------- Variables (state) ----------------------------*/
let board  //[null,null,null,null,null,null,null,null,null]
// set the turn to 1 which represents Player X 
let turn 
// A value of false in winner means there is no winner yet
//A value  of True in winner will mean the player has won
// once winner is set to true we can determine a winner by whose turn at the time the winning move was played
let winner 
// a value of true in tie will mean that the board array contains no more null values and will be used to render a tie message if the winner is still false by the time all the squares are played check the init function
let tie 

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll(".sqr")
console.dir(squareEls)
const messageEl = document.querySelector('#message')
console.dir(messageEl)
const resetBtnEl = document.querySelector("#reset")

/*----------------------------- Event Listeners -----------------------------*/
// attach the event listener for the function of habdleClick
document.getElementById("sq0").addEventListener('click', handleClick)
document.getElementById("sq1").addEventListener('click', handleClick)
document.getElementById("sq2").addEventListener('click', handleClick)
document.getElementById("sq3").addEventListener('click', handleClick)
document.getElementById("sq4").addEventListener('click', handleClick)
document.getElementById("sq5").addEventListener('click', handleClick)
document.getElementById("sq6").addEventListener('click', handleClick)
document.getElementById("sq7").addEventListener('click', handleClick)
document.getElementById("sq8").addEventListener('click', handleClick)
resetBtnEl.addEventListener('click', init)



/*-------------------------------- Functions --------------------------------*/
//call init function when the app loads
// set the board variable to an array containing nine nulls
function init() {
 board = [null, null, null, null, null, null, null, null, null];
 turn = 1;
 winner = false;
 tie = false;
 render()
}
init()
// call a function name "render" at the end of the init function. Does it mean within the scope or the global scope? Answer(within scope)  Within cause this step causes an error till I complete Step 4a Don't lose Heart
//Calling a funtion of Render set it aside for now below Step 4
function render(){
  updateBoard()
  updateMessage()
}

function updateBoard() {
  board.forEach(function (square, index) {
    if (square === -1) {
      squareEls[index].textContent = "O";
      return
    }
    if (square === 1){
      squareEls[index].textContent = "X";
      return
    } if (square === null){
      squareEls[index].textContent = "";
      return 
    }
  })
}
updateBoard()
//update Msg 
function updateMessage(){
  if (winner === false && tie === false && turn === -1) {
    messageEl.textContent = "player x turn"
  } else if (winner === false && tie === false && turn == 1){
    messageEl.textContent = "player o turn" 
  } else if (winner === true && tie === false && turn == 1) {
    messageEl.textContent = "player x wins" 
  } else if (winner === true && tie === false && turn == -1){
    messageEl.textContent = "player o wins"
  } else {
    messageEl.textContent = "it's a tie"
  }
}
// create a function called handleClick. Set evt as one of the parameters
// place the const of sqIdx within the handleClick evt cause you dont wanna call on it outside of the function exclusively only the player
function handleClick(evt){
  const sqIdx = evt.target.id
  let numIdx = parseInt(sqIdx.charAt(2))
  let boardIdx = board[numIdx]
  if (boardIdx !== null || winner === true){
  return
}
 placePiece(numIdx)
 checkForTie()
 checkForWinner()
 switchPlayerTurn()
 render()
}
//create a function check for tie similar to 6d. you want to type out turn not the number otherwise its solely focused on that number not the players turn. Think of it as moving target vs an idle target
function placePiece(index){
 board[index] = turn
}
//check for Tie creating a function and checking for null
function checkForTie(){
 if (!board.includes(null)){
  tie = true
 }
}
//side note to self you could use the reduce method but that comes after understanding it more, its a more elegant solution
function checkForWinner(x){
  winningCombos.forEach(function(winCombos){
    let sum = winCombos.reduce(function(alpha,num){
  return alpha + board[num]
},0);
  if(Math.abs(sum)===3){
  winner = true
  }
})
}
// create switchPlayerTurn function we are checking we want the function to stop if winner is true cause it means the game is over.
function switchPlayerTurn(){
  if (winner === true) {
    return 
  } if (winner === false) {
    turn *= -1
  }
  
}