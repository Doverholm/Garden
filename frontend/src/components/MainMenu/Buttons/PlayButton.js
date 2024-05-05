import React from "react";
import soundManager from "../../../utils/soundManager";

const PlayButton = ({ displayCharacter }) => {

    const handleClick = () => {
        soundManager.playClick();
        displayCharacter();
    }

    const playHoverSound = () => {
        soundManager.playHover();
    }

    return <button onMouseEnter={playHoverSound} onClick={handleClick}>Play</button>
}
export default PlayButton;