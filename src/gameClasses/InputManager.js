
export default class InputManager {

    constructor() {
        this.keysPressed = [];
        
        this.initEventListeners();
    }

    initEventListeners() {
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    removeEventListeners() {
        document.removeEventListener('keydown');
        document.removeEventListener('keyup');
    }

    handleKeyDown(event) {
        const validKeys = ['w', 'a', 's', 'd'];
        if (validKeys.includes(event.key.toLowerCase()) && !this.keysPressed.includes(event.key.toLowerCase())) {
            this.keysPressed.unshift(event.key.toLowerCase());
        }
        //console.log(this.keysPressed);
    }

    handleKeyUp(event) {
        let index = this.keysPressed.indexOf(event.key.toLowerCase());
        if (index > -1) {
            this.keysPressed.splice(index, 1);
        }
        //console.log(this.keysPressed);
    }

}