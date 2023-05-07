let turn = true;
let player1Wins = 0;
let player2Wins = 0;

let buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
  button.addEventListener('click', buttonClick);
});

function buttonClick() {
  if (this.textContent !== '') {
    return;
  }

  if (turn) {
    this.textContent = 'X';
  } else {
    this.textContent = 'O';
  }

  turn = !turn;

  let obj = checkForWin();
  if (obj.win) {
    setTimeout(() => {
      window.alert(`The winner is: ${this.textContent}`);
    }, 100);
  } else if (obj.isTie) {
    setTimeout(() => {
      window.alert(`Tie, No winner`);
    }, 100);
  }
}

function checkForWin() {
  const winPositions = [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonals
    [0, 4, 8],
    [2, 4, 6],
  ];

  let clickedButtons = 0;

  for (const positions of winPositions) {
    const symbols = positions.map(i => buttons[i].textContent);
    const symbol = symbols[0];
    if (symbol !== '' && symbols.every(s => s === symbol)) {
      for (const position of positions) {
        buttons[position].style.color = 'red';
      }
      if (symbol === 'X') {
        player1Wins++;
        document.getElementById('player1').textContent = player1Wins;
      } else {
        player2Wins++;
        document.getElementById('player2').textContent = player2Wins;
      }
      return { win: true, isTie: false, positions: positions, symbol: symbol };
    }
  }

  for (const button of buttons) {
    if (button.textContent !== '') {
      clickedButtons++;
    }
  }

  if (clickedButtons === 9) {
    return { win: false, isTie: true };
  }

  return { win: false, isTie: false };
}

document.querySelector('.restart').addEventListener('click', function () {
  buttons.forEach(button => {
    button.textContent = '';
    button.style.color = 'black';
    turn = true;
  });
});
