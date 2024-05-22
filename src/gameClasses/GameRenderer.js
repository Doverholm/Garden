
export default class GameRenderer {

    constructor(canvas, imgages) {
        this.loadedImages = imgages;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.animationStep = null;
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    renderObject(object) {

        //check if object has a sprite
        if (object.sprite) {
            const image = this.loadedImages[object.sprite.name];
            this.ctx.drawImage(image, object.pos.x, object.pos.y);
        } else {
            this.ctx.fillStyle = "red";
            this.ctx.fillRect(object.pos.x, object.pos.y, object.size.width, object.size.height);
        }

    }

    renderPlayer(player) {
        if (player.animation.animating) {
            this.animatePlayer(player);
        } else {
            this.drawPlayer(player)
        }
    }

    animatePlayer(player) {
        const image = this.loadedImages[player.sprite.name];


        if (this.animationStep >= 3) {
            if (player.animation.currentFrame >= 8) {
                player.animation.currentFrame = 1;
            } else {
                player.animation.currentFrame++;
            }
            this.animationStep = 0;
        }
        this.ctx.drawImage(
            image, 
            player.animation.currentFrame * 112,
            player.animation.currentFacing * 112, 
            112, 
            112, 
            player.pos.x, 
            player.pos.y, 
            112, 
            112
        );
        this.animationStep++;
    }

    drawPlayer(player) {

        
        //check if player has a sprite
        if (player.sprite) {
            const image = this.loadedImages[player.sprite.name];

            //render sprite sheet based on animation step
            if (player.sprite.type === "sheet") {
                this.ctx.drawImage(
                    image, 
                    0, 
                    player.animation.currentFacing * 112, 
                    112, 
                    112, 
                    player.pos.x, 
                    player.pos.y, 
                    112, 
                    112
                );
            } else {
                this.ctx.drawImage(image, player.pos.x, player.pos.y, player.size.x, player.size.y);
            }
        } else {
            this.ctx.fillStyle = "green";
            this.ctx.fillRect(player.pos.x, player.pos.y, player.width, player.height);
        }
    }

    renderImage(imgName) {
        const image = this.loadedImages[imgName];
        this.ctx.drawImage(image, 0, 0);
    }

}