// -------------------------
// Setup elemen game
// -------------------------
const body = document.body;

const container = document.createElement("div");
container.style.position = "relative";
container.style.width = "90vw";
container.style.maxWidth = "1200px";
container.style.height = "calc(90vw / 3)";
container.style.overflow = "hidden";
body.appendChild(container);

// Background bergerak
const bg = document.createElement("div");
bg.style.position = "absolute";
bg.style.width = "200%";
bg.style.height = "100%";
bg.style.backgroundImage = "url('assets/background.png')";
bg.style.backgroundRepeat = "repeat-x";
bg.style.backgroundSize = "cover";
container.appendChild(bg);

// Ground
const ground = document.createElement("div");
ground.style.position = "absolute";
ground.style.bottom = "0";
ground.style.width = "100%";
ground.style.height = "5%";
ground.style.background = "#654321";
container.appendChild(ground);

// Chibi sprite
const chibi = document.createElement("img");
chibi.src = "assets/chibi_idle.png";
chibi.style.position = "absolute";
chibi.style.bottom = "5%";
chibi.style.left = "5%";
chibi.style.width = "6%";
chibi.style.height = "30%";
container.appendChild(chibi);

// Obstacle
const obstacle = document.createElement("img");
obstacle.src = "assets/obstacle.png";
obstacle.style.position = "absolute";
obstacle.style.bottom = "5%";
obstacle.style.width = "4%";
obstacle.style.height = "30%";
container.appendChild(obstacle);

// Power-up
const coin = document.createElement("img");
coin.src = "assets/coin.png";
coin.style.position = "absolute";
coin.style.bottom = "35%";
coin.style.width = "3%";
coin.style.height = "10%";
coin.style.display = "none";
container.appendChild(coin);

// Skor & status
const scoreText = document.createElement("p");
scoreText.innerHTML = "Skor: <span id='score'>0</span>";
container.appendChild(scoreText);

const statusText = document.createElement("p");
container.appendChild(statusText);

// Tombol
const startBtn = document.createElement("button");
startBtn.innerText = "Mulai";
startBtn.style.position = "absolute";
startBtn.style.top = "50%";
startBtn.style.left = "50%";
startBtn.style.transform = "translate(-50%, -50%)";
startBtn.style.padding = "1.5% 3%";
startBtn.style.fontSize = "2vw";
container.appendChild(startBtn);

const restartBtn = document.createElement("button");
restartBtn.innerText = "Ulang";
restartBtn.style.position = "absolute";
restartBtn.style.top = "50%";
restartBtn.style.left = "50%";
restartBtn.style.transform = "translate(-50%, -50%)";
restartBtn.style.padding = "1.5% 3%";
restartBtn.style.fontSize = "2vw";
restartBtn.style.display = "none";
container.appendChild(restartBtn);

// -------------------------
// Audio
// -------------------------
const jumpSound = new Audio("assets/jump.mp3");
const hitSound = new Audio("assets/hit.mp3");
const coinSound = new Audio("assets/coin.mp3");
const bgm = new Audio("assets/bgm.mp3");
bgm.loop = true;

// -------------------------
// Variabel game
// -------------------------
let score = 0;
let isJumping = false;
let jumpQueued = false;
let gameStarted = false;
let chibiBottom = 0;
let obstaclePos = 100;
let coinPos = 80;
let moveAnimation;
let bgPosition = 0;

// -------------------------
// Fungsi lompat
// -------------------------
function jump() {
  if (isJumping) return;
  isJumping = true;
  jumpSound.play();
  chibi.src = "assets/chibi_jump.png";

  const maxHeight = 50; 
  const jumpSpeed = 1.8;

  function up() {
    if (chibiBottom >= maxHeight) {
      down();
      return;
    }
    chibiBottom += jumpSpeed;
    chibi.style.bottom = (5 + chibiBottom) + "%";
    requestAnimationFrame(up);
  }

  function down() {
    if (chibiBottom <= 0) {
      chibiBottom = 0;
      chibi.style.bottom = "5%";
      isJumping = false;
      chibi.src = "assets/chibi_idle.png";
      if (jumpQueued) {
        jumpQueued = false;
        jump();
      }
      return;
    }
    chibiBottom -= jumpSpeed;
    chibi.style.bottom = (5 + chibiBottom) + "%";
    requestAnimationFrame(down);
  }

  requestAnimationFrame(up);
}

// -------------------------
// Event listener
// -------------------------
document.addEventListener("keydown", e => {
  if (e.code === "Space") {
    if (!isJumping) jump();
    else jumpQueued = true;
  }
});

document.addEventListener("click", () => {
  if (!isJumping) jump();
  else jumpQueued = true;
});

// -------------------------
// Fungsi main / start
// -------------------------
function startGame() {
  startBtn.style.display = "none";
  restartBtn.style.display = "none";
  statusText.textContent = "";
  gameStarted = true;
  score = 0;
  scoreText.querySelector("#score").textContent = score;
  chibiBottom = 0;
  chibi.style.bottom = "5%";
  obstaclePos = 100;
  obstacle.style.left = obstaclePos + "%";
  coinPos = 80;
  coin.style.left = coinPos + "%";
  coin.style.display = "inline";

  bgm.play();

  function move() {
    // Background bergerak
    bgPosition -= 0.5;
    bg.style.backgroundPositionX = bgPosition + "px";

    // Obstacle
    obstaclePos -= 0.8;
    obstacle.style.left = obstaclePos + "%";

    // Coin
    coinPos -= 0.8;
    coin.style.left = coinPos + "%";

    const chibiLeft = 5;
    const chibiHeight = 30;

    // Tabrakan obstacle
    if (
      obstaclePos < chibiLeft + 6 &&
      obstaclePos > chibiLeft &&
      chibiBottom < chibiHeight
    ) {
      statusText.textContent = "Game Over!";
      restartBtn.style.display = "inline";
      hitSound.play();
      gameStarted = false;
      bgm.pause();
      cancelAnimationFrame(moveAnimation);
      return;
    }

    // Ambil coin
    if (
      coinPos < chibiLeft + 6 &&
      coinPos > chibiLeft &&
      chibiBottom + 5 >= 35 // bottom coin
    ) {
      score += 20;
      scoreText.querySelector("#score").textContent = score;
      coinSound.play();
      coinPos = 120; // reset coin
    }

    // Reset obstacle
    if (obstaclePos <= -5) {
      obstaclePos = 100;
      score += 10;
      scoreText.querySelector("#score").textContent = score;
    }

    // Reset coin
    if (coinPos <= -5) coinPos = 80;

    moveAnimation = requestAnimationFrame(move);
  }

  moveAnimation = requestAnimationFrame(move);
}

// Tombol
startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);
