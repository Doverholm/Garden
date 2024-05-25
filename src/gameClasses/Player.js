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

const DirectionVectors = {
    N: { x: 0, y: -1, facing: 0 },
    NE: { x: 0.7071, y: -0.7071, facing: null },
    E: { x: 1, y: 0, facing: 3 },
    SE: { x: 0.7071, y: 0.7071, facing: null },
    S: { x: 0, y: 1, facing: 2 },
    SW: { x: -0.7071, y: 0.7071, facing: null },
    W: { x: -1, y: 0, facing: 1 },
    NW: { x: -0.7071, y: -0.7071, facing: null },
};

export default class Player extends GameObject {

    constructor(config) {
        super(config);
        this.size.height = 100;

        this.prevStamp = Date.now();

        this.direction = Direction.S;
        this.isMoving = false;
        this.velocity = { x: 0, y: 0 };
        this.speed = 0;
        this.maxSpeed = 2.3;
        this.acceleration = 0.5;
        this.friction = 0.75;

        this.animation = {
            animating: false,
            currentFrame: null,
            currentFacing: null,
            step: 0
        }

    }

    updatePlayer(keys) {
        if (keys.size > 0) {
            this.isMoving = true;
            this.updateDirection(keys);
            this.updateVelocity();
        } else {
            this.isMoving = false;
            this.velocity.x = 0;
            this.velocity.y = 0;
        }
        this.updatePos();
        this.animate();
    }

    updateDirection(set) {
        let arr = Array.from(set);
        let length = arr.length;
        if (length === 1) {
            this.direction = keyCombinations[arr[0]].direction;
        } else if (length === 2 && keyCombinations[arr[length - 2]][arr[length - 1]]) {
            this.direction = keyCombinations[arr[length - 2]][arr[length - 1]];
        } else {
            this.direction = keyCombinations[arr[length - 1]].direction;
        }
    }

    updateVelocity() {
        const directionVector = DirectionVectors[this.direction];
        this.velocity.x = directionVector.x;
        this.velocity.y = directionVector.y;
        if (directionVector.facing !== null) {
            this.animation.currentFacing = directionVector.facing;
        }
    }

    updatePos() {
        if (this.isMoving) {
            this.speed = Math.min(this.speed + this.acceleration, this.maxSpeed);
        } else {
            this.speed = this.speed < 0.02 ? 0: this.speed * this.friction;
        }

        const magnitude = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
        if (magnitude !== 0) {
            this.velocity.x /= magnitude;
            this.velocity.y /= magnitude;
        }

        this.pos.x = this.pos.x + this.velocity.x * this.speed;
        this.pos.y = this.pos.y + this.velocity.y * this.speed;
    }

    animate() {
        if (this.speed > 0.5) {

            if (this.animation.step === 3) {
                if (this.animation.currentFrame === 8) {
                    this.animation.currentFrame = 0;
                } else {
                    this.animation.currentFrame++;
                }
                this.animation.step = 0;
            } else {
                this.animation.step++;
            }
            
        } else {
            this.animation.currentFrame = 0;
        }
    }

}