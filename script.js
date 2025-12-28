// Ambil elemen dari HTML
let chibi = document.getElementById("chibi");
let obstacle = document.getElementById("obstacle");
let scoreDisplay = document.getElementById("score");
let status = document.getElementById("status");

let score = 0;         // skor awal
let isJumping = false; // status lompat

// -----------------------------------
// Fungsi lompat
// -----------------------------------
// Untuk keyboard (PC)
document.addEventListener("keydown", function(e) {
  if(e.code === "Space") {
    if(!isJumping) jump();
  }
});

// Untuk layar sentuh / klik
document.addEventListener("click", function() {
  if(!isJumping) jump();
});

function jump() {
  isJumping = true;
  let upInterval = setInterval(() => {
    let bottom = parseInt(chibi.style.bottom || 20);
    if(bottom >= 100) { // tinggi maksimal lompat
      clearInterval(upInterval);
      // turun
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
// Fungsi obstacle jalan
// -----------------------------------
function moveObstacle() {
  let obstaclePos = 600; // mulai dari kanan container
  let moveInterval = setInterval(() => {
    obstaclePos -= 5; // obstacle bergerak ke kiri
    obstacle.style.right = obstaclePos + "px";

    // cek tabrakan
    let chibiLeft = 50;
    let chibiBottom = parseInt(chibi.style.bottom || 20);
    if(obstaclePos <= chibiLeft + 40 && obstaclePos >= chibiLeft && chibiBottom <= 40) {
      status.textContent = "Game Over!";
      clearInterval(moveInterval);
    }

    // reset obstacle kalau sudah lewat kiri
    if(obstaclePos <= -20) {
      obstaclePos = 600; // ulang posisi
      score += 10; // tambah skor
      scoreDisplay.textContent = score;
    }
  }, 20); // jalannya obstacle tiap 20ms
}

// panggil fungsi obstacle jalan
moveObstacle();
