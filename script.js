document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board');
  const generateSignalButton = document.getElementById('generateSignal');
  const timerElement = document.getElementById('timer');
  const numMinesElement = document.getElementById('numMines');
  const hackGifContainer = document.getElementById('hackGifContainer');
  const hackMessages = document.getElementById('hackMessages');
  const boardSize = 5;
  const delayTime = 20; // delay time in seconds
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
    timerElement.innerText = `Padrão válido por ${timeLeft} segundos`;
    generateSignalButton.disabled = true;
    generateSignalButton.classList.add('disabled');
    timer = setInterval(() => {
      timeLeft--;
      timerElement.innerText = `Padrão válido por ${timeLeft} segundos`;
      if (timeLeft <= 0) {
        clearInterval(timer);
        generateSignalButton.disabled = false;
        generateSignalButton.classList.remove('disabled');
        timerElement.style.display = 'none';
      }
    }, 1000);
  }

  function showHackGif() {
    hackGifContainer.style.display = 'flex';
    let messages = ['Iniciando...', 'Verificando...', 'Hackeado!'];
    let currentMessageIndex = 0;

    hackMessages.innerText = messages[currentMessageIndex];

    const messageInterval = setInterval(() => {
      currentMessageIndex++;
      if (currentMessageIndex < messages.length) {
        hackMessages.innerText = messages[currentMessageIndex];
      } else {
        clearInterval(messageInterval);
        setTimeout(() => {
          hackGifContainer.style.display = 'none';
          generateSignal();
          startTimer();
          generateSignalButton.style.display = 'block';
        }, 1000);
      }
    }, currentMessageIndex === 1 ? 3000 : 1000); // 3 seconds cooldown for "Verificando..."
  }

  generateSignalButton.addEventListener('click', () => {
    generateSignalButton.style.display = 'none';
    numMinesElement.style.display = 'none';
    timerElement.style.display = 'none'; // Hide timer initially

    showHackGif();
  });

  createBoard();
});
// Gerar uma variável para controlar o estado do botão "Gerar Sinal"
let isHackGifPlaying = false;

document.addEventListener("DOMContentLoaded", function () {
  const cells = document.querySelectorAll(".cell");
  const hackGifContainer = document.querySelector(".hack-gif-container");
  const hackGif = document.querySelector(".hack-gif");
  const hackMessages = document.querySelector(".hack-messages");
  const generateSignalButton = document.getElementById("generate-signal");

  cells.forEach(cell => {
    cell.addEventListener("click", () => {
      if (isHackGifPlaying) return; // Não permita cliques se o GIF estiver sendo reproduzido

      // Supondo que ao clicar em uma célula, o hack gif seja exibido
      hackGifContainer.style.display = "flex";
      hackGif.src = "./images/hack.gif"; // Substitua pelo caminho correto do seu GIF
      hackMessages.innerHTML = "Iniciando..."; // Mensagem durante o hack
      isHackGifPlaying = true;

      // Ocultar o GIF e a mensagem após a conclusão do hack
      setTimeout(() => {
        hackGifContainer.style.display = "none";
        isHackGifPlaying = false;
      }, 5000); // Ajuste o tempo conforme a duração do seu GIF
    });
  });

  generateSignalButton.addEventListener("click", () => {
    if (isHackGifPlaying) return; // Não permita cliques se o GIF estiver sendo reproduzido

    generateSignalButton.classList.add("transparent"); // Adicionar classe para tornar o botão transparente

    // Mostrar o hack GIF e a mensagem
    hackGifContainer.style.display = "flex";
    hackGif.src = "./images/hack.gif"; // Substitua pelo caminho correto do seu GIF
    hackMessages.innerHTML = "Gerando sinal..."; // Mensagem durante a geração do sinal
    isHackGifPlaying = true;

    // Ocultar o GIF e a mensagem após a conclusão da geração do sinal
    setTimeout(() => {
      hackGifContainer.style.display = "none";
      generateSignalButton.classList.remove("transparent"); // Remover a transparência do botão após o hack
      isHackGifPlaying = false;
    }, 5000); // Ajuste o tempo conforme a duração do seu GIF
  });
});
