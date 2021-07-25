/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gameSpeed = 2;

const gradient = ctx.createLinearGradient(0, 0, 0, 70);
gradient.addColorStop('0.3', '#eede85');
gradient.addColorStop('0.6', '#fea700');
gradient.addColorStop('0.9', '#eede85');

// Background
const canvasBackground = new Image();
canvasBackground.src = 'images/bg.jpg';

const BG = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height
}

function animateBackground() {

    if (BG.x1 <= -BG.width + gameSpeed) {
        BG.x1 = BG.width;
    } else {
        BG.x1 -= gameSpeed;
    }

    if (BG.x2 <= -BG.width + gameSpeed) {
        BG.x2 = BG.width;
    } else {
        BG.x2 -= gameSpeed;
    }

    ctx.drawImage(canvasBackground, BG.x1, BG.y, BG.width, BG.height);
    ctx.drawImage(canvasBackground, BG.x2, BG.y, BG.width, BG.height);
}


function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    animateBackground();
    angle += 0.12;
    hue++;
    frame++;

    // particles and obstacles
    handleParticles();
    handleObstacles();

    // bird
    bird.update();
    bird.draw();

    // score
    ctx.font = '90px Georgia';
    ctx.fillStyle = gradient;
    ctx.strokeText(score, 50, 70);
    ctx.fillText(score, 50, 70);

    // check collision 
    if (checkCollisions() == true) return; // stop animation loop when collision detected 

    requestAnimationFrame(animate);
}
animate();



window.addEventListener('keydown', e => {
    if (e.code === 'Space') spacePressed = true;

});
window.addEventListener('keyup', e => {
    spacePressed = false;
    bird.frameX = 0;
    bird.frameY = 0;
});


const boomImg = new Image();
boomImg.src = 'images/boomImg.png';


function checkCollisions() {
    for (let i = 0; i < obstaclesArray.length; i++) {

        if (
            (bird.x < obstaclesArray[i].x + obstaclesArray[i].width) &&
            (bird.x + bird.width > obstaclesArray[i].x) &&
            (
                (bird.y < 0 + obstaclesArray[i].top && bird.y + bird.height > 0) ||
                (bird.y > canvas.height - obstaclesArray[i].bottom && bird.y + bird.height < canvas.height)
            )
        ) {
            // collision detected
            ctx.drawImage(boomImg, bird.x + (bird.width / 2), bird.y, 50, 50);
            ctx.font = '25px Georgia';
            ctx.fillStyle = 'black';
            ctx.fillText('Game Over, your score is: ' + score, canvas.width / 3, canvas.height / 2);
            return true;
        }
    }
}


