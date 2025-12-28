let chibi = document.getElementById("chibi");
let obstacle = document.getElementById("obstacle");
let scoreDisplay = document.getElementById("score");
let status = document.getElementById("status");
let startBtn = document.getElementById("startBtn");
let restartBtn = document.getElementById("restartBtn");

let score = 0;
let isJumping = false;
let jumpQueued = false;
let gameStarted = false;
let chibiBottom = 20;
let obstaclePos = 600;
let moveAnimation;

// -------------------------
// Fungsi lompat
// -------------------------
function jump() {
  if(isJumping) return;
  isJumping = true;

  let maxHeight = 130;

  function up() {
    if(chibiBottom >= maxHeight) {
      down();
      return;
    }
    chibiBottom += 7;
    chibi.style.bottom = chibiBottom + "px";
    requestAnimationFrame(up);
  }

  function down() {
    if(chibiBottom <= 20) {
      chibiBottom = 20;
      chibi.style.bottom = chibiBottom + "px";
      isJumping = false;
      if(jumpQueued) {
        jumpQueued = false;
        jump();
      }
      return;
    }
    chibiBottom -= 7;
    chibi.style.bottom = chibiBottom + "px";
    requestAnimationFrame(down);
  }

  requestAnimationFrame(up);
}

// -------------------------
// Event listener lompat
// -------------------------
document.addEventListener("keydown", e => {
  if(e.code === "Space") {
    if(!isJumping) jump();
    else jumpQueued = true;
  }
});

document.addEventListener("click", () => {
  if(!isJumping) jump();
  else jumpQueued = true;
});

// -------------------------
// Fungsi main / start
// -------------------------
function startGame() {
  startBtn.style.display = "none";   // hilang saat game jalan
  restartBtn.style.display = "none"; // sembunyi
  status.textContent = "";
  gameStarted = true;
  score = 0;
  scoreDisplay.textContent = score;
  chibiBottom = 20;
  chibi.style.bottom = chibiBottom + "px";
  obstaclePos = 600;
  obstacle.style.left = obstaclePos + "px";

  function move() {
    obstaclePos -= 3;
    obstacle.style.left = obstaclePos + "px";

    let chibiLeft = 50;

    if(obstaclePos < chibiLeft + 30 &&
       obstaclePos > chibiLeft &&
       chibiBottom < 30) {
      status.textContent = "Game Over!";
      restartBtn.style.display = "inline"; // tampilkan tombol ulang di tengah
      gameStarted = false;
      cancelAnimationFrame(moveAnimation);
      return;
    }

    if(obstaclePos <= -20) {
      obstaclePos = 600;
      score += 10;
      scoreDisplay.textContent = score;
    }

    moveAnimation = requestAnimationFrame(move);
  }

  moveAnimation = requestAnimationFrame(move);
}

// -------------------------
// Tombol
// -------------------------
startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);
