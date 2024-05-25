
export default class InputManager {

    constructor() {
        this.keysPressed = new Set();
        this.validKeys = new Set(['w', 'a', 's', 'd']);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.initEventListeners();
    }

    initEventListeners() {
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
    }

    removeEventListeners() {
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('keyup', this.handleKeyUp);
    }

    handleKeyDown(event) {
        if (this.validKeys.has(event.key) && this.keysPressed.size < 2) {
            this.keysPressed.add(event.key);
        }
    }

    handleKeyUp(event) {
        this.keysPressed.delete(event.key);
    }

}