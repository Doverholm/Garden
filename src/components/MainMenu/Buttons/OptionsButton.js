import React from "react";
import soundManager from "../../../utils/soundManager";

const OptionsButton = ({ displayOptions }) => {
    
    const handleClick = () => {
        soundManager.playClick();
        displayOptions();
    }

    const playHoverSound = () => {
        soundManager.playHover();
    }

    return <button onMouseEnter={playHoverSound} onClick={handleClick}>Options</button>
}
export default OptionsButton;