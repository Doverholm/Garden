
export default class GameObject {

    constructor(config) {

        this.id = config.id;
        this.pos = config.pos || {
            x: 400,
            y: 400
        };
        this.size = config.size || {
            width: 50,
            height: 50
        };
        this.sprite = config.sprite;

    }

}