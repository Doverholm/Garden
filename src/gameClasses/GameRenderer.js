
export default class GameRenderer {

    constructor(canvas, imgages) {
        this.loadedImages = imgages;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        console.log(this.loadedImages);
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

        //check if player has a sprite
        if (player.sprite) {
            const image = this.loadedImages[player.sprite.name];

            //render sprite sheet based on animation step
            if (player.sprite.type === "sheet") {
                this.ctx.drawImage(
                    image, 
                    player.sprite.animation.currentStep * player.sprite.animation.size, 
                    player.sprite.animation.currentFacing * player.sprite.animation.size, 
                    player.sprite.animation.size, 
                    player.sprite.animation.size, 
                    player.pos.x, 
                    player.pos.y, 
                    player.sprite.animation.size, 
                    player.sprite.animation.size
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