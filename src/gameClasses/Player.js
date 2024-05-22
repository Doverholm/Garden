import GameObject from "./GameObject";

const Direction = {
    N: 'N',
    NE: 'NE',
    E: 'E',
    SE: 'SE',
    S: 'S',
    SW: 'SW',
    W: 'W',
    NW: 'NW'
}

const keyCombinations = {
    w: {
        d: Direction.NE,
        a: Direction.NW,
        direction: Direction.N,
    },
    d: {
        w: Direction.NE,
        s: Direction.SE,
        direction: Direction.E,
    },
    s: {
        d: Direction.SE,
        a: Direction.SW,
        direction: Direction.S,
    },
    a: {
        s: Direction.SW,
        w: Direction.NW,
        direction: Direction.W,
    }
}

export default class Player extends GameObject {

    constructor(config) {
        super(config);
        this.size.height = 100;

        this.direction = Direction.S;
        this.isMoving = false;
        this.velocity = { x: 0, y: 0 };
        this.speed = 0;
        this.maxSpeed = 2.5;
        this.acceleration = 0.5;
        this.friction = 0.75;

        this.animation = {
            animating: false,
            currentFrame: null,
            currentFacing: null,
            size: null
        }

    }

    updatePlayer(keys) {
        this.updateDirection(keys);
        this.updateVelocity(keys);
        this.updatePos();
        this.checkAnimation();
        //console.log(this.animation.animating);
    }

    updateDirection(arr) {
        if (arr.length === 1 && keyCombinations[arr[0]]) {
            this.direction = keyCombinations[arr[0]].direction;
        } else if (arr.length > 1 && keyCombinations[arr[1]] && keyCombinations[arr[1]][arr[0]]) {
            this.direction = keyCombinations[arr[1]][arr[0]];
        }
    }

    updateVelocity(arr) {
        if (arr[0] !== undefined) {
            this.isMoving = true;
            this.velocity.x = 0;
            this.velocity.y = 0;

            switch (this.direction) {
                case 'NE':
                    this.velocity.x = 1 * 0.7071;
                    this.velocity.y = 1 * -0.7071;
                    break;
                case 'E':
                    this.velocity.x = 1;

                    //Update Sprite Direction
                    this.animation.currentFacing = 3;
                    break;
                case 'SE':
                    this.velocity.x = 1 * 0.7071;
                    this.velocity.y = 1 * 0.7071;
                    break;
                case 'S':
                    this.velocity.y = 1;

                    //Update Sprite Direction
                    this.animation.currentFacing = 2;
                    break;
                case 'SW':
                    this.velocity.x = 1 * -0.7071;
                    this.velocity.y = 1 * 0.7071;
                    break;
                case 'W':
                    this.velocity.x = -1;

                    //Update Sprite Direction
                    this.animation.currentFacing = 1;

                    break;
                case 'NW':
                    this.velocity.x = 1 * -0.7071;
                    this.velocity.y = 1 * -0.7071;
                    break;
                case 'N':
                    this.velocity.y = -1;

                    //Update Sprite Direction
                    this.animation.currentFacing = 0;
                    break;
                default:
            }
        } else {
            this.isMoving = false;
        }
    }

    updatePos() {
        //console.log(this.speed);
        if (this.isMoving) {
            if (this.speed >= this.maxSpeed) {
                this.speed = this.maxSpeed;
            } else {
                this.speed = this.speed + this.acceleration;
            }
        } else {
            if (this.speed < 0.02) {
                this.speed = 0;
            } else {
                this.speed = this.speed * this.friction;
            } 
        }

        const magnitude = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
        if (magnitude !== 0) {
            this.velocity.x /= magnitude;
            this.velocity.y /= magnitude;
        }

        const x = this.pos.x + this.velocity.x * this.speed;
        const y = this.pos.y + this.velocity.y * this.speed;
        this.pos.x = x;
        this.pos.y = y;
    }

    checkAnimation() {
        this.animation.animating = this.speed > 0.5;
    }

}