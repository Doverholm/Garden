import React, { useEffect } from "react";

import soundManager from "../../../utils/soundManager";

const LoginButton = ({ displayGameScreen }) => {

    const playHoverSound = () => {
        soundManager.playHover();
    }
    
    const handleClick = () => {
        soundManager.playClick();
        displayGameScreen();
    }

    return <button onMouseEnter={playHoverSound} onClick={handleClick}>Login</button>
}
export default LoginButton;