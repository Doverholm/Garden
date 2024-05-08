
import { Howl } from 'howler';

import menuMusic from '../assets/audio/menumusic.ogg';
import click from '../assets/audio/click.ogg';
import hover from '../assets/audio/hover.ogg';

const soundManager = {
    menuMusic: null,
    click: null,
    hover: null,

    init() {
        if (!this.menuMusic) {
            this.menuMusic = new Howl({
                src: menuMusic,
                loop: true,
                volume: 0.0
            });
        }
        if (!this.click) {
            this.click = new Howl({
                src: click,
                volume: 0.2
            });
        }
        if (!this.hover) {
            this.hover = new Howl({
                src: hover,
                volume: 0.03
            });
        }
    },

    playMenuMusic() {
        if (this.menuMusic && !this.menuMusic.playing()) {
            this.menuMusic.fade(0.0, 0.05, 3000);
            this.menuMusic.play();
        }
    },

    stopMenuMusic() {
        if (this.menuMusic && this.menuMusic.playing()) {
            this.menuMusic.fade(0.05, 0.0, 2000); // Fade out over 2 seconds
            setTimeout(() => {
                this.menuMusic.stop();
            }, 2000);
        }
    },

    playClick() {
        if (this.click) {
            this.click.play();
        }
    },

    playHover() {
        if (this.hover) {
            this.hover.play();
        }
    }

}
export default soundManager;