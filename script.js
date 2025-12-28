// Ambil elemen HTML
let chibi = document.getElementById("chibi");
let obstacle = document.getElementById("obstacle");
let scoreDisplay = document.getElementById("score");
let status = document.getElementById("status");

let score = 0;
let isJumping = false;
let gameStarted = false; // obstacle baru jalan setelah lompat/tap

// -----------------------------------
// Fungsi lompat
// -----------------------------------
function jump() {
  isJumping = true;
  let upInterval = setInterval(() => {
    let bottom = parseInt(chibi.style.bottom || 20);
    if(bottom >= 100) { // tinggi maksimal lompat
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
// Event listener lompat
// -----------------------------------

// Keyboard (PC)
document.addEventListener("keydown", function(e) {
  if(e.code === "Space") {
    if(!isJumping) {
      jump();
      if(!gameStarted) {
        moveObstacle();
        gameStarted = true;
      }
    }
  }
});

// Klik / tap layar (HP)
document.addEventListener("click", function() {
  if(!isJumping) {
    jump();
    if(!gameStarted) {
      moveObstacle();
      gameStarted = true;
    }
  }
});

// -----------------------------------
// Fungsi obstacle jalan
// -----------------------------------
function moveObstacle() {
  let obstaclePos = 600; // posisi awal sama seperti CSS
  obstacle.style.right = obstaclePos + "px"; // pastikan sesuai

  let moveInterval = setInterval(() => {
    obstaclePos -= 5;
    obstacle.style.right = obstaclePos + "px";

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
