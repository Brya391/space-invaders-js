const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(gameLoop);
}

gameLoop();
const player = {
  x: canvas.width / 2 - 25,
  y: canvas.height - 60,
  width: 50,
  height: 20,
  speed: 6
};

function drawPlayer() {
  ctx.fillStyle = "lime";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  requestAnimationFrame(gameLoop);
}
const keys = {};

document.addEventListener("keydown", e => keys[e.code] = true);
document.addEventListener("keyup", e => keys[e.code] = false);

function movePlayer() {
  if (keys["ArrowLeft"] && player.x > 0) {
    player.x -= player.speed;
  }
  if (keys["ArrowRight"] && player.x + player.width < canvas.width) {
    player.x += player.speed;
  }
}
movePlayer();
drawPlayer();
const bullets = [];

function shoot() {
  bullets.push({
    x: player.x + player.width / 2 - 2,
    y: player.y,
    width: 4,
    height: 10,
    speed: 8
  });
}

document.addEventListener("keydown", e => {
  if (e.code === "Space") shoot();
});
function updateBullets() {
  bullets.forEach(b => b.y -= b.speed);
}

function drawBullets() {
  ctx.fillStyle = "white";
  bullets.forEach(b => ctx.fillRect(b.x, b.y, b.width, b.height));
}
updateBullets();
drawBullets();
const invaders = [];

for (let row = 0; row < 4; row++) {
  for (let col = 0; col < 8; col++) {
    invaders.push({
      x: 100 + col * 60,
      y: 50 + row * 40,
      width: 40,
      height: 20,
      alive: true
    });
  }
}
function drawInvaders() {
  ctx.fillStyle = "red";
  invaders.forEach(i => {
    if (i.alive) {
      ctx.fillRect(i.x, i.y, i.width, i.height);
    }
  });
}
function detectCollisions() {
  bullets.forEach(bullet => {
    invaders.forEach(invader => {
      if (
        invader.alive &&
        bullet.x < invader.x + invader.width &&
        bullet.x + bullet.width > invader.x &&
        bullet.y < invader.y + invader.height &&
        bullet.y + bullet.height > invader.y
      ) {
        invader.alive = false;
        bullet.y = -100;
      }
    });
  });
}
detectCollisions();
drawInvaders();

