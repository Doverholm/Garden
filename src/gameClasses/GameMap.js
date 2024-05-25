
export default class GameMap {

    constructor(sprite) {
        this.sprite = sprite;
        this.size.width = sprite.width;
        this.size.height = sprite.height;
        this.center.x = this.size.width / 2;
        this.center.y = this.size.height / 2;
        this.position = {
            x: 0,
            y: 0,
        }
    }
}