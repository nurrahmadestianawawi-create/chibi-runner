// -------------------------
// Buat elemen game
// -------------------------
const body = document.body;

const container = document.createElement("div");
container.style.position = "relative";
container.style.width = "90vw";
container.style.maxWidth = "1200px";
container.style.height = "calc(90vw / 3)";
container.style.background = "#fff";
container.style.border = "2px solid #000";
container.style.overflow = "hidden";
body.appendChild(container);

const ground = document.createElement("div");
ground.style.position = "absolute";
ground.style.bottom = "0";
ground.style.width = "100%";
ground.style.height = "5%";
ground.style.background = "#654321";
container.appendChild(ground);

const chibi = document.createElement("div");
chibi.style.position = "absolute";
chibi.style.bottom = "5%";
chibi.style.left = "5%";
chibi.style.width = "6%";
chibi.style.height = "30%";
chibi.style.background = "red";
container.appendChild(chibi);

const obstacle = document.createElement("div");
obstacle.style.position = "absolute";
obstacle.style.bottom = "5%";
obstacle.style.width = "4%";
obstacle.style.height = "30%";
obstacle.style.background = "green";
container.appendChild(obstacle);

const scoreText = document.createElement("p");
scoreText.innerHTML = "Skor: <span id='score'>0</span>";
container.appendChild(scoreText);

const statusText = document.createElement("p");
container.appendChild(statusText);

const startBtn = document.createElement("button");
startBtn.innerText = "Mulai";
startBtn.style.position = "absolute";
startBtn.style.top = "50%";
startBtn.style.left = "50%";
startBtn.style.transform = "translate(-50%, -50%)";
startBtn.style.padding = "1.5% 3%";
startBtn.style.fontSize = "2vw";
startBtn.style.cursor = "pointer";
container.appendChild(startBtn);

const restartBtn = document.createElement("button");
restartBtn.innerText = "Ulang";
restartBtn.style.position = "absolute";
restartBtn.style.top = "50%";
restartBtn.style.left = "50%";
restartBtn.style.transform = "translate(-50%, -50%)";
restartBtn.style.padding = "1.5% 3%";
restartBtn.style.fontSize = "2vw";
restartBtn.style.cursor = "pointer";
restartBtn.style.display = "none";
container.appendChild(restartBtn);

// -------------------------
// Variabel
// -------------------------
let score = 0;
let isJumping = false;
let jumpQueued = false;
let gameStarted = false;
let chibiBottom = 0;
