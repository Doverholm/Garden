import React from "react";
import soundManager from "../../../utils/soundManager";

const LoginButton = ({ displayGameScreen }) => {
    
    const handleClick = () => {
        soundManager.playClick();
        console.log("login button clicked");
        fetch("https://doverholms-garden-f9b37f3b70c4.herokuapp.com/api/hello")
            .then(response => {
                if (!response) {
                    throw new Error("Network response not ok");
                }
                return response.text();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });

        displayGameScreen();
    }

    const playHoverSound = () => {
        soundManager.playHover();
    }

    return <button onMouseEnter={playHoverSound} onClick={handleClick}>Login</button>
}
export default LoginButton;