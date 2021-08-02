class Bird {
    constructor() {
        this.x = 150;
        this.y = 200;
        this.vy = 0; // velocity/speed y
        this.birdImg = new Image();
        this.birdImg.src = 'images/bird.png';
        this.orginalWidth = 4296;
        this.orginalHeight = 3376;
        this.spriteWidth = this.orginalWidth / 4;
        this.spriteHeight = this.orginalHeight / 4;
        this.width = 70;
        this.height = 70;
        this.weight = 1;
        this.frameX = 0;
        this.frameY = 0;

    }

    update() {

        let curve = Math.sin(angle) * 20;

        // if Bird reach the TOP of canvas
        if (this.y < 0 - this.height) {
            this.y = 0;
            this.vy = 0;
        }
        // if Bird reach the BOTTOM of canvas
        if (this.y > canvas.height - (this.height) + curve) {
            this.y = canvas.height - (this.height) + curve;
            this.vy = 0;
        } else {
            // make bird fall down, and the longer it falls the fast it falls
            this.vy += this.weight;
            this.vy *= 0.9;
            this.y += this.vy;
        }






        // flip bird with when 'space key' is pressed
        if (spacePressed === true && this.y > this.height) {
            this.flip();
        }
    }

    draw() {

        ctx.fillStyle = 'red';
        ctx.drawImage(this.birdImg, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }

    flip() {
        this.vy -= 2; // push bird up

        
        if (frame % 3 === 0) {
            if (this.frameX < 3) {
                this.frameX++;
            } else {

                this.frameX = 0;
                if (this.frameY < 3) {
                    this.frameY++;
                } else {
                    this.frameY = 0;
                }
            }
        }
    }
}

const bird = new Bird();
