document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board');
  const generateSignalButton = document.getElementById('generateSignal');
  const timerElement = document.getElementById('timer');
  const scanningMessage = document.getElementById('scanningMessage');
  const numMinesElement = document.getElementById('numMines');
  const boardSize = 5;
  const delayTime = 10; // delay time in seconds
  let timer;
  let isFirstSignal = true;

  function createBoard() {
    board.innerHTML = '';
    for (let i = 0; i < boardSize * boardSize; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      board.appendChild(cell);
    }
  }

  function generateSignal() {
    const cells = Array.from(document.querySelectorAll('.cell'));
    cells.forEach(cell => {
      cell.classList.remove('star');
    });

    let numMines = Math.floor(Math.random() * 3) + 2; // Random number of mines between 2 and 4
    numMinesElement.innerText = `Número de minas: 💣 ${numMines}`;
    numMinesElement.style.display = 'block';

    let numStars;
    if (numMines === 4) {
      numStars = 3;
    } else if (numMines === 3) {
      numStars = 3;
    } else {
      numStars = 4;
    }

    let starPositions = new Set();

    while (starPositions.size < numStars) {
      const randomPosition = Math.floor(Math.random() * (boardSize * boardSize));
      starPositions.add(randomPosition);
    }

    starPositions.forEach(position => {
      cells[position].classList.add('star');
    });

    if (isFirstSignal) {
      isFirstSignal = false;
    }
  }

  function startTimer() {
    let timeLeft = delayTime;
    timerElement.style.display = 'block';
    timerElement.innerText = timeLeft;
    generateSignalButton.disabled = true;
    generateSignalButton.classList.add('disabled');
    timer = setInterval(() => {
      timeLeft--;
      timerElement.innerText = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        generateSignalButton.disabled = false;
        generateSignalButton.classList.remove('disabled');
      }
    }, 1000);
  }

  generateSignalButton.addEventListener('click', () => {
    generateSignalButton.style.display = 'none';
    scanningMessage.style.display = 'block';
    numMinesElement.style.display = 'none';
    timerElement.style.display = 'none'; // Hide timer initially
    setTimeout(() => {
      scanningMessage.style.display = 'none';
      timerElement.style.display = 'block'; // Show timer after scanning
      generateSignal();
      startTimer(); // Start timer after scanning message is hidden
      generateSignalButton.style.display = 'block';
    }, 5000); // 5 segundos
  });

  createBoard();
});
