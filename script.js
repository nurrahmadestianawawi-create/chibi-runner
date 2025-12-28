let chibi = document.getElementById("chibi");
let obstacle = document.getElementById("obstacle");
let scoreDisplay = document.getElementById("score");
let status = document.getElementById("status");

let score = 0;
let isJumping = false;
let gameStarted = false;
let obstaclePos = 600; // posisi start obstacle

// -----------------------------------
// Lompat
// -----------------------------------
function jump() {
  isJumping = true;
  let upInterval = setInterval(() => {
    let bottom = parseInt(chibi.style.bottom || 20);
    if(bottom >= 100) {
      clearInterval(upInterval);
      let downInterval = setInterval(() => {
        bottom = parseInt(chibi.style.bottom);
        if(bottom <= 20) {
          clearInterval(downInterval);
          isJumping = false;
        }
        chibi.style.bottom = (bottom - 5) + "px";
      }, 20);
    } else {
      chibi.style.bottom = (bottom + 5) + "px";
    }
  }, 20);
}

// -----------------------------------
// Event lompat (PC & HP)
// -----------------------------------
document.addEventListener("keydown", function(e) {
  if(e.code === "Space" && !isJumping) {
    jump();
    if(!gameStarted) startGame();
  }
});

document.addEventListener("click", function() {
  if(!isJumping) {
    jump();
    if(!gameStarted) startGame();
  }
});

// -----------------------------------
// Mulai obstacle
// -----------------------------------
function startGame() {
  gameStarted = true;
  obstacle.style.left = obstaclePos + "px";

  let moveInterval = setInterval(() => {
    obstaclePos -= 5; // gerak ke kiri
    obstacle.style.left = obstaclePos + "px";

    let chibiLeft = 50;
    let chibiBottom = parseInt(chibi.style.bottom || 20);

    // cek tabrakan
    if(obstaclePos <= chibiLeft + 40 && obstaclePos >= chibiLeft && chibiBottom <= 40) {
      status.textContent = "Game Over!";
      clearInterval(moveInterval);
    }

    // reset obstacle
    if(obstaclePos <= -20) {
      obstaclePos = 600;
      score += 10;
      scoreDisplay.textContent = score;
    }
  }, 20);
    }
