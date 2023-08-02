const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
const box = 20;
const headSize = box * 4;

const snakeHeadImage = new Image();
snakeHeadImage.src = "ciccio.jpg";
const appleImage = new Image();
appleImage.src = "ass.jpg";
const bombImage = new Image();
bombImage.src = "laura.jpg";
const gameOverHeadImage = new Image();
gameOverHeadImage.src = "cicciogo.jpg";

let snakeX = 10 * box;
let snakeY = 10 * box;
let apple = {
  x: Math.floor(Math.random() * (30 * box - headSize)) / box * box,
  y: Math.floor(Math.random() * (30 * box - headSize)) / box * box,
};
let d;
let score = 0;

let bomb = {
  x: Math.floor(Math.random() * (30 * box - headSize)) / box * box,
  y: Math.floor(Math.random() * (30 * box - headSize)) / box * box,
};

document.addEventListener("keydown", direction);

function direction(event) {
  if (event.keyCode === 37) d = "LEFT";
  if (event.keyCode === 38) d = "UP";
  if (event.keyCode === 39) d = "RIGHT";
  if (event.keyCode === 40) d = "DOWN";
}

function repositionBomb() {
  bomb = {
    x: Math.floor(Math.random() * (30 * box - headSize)) / box * box,
    y: Math.floor(Math.random() * (30 * box - headSize)) / box * box,
  };
}

setInterval(repositionBomb, 4000);

function draw() {
  context.fillStyle = "#4caf50";
  context.fillRect(0, 0, 30 * box, 30 * box);

  if (d === "LEFT") snakeX -= box;
  if (d === "UP") snakeY -= box;
  if (d === "RIGHT") snakeX += box;
  if (d === "DOWN") snakeY += box;

  if ((snakeX < bomb.x + headSize && snakeX + headSize > bomb.x &&
       snakeY < bomb.y + headSize && snakeY + headSize > bomb.y) ||
      (snakeX < 0 || snakeY < 0 || snakeX + headSize > 30 * box || snakeY + headSize > 30 * box)) {
        gameOver();
        return;
  } else {
    context.drawImage(snakeHeadImage, snakeX, snakeY, headSize, headSize);
  }

  context.drawImage(appleImage, apple.x, apple.y, headSize, headSize);
  context.drawImage(bombImage, bomb.x, bomb.y, headSize, headSize);

  if (snakeX < apple.x + headSize && snakeX + headSize > apple.x &&
      snakeY < apple.y + headSize && snakeY + headSize > apple.y) {
    score++;
    apple = {
      x: Math.floor(Math.random() * (30 - headSize / box)) * box,
      y: Math.floor(Math.random() * (30 - headSize / box)) * box,
    };
  }

  context.fillStyle = "white";
  context.font = "45px Changa one";
  context.fillText(score, 27 * box, 2.0 * box);
}

function gameOver() {
  // Draw the game over head image
  context.drawImage(gameOverHeadImage, snakeX, snakeY, headSize, headSize);

  // Draw the apple
  context.drawImage(appleImage, apple.x, apple.y, headSize, headSize);

  // Draw the bomb
  context.drawImage(bombImage, bomb.x, bomb.y, headSize, headSize);

  clearInterval(game);

  // Show the restart button
  document.getElementById('restart-button').style.display = 'block';
}

function restartGame() {
  document.getElementById('restart-button').style.display = 'none';

  snakeX = 10 * box;
  snakeY = 10 * box;
  d = undefined;
  score = 0;
  apple = {
    x: Math.floor(Math.random() * (30 * box - headSize)) / box * box,
    y: Math.floor(Math.random() * (30 * box - headSize)) / box * box,
  };
  bomb = {
    x: Math.floor(Math.random() * (30 * box - headSize)) / box * box,
    y: Math.floor(Math.random() * (30 * box - headSize)) / box * box,
  };

  startGame();
}

let game; // Declare game variable outside of any function

function startGame() {
  game = setInterval(draw, 100); // Assign the interval to the game variable
}

startGame(); // Begin the game
