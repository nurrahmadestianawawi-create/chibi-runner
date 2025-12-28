// Ambil canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Ukuran canvas
canvas.width = window.innerWidth;
canvas.height = 400;

// Load gambar
const chibiIdle = new Image();
chibiIdle.src = "assets/chibi_idle.png";

const chibiJump = new Image();
chibiJump.src = "assets/chibi_jump.png";

const background = new Image();
background.src = "assets/background.png";

// Posisi chibi
let chibi = {
  x: 50,
  y: canvas.height - 100, // posisi dasar
  width: 80,
  height: 80,
  vy: 0,
  gravity: 0.8,
  jumpPower: -15,
  isJumping: false
};

// Kontrol lompat dengan space atau tab layar
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !chibi.isJumping) {
    chibi.vy = chibi.jumpPower;
    chibi.isJumping = true;
  }
});

canvas.addEventListener("touchstart", () => {
  if (!chibi.isJumping) {
    chibi.vy = chibi.jumpPower;
    chibi.isJumping = true;
  }
});

// Game loop
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Gambar background
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  // Update posisi chibi
  chibi.vy += chibi.gravity;
  chibi.y += chibi.vy;

  if (chibi.y >= canvas.height - chibi.height - 20) {
    chibi.y = canvas.height - chibi.height - 20;
    chibi.vy = 0;
    chibi.isJumping = false;
  }

  // Gambar chibi
  if (chibi.isJumping) {
    ctx.drawImage(chibiJump, chibi.x, chibi.y, chibi.width, chibi.height);
  } else {
    ctx.drawImage(chibiIdle, chibi.x, chibi.y, chibi.width, chibi.height);
  }

  requestAnimationFrame(update);
}

// Mulai game
update();
