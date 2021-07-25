const obstaclesArray = [];

class Obstacle {
    constructor() {
        this.top = (Math.random() * canvas.height / 3) + 20;
        this.bottom = (Math.random() * canvas.height / 3) + 20;
        this.x = canvas.width;
        this.width = 20;
        this.color = 'hsl(' + hue + ', 100%, 70%)';
        this.counted = false;
    }

    draw() {
        //ctx.globalCompositeOperation = "destination-over";

        ctx.fillStyle = this.color;
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.fillRect(this.x, 0, this.width, this.top);
        ctx.strokeRect(this.x, 0, this.width, this.top);
        ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom);
        ctx.strokeRect(this.x, canvas.height - this.bottom, this.width, this.bottom);
    }

    update() {
        this.x -= gameSpeed;
        if (!this.counted && bird.x > this.x) {
            score++;
            this.counted = true;
        }
        this.draw();
    }
}

function handleObstacles() {
    if (frame % 100 === 0) {
        obstaclesArray.unshift(new Obstacle);

    }
    for (let i = 0; i < obstaclesArray.length; i++) {
        obstaclesArray[i].update();
    }

    // if Obstacles more than 20, remove 
    if (obstaclesArray.length > 20) {
        obstaclesArray.pop(obstaclesArray[0]);
    }
}