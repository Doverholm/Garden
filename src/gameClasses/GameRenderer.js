
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

    renderMap(map, camera) {
        const image = this.loadedImages[map.spriteName];
        this.ctx.drawImage(image, map.position.x + camera.adjustmentCenter.x, map.position.y + camera.adjustmentCenter.y);
    }

    renderImage(imgName) {
        const image = this.loadedImages[imgName];
        this.ctx.drawImage(image, 0, 0);
    }

    renderObject(object, map, camera) {
        if (object.sprite) {
            const image = this.loadedImages[object.sprite.name];
            this.ctx.drawImage(
                image,
                object.pos.x + map.position.x + camera.adjustmentCenter.x,
                object.pos.y + map.position.y + camera.adjustmentCenter.y
            );
        } else {
            this.ctx.fillStyle = "red";
            this.ctx.fillRect(
                object.pos.x + map.position.x + camera.adjustmentCenter.x,
                object.pos.y + map.position.y + camera.adjustmentCenter.y,
                object.size.width,
                object.size.height
            );
        }
    }

    renderPlayer(player, map, camera) {
        if (player.sprite) {
            const image = this.loadedImages[player.sprite.name];

            if (player.sprite.type === "sheet") {
                this.ctx.drawImage(
                    image,
                    player.animation.currentFrame * 112,
                    player.animation.currentFacing * 112,
                    112,
                    112,
                    player.pos.x + map.position.x + camera.adjustmentCenter.x,
                    player.pos.y + map.position.y + camera.adjustmentCenter.y,
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

    drawCrosshair(camera) {
        const thicness = 1;
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(0, camera.screenSize.height / 2, camera.screenSize.width, thicness);
        this.ctx.fillRect(camera.screenSize.width / 2, 0, thicness, camera.screenSize.height);
    }

}