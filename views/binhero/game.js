const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let level = 1;
let score = 0;
let targetScore = 5;
let gameRunning = true;

let bin = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 100,
  width: 80,
  height: 80,
  img: new Image()
};

bin.img.src = "assets/ob1.png";

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  bin.width = Math.min(Math.max(canvas.width * 0.15, 80), 150);
  bin.height = bin.width;

  bin.x = canvas.width / 2 - bin.width / 2;
  bin.y = canvas.height - bin.height - 40;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let trashTypes = [
  { img: "assets/1.png", type: "organik" },
  { img: "assets/2.png", type: "organik" },
  { img: "assets/3.png", type: "organik" },
  { img: "assets/5.png", type: "organik" },
  { img: "assets/6.png", type: "nonorganik" },
  { img: "assets/7.png", type: "nonorganik" },
  { img: "assets/8.png", type: "nonorganik" },
  { img: "assets/9.png", type: "nonorganik" },
  { img: "assets/10.png", type: "nonorganik" }
];

let trashes = [];

function spawnTrash() {
  if (!gameRunning) return;

  let random = trashTypes[Math.floor(Math.random() * trashTypes.length)];
  let img = new Image();
  img.onload = function () {
    trashes.push({
      x: Math.random() * (canvas.width - 40),
      y: -40,
      width: 70,
      height: 70,
      img: img,
      type: random.type
    });
  };
  img.src = random.img;
  setTimeout(spawnTrash, Math.random() * 1200 + 800);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(bin.img, bin.x, bin.y, bin.width, bin.height);

  trashes.forEach((trash, index) => {
    trash.y += 2;
    ctx.drawImage(trash.img, trash.x, trash.y, trash.width, trash.height);

    if (
      trash.y + trash.height >= bin.y &&
      trash.x < bin.x + bin.width &&
      trash.x + trash.width > bin.x
    ) {
      if (
        (level === 1 && trash.type === "organik") ||
        (level === 2 && trash.type === "nonorganik")
      ) {
        score++;
      } else {
        score--;
      }
      trashes.splice(index, 1);
    }

    if (trash.y > canvas.height) {
      trashes.splice(index, 1);
    }
  });

  document.getElementById("score").innerText = "Score: " + score;
  document.getElementById("level").innerText = "Level: " + level;

  if (score >= targetScore && level === 1) {
    level = 2;
    score = 0;
    bin.img = new Image();
    bin.img.src = "assets/ob2.png";
    alert("Naik ke Level 2: Non-Organik!");
  }

  if (score >= targetScore && level === 2) {
    finishGame();
  }
}

function gameLoop() {
  if (!gameRunning) return;
  draw();
  requestAnimationFrame(gameLoop);
}

function finishGame() {
  gameRunning = false;
  document.getElementById("game-over").classList.remove("hidden");
  document.getElementById("finalScoreEnd").innerText = score;
}

function restartGame() {
  score = 0;
  level = 1;
  trashes = [];
  gameRunning = true;
  bin.img.src = "assets/ob1.png";
  document.getElementById("game-over").classList.add("hidden");
  spawnTrash();
  gameLoop();
}

function exitGame() {
  alert("Terima kasih sudah bermain! 👋");
  window.location.href = "../../views/index.html";
}

spawnTrash();
gameLoop();

// Kontrol keyboard (desktop)
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && bin.x > 0) {
    bin.x -= 30;
  } else if (e.key === "ArrowRight" && bin.x < canvas.width - bin.width) {
    bin.x += 30;
  }
});

// === Swipe/Drag Mobile ===
canvas.style.touchAction = "none"; // cegah scroll browser

let isDragging = false;
let startX = 0;
let binStartX = 0;

canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  isDragging = true;
  startX = e.touches[0].clientX;
  binStartX = bin.x;
});

canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  if (!isDragging) return;

  const currentX = e.touches[0].clientX;
  const deltaX = currentX - startX;

  bin.x = binStartX + deltaX;
  if (bin.x < 0) bin.x = 0;
  if (bin.x > canvas.width - bin.width) bin.x = canvas.width - bin.width;
});

canvas.addEventListener("touchend", (e) => {
  e.preventDefault();
  isDragging = false;
});
