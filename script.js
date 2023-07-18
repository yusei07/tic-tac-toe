// board module (iife)
const GameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""]

  const render = () => {
    let boardHTML = "";
    board.forEach((square, index) => {
      boardHTML += `<div class="square" id="square-${index}">${square}</div>`;
    })
    // append boardHTML inside squares
    document.querySelector(".squares").innerHTML = boardHTML;
    // add event listener again aftering rendering
    squares.forEach((square) => {
      square.addEventListener("click", Game.handleClick);
    })
  }

  const update = (index, value) => {
    board[index] = value; // add a mark to the current board index
    render();
  }

  const getGameBoard = () => board;

  return {
    render,
    update,
    getGameBoard,
    board
  }
})();


// player factory
const playerFactory = (name, mark) => {
  return {
    name,
    mark
  };
}

// display message (iife)
const displayMessage = (() => {
  const subText = document.querySelector("#");

  const renderMessage = (message) => {
   subText.innerHTML = message;
  }

  return {
    renderMessage,
  }
})();


// main module (iife)
const Game = (() => {
  let players = [];
  let currentPlayerIndex;
  let gameOver;
  const X = `<img class="marker-icon" src="assets/eevee-icon.png" alt="heart-icon">`
  const O = `<img class="marker-icon" src="assets/gengar-icon.png" alt="heart-icon">`

  const start = () => {
    players = [
      playerFactory("Eevee", X),
      playerFactory("Gengar", O)
    ]
    currentPlayerIndex = 0;
    gameOver = false;
    GameBoard.render();

    // add event listener to each squares and run the handleclick function on click
    squares.forEach((square) => {
      square.addEventListener("click", handleClick);
    })
  }

  const handleClick = (e) => {
    if (gameOver) {
      return;
    }

    // get the current square index
    let index = parseInt(e.target.id.split("-")[1]);
    // check if the current index-
    if (GameBoard.getGameBoard()[index] !== "") {
      return;
    }

    GameBoard.update(index, players[currentPlayerIndex].mark);

    if (checkWin(GameBoard.getGameBoard(), players[currentPlayerIndex].mark)) {
      gameOver = true;
      alert(`${players[currentPlayerIndex].name} won!`)
    } else if (checkTie(GameBoard.getGameBoard())) {
      gameOver = true;
      alert("It's a tie!");
    } else {
      // switch player's turn
      currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
      displayPlayerTurn = `<span class="player-name">${players[currentPlayerIndex].name}</span>, make your move.`
      document.querySelector("#switch-player").innerHTML = displayPlayerTurn;
    }
  }


  const restart = () => {
    for (let i = 0; i < GameBoard.board.length; i++) {
      GameBoard.update(i, "");
    }
    GameBoard.render();
    gameOver = false;
    // clear the message innerhtml
    displayMessage.renderMessage = "";
  }

  return { 
    start,
    handleClick,
    restart
  }
})();

// global variable
const squares = document.querySelectorAll(".squares");

function checkWin(board) {
  const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let i = 0; i < winningCombination.length; i++) {
    const [a, b, c] = winningCombination[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

function checkTie(board) {
  // meaning it is all filled
  return board.every(cell => cell !== "");
}

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", () => {
  Game.restart();
})

Game.start();
