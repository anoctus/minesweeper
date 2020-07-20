document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {};
var size = 4; // default size 4
var minesTotal = 5; // default size 5
var flagged = 0;

function startGame () {
  
  generateBoard();  
  randomMines();
  remaining()

  for (let i = 0; i < board.cells.length; i++) {
    board['cells'][i].surroundingMines = countSurroundingMines(board['cells'][i]);
  }
  
  document.addEventListener('click', checkForWin);
  document.addEventListener('contextmenu', checkForWin);
  document.addEventListener('contextmenu', remaining);
  document.getElementById('reset').addEventListener('click', reset);
  

  // Don't remove this function call: it makes the game work!    
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {

  let playerWin = true;

  board.cells.forEach( function(cell) {
    if (cell.isMine && !cell.isMarked) {
      playerWin = false;
    };
    if (!cell.isMine && cell.hidden) {
      playerWin = false;
    };
  });

  if (playerWin) {
    lib.displayMessage('You win!')
  }
  
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {

  var surrounding = lib.getSurroundingCells(cell.row, cell.col)
  
  let count = 0;

  surrounding.forEach(function (mine) {
    if (mine.isMine) {
      return count++
    };
  });
  return count
}

function generateBoard() {
  //creates 'cells' empty array inside 'board' object
  board.cells = []; 

  //loop within loop to set board size according to set value (default 4)
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      //add cell object with default values to each cells
      let cell = {
        row: i,
        col: j,
        isMine: false,
        isMarked: false,
        hidden: true
      }
      //push cells into empty 'board'
      board.cells.push(cell);
    }
  }
}
 
function randomMines() {
  // checks to how many total cells we have and creates an array with range
  let pickCells = [];

  // add as many elements to array as many maximum cells we have
  let pick = 0;
  while (pick < (size * size)) {
    pickCells.push(pick);
    pick++;
  }

  //shuffle the array with Fisher-Yates Algorithm
  for(let i = pickCells.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i+1)) // changed i to (i+1) to let the element stay in its own place
    const temp = pickCells[i]
    pickCells[i] = pickCells[j]
    pickCells[j] = temp
  }
 
  //slices and updates the array to leave only as many elements as many mines are set 
  pickCells = pickCells.slice(0, minesTotal);

  
  //set isMine to true in cells that corresponds to array elements
  for (let i = 0; i < pickCells.length; i++) {
    board.cells[pickCells[i]].isMine = true;
  }
}

function reset(){  
  document.querySelector(".board").innerHTML = " ";
  size = parseInt(document.getElementById("boardSize").value);
  mineAmount();
  startGame();
}

// to set the number of mines according to 2 conditions, the "Choose Board Size" and the "Amount of Mines" dropdowns
function mineAmount() {
  let amount = document.getElementById("mineAmount").value;
  console.log("size is " + size);
  switch (size) {    
    case 2:
      
      switch (amount) {
        case 'low':
            minesTotal = 1;
            break;
        case 'medium':
          minesTotal = 2;
          break;
        case 'high':
          minesTotal = 3;
          break;          
        }
       break; 
    case 3:
      console.log("size is " + size);
      switch (amount) {
        case "low":
          minesTotal = 2;
          break;
        case "medium":
          minesTotal = 3;
            break;
        case "high":
          minesTotal = 4;
          break;          
      }
      break;
    case 4:
      switch (amount) {
        case "low":
          minesTotal = 3;
          break;
        case "medium":
          minesTotal = 5;
            break;
        case "high":
          minesTotal = 7;
          break;          
      }
      break;
    case 5:
      switch (amount) {
        case "low":
          minesTotal = 4;
          break;
        case "medium":
          minesTotal = 7;
            break;
        case "high":
          minesTotal = 10;
          break;          
      }
      break;
    case 6:
      switch (amount) {
        case "low":
          minesTotal = 5;
          break;
        case "medium":
          minesTotal = 9;
            break;
        case "high":
          minesTotal = 13;
          break;          
      }
      break;
  }
}

// check for remaining mines
function remaining() {
  checkFlagged();
  document.getElementById('remaining').innerHTML = "Remaining Mines: " + (minesTotal - flagged);
}

function checkFlagged() {

  let totalFlagged = 0;
  board.cells.forEach( function(cell) {
    if (cell.isMarked === true) {
      totalFlagged += 1;
    };
  });
  flagged = totalFlagged;
}