
export default class Camera {

    constructor() {
        this.screenSize = {
            width: 0,
            height: 0,
        }
        this.adjustmentCenter = {
            x: 0,
            y: 0,
        }
        this.positionOnMap = {
            x: 0,
            y: 0,
        }
    }

    setCameraPosition(x, y, map) {
        map.position.x = -x;
        map.position.y = -y;
    }

    target(x, y, map) {
        const targetX = x;
        const targetY = y;
        const newX = this.lerp(map.position.x * -1, targetX, 0.02);
        const newY = this.lerp(map.position.y * -1, targetY, 0.02);
        this.setCameraPosition(newX, newY, map);
    }

    lerp(a, b, t) {
        return a + (b - a) * t;
    }

}