let currentPlayer = 1;
let player1Score = 0;
let player2Score = 0;
let timer = null;
let seconds = 0;
let timerRunning = false;
let player1Break=0;
let player2Break=0;

const player1Display = document.querySelector('.score-1');
const player2Display = document.querySelector('.score-2');
const player1BreakDisplay = document.querySelector('.score-break-1');
const player2BreakDisplay = document.querySelector('.score-break-2');

// Add this code to set the initial glowing effect for Player 1's score display
player1Display.classList.add('active'); // Add 'active' class to player 1's score display by default
player2Display.classList.remove('active'); // Remove 'active' class from player 2's score display

const switchButton = document.querySelector('.btn-1');
const resetButton = document.querySelector('.btn-3');
const undoButton = document.querySelector('.btn-2'); // Add the 'Return' button

switchButton.addEventListener('click', () => {
  // Toggle between player 1 and player 2
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  
//   To reset the break score when swtiching
if(currentPlayer === 1){
    player1Break = 0;
    player1BreakDisplay.textContent = player1Break;
} else{
    player2Break=0;
    player2BreakDisplay.textContent = player2Break
}

  // Remove any existing glow (active) class from both score displays
  player1Display.classList.remove('active');
  player2Display.classList.remove('active');

  // Add 'active' class to the score display of the current player
  if (currentPlayer === 1) {
    player1Display.classList.add('active');
  } else {
    player2Display.classList.add('active');
  }
});

const balls = document.querySelectorAll('.ball');

// Create an array to store the history of score changes
const scoreHistory = [];

// Function to update the scores and add to the score history
function updateScore(player, points) {
  if (player === 1) {
    player1Score += points;
    player1Break += points;
    player1Display.textContent = player1Score;
    player1BreakDisplay.textContent = player1Break;
    player1Display.classList.add('active'); // Add 'active' class to player 1's score display
    player2Display.classList.remove('active'); // Remove 'active' class from player 2's score display
  } else {
    player2Score += points;
    player2Break += points;
    player2Display.textContent = player2Score;
    player2BreakDisplay.textContent = player2Break;
    player2Display.classList.add('active'); // Add 'active' class to player 2's score display
    player1Display.classList.remove('active'); // Remove 'active' class from player 1's score display
  }

  // Add the score change to the history
  scoreHistory.push({ player, points });
}

// Function to undo the last score change
function undoScoreChange() {
    if (scoreHistory.length > 0) {
      const lastChange = scoreHistory.pop();
      const { player, points } = lastChange;
  
      // Reverse the score change
      if (player === 1) {
        player1Score -= points;
        player1Display.textContent = player1Score;
      } else {
        player2Score -= points;
        player2Display.textContent = player2Score;
      }
  
      // Adjust currentPlayer if necessary
      if (scoreHistory.length > 0) {
        const lastPlayer = scoreHistory[scoreHistory.length - 1].player;
        currentPlayer = lastPlayer;
      }
  
      // Update the active class for the current player
      player1Display.classList.toggle('active', currentPlayer === 1);
      player2Display.classList.toggle('active', currentPlayer === 2);
    }
  }
  
balls.forEach(ball => {
  ball.addEventListener('click', () => {
    // Get the points associated with the clicked ball
    const points = parseInt(ball.getAttribute('data-points'));
    updateScore(currentPlayer, points);
    startTimer();
  });
});

resetButton.addEventListener('click', () => {
  // Reset scores and clear score history
  player1Score = 0;
  player2Score = 0;
  player1Display.textContent = player1Score;
  player2Display.textContent = player2Score;
  player1Break = 0;
  player2Break = 0;
  player1BreakDisplay.textContent = player1Break;
  player2BreakDisplay.textContent = player2Break;
  scoreHistory.length = 0; // Clear the score history array
  resetTimer();
});

// Add event listener for the 'Return' button (btn-2) to undo the last score change
undoButton.addEventListener('click', undoScoreChange);

function startTimer() {
    if (!timerRunning) {
        startTime = performance.now();
        timer = setInterval(updateTimer, 10); // Update the timer every 10 milliseconds
        timerRunning = true;
    }
}

function updateTimer() {
    const elapsedTime = performance.now() - startTime;
    const hours = Math.floor(elapsedTime / 3600000);
    const minutes = Math.floor((elapsedTime % 3600000) / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const microseconds = Math.floor((elapsedTime % 1000) / 10);

    document.getElementById('timer').textContent = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${microseconds.toString().padStart(2, '0')}`;
}

function resetTimer() {
    clearInterval(timer);
    timerRunning = false;
    document.getElementById('timer').textContent = '0:00:00:00';
}


