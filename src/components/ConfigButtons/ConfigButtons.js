import React, { useState } from "react";
import soundManager from "../../utils/soundManager.js";

import "./ConfigButtons.css";

const ConfigButtons = () => {
    const [fullscreen, setFullscreen] = useState(false)
    const [sound, setSound] = useState(true);

    const resize = () => {
        soundManager.playClick();
        if (fullscreen === false) {
            setFullscreen(true);
            document.getElementById('app').requestFullscreen();
        } else {
            setFullscreen(false);
            document.exitFullscreen();
        }
    }

    const switchSound = () => {
        soundManager.playClick();
        if (sound === true) {
            setSound(false);
            soundManager.stopMenuMusic();
        } else {
            setSound(true);
            soundManager.playMenuMusic();
        }
    }

    const playHoverSound = () => {
        soundManager.playHover();
    }

    return (
        <div className="config-buttons">
            <div>
                <button onMouseEnter={playHoverSound} onClick={resize} className={`config-button-maximize ${fullscreen ? 'config-button-minimize' : 'config-button-maximize'}`}></button>
            </div>
            <div>
                <button onMouseEnter={playHoverSound} onClick={switchSound} className={`config-button-unmute ${sound ? 'config-button-unmute' : 'config-button-mute'}`}></button>
            </div>
        </div>
    );
}
export default ConfigButtons;