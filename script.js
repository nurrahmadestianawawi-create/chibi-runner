let chibi = document.getElementById("chibi");
let obstacle = document.getElementById("obstacle");
let scoreDisplay = document.getElementById("score");
let status = document.getElementById("status");

let score = 0;
let isJumping = false;
let gameStarted = false;
let obstaclePos = 600;

// -------------------------
// Fungsi lompat
// -------------------------
function jump() {
  if(isJumping) return;
  isJumping = true;

  let bottom = parseInt(chibi.style.bottom || 20);
  let maxHeight = 130; // tinggi lompat fix

  function up() {
    if(bottom >= maxHeight) {
      down();
      return;
    }
    bottom += 5;
    chibi.style.bottom = bottom + "px";
    requestAnimationFrame(up);
  }

  function down() {
    if(bottom <= 20) {
      chibi.style.bottom = "20px";
      isJumping = false;
      return;
    }
    bottom -= 5;
    chibi.style.bottom = bottom + "px";
    requestAnimationFrame(down);
  }

  requestAnimationFrame(up);
}

// -------------------------
// Event listener lompat
// -------------------------
document.addEventListener("keydown", e => {
  if(e.code === "Space") jump();
  if(!gameStarted) startGame();
});

document.addEventListener("click", () => {
  jump();
  if(!gameStarted) startGame();
});

// -------------------------
// Fungsi obstacle jalan
// -------------------------
function startGame() {
  gameStarted = true;
  obstaclePos = 600;
  obstacle.style.left = obstaclePos + "px";

  function move() {
    obstaclePos -= 3; // lebih pelan biar pas timing
    obstacle.style.left = obstaclePos + "px";

    let chibiLeft = 50;
    let chibiBottom = parseInt(chibi.style.bottom || 20);

    // cek tabrakan dengan hitbox aman
    if(obstaclePos < chibiLeft + 30 &&
       obstaclePos > chibiLeft &&
       chibiBottom < 30) {
      status.textContent = "Game Over!";
      return; // stop loop
    }

    // reset obstacle
    if(obstaclePos <= -20) {
      obstaclePos = 600;
      score += 10;
      scoreDisplay.textContent = score;
    }

    requestAnimationFrame(move);
  }

  requestAnimationFrame(move);
}
