import React from "react";
import soundManager from "../../../utils/soundManager";

const LoginButton = () => {
    
    const handleClick = () => {
        soundManager.playClick();
        console.log("login button clicked");
        fetch("http://localhost:3001/api/hello")
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
    }

    const playHoverSound = () => {
        soundManager.playHover();
    }

    return <button onMouseEnter={playHoverSound} onClick={handleClick}>Login</button>
}
export default LoginButton;