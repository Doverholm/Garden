import React from "react";
import soundManager from "../../../utils/soundManager";

const LoginButton = () => {
    
    const handleClick = () => {
        soundManager.playClick();
    }

    const playHoverSound = () => {
        soundManager.playHover();
    }

    return <button onMouseEnter={playHoverSound} onClick={handleClick}>Login</button>
}
export default LoginButton;