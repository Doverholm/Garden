import React from "react";
import soundManager from "../../../utils/soundManager";

import '../OptionsMenu/OptionsMenu.css';

const OptionsMenu = ({ displayMenu }) => {

    const handleClick = () => {
        soundManager.playClick();
        displayMenu()
    }

    const playHoverSound = () => {
        soundManager.playHover();
    }

    return (
        <div className="options-menu">
            <h1>GARDEN</h1>
            <div className='options'>
                <p>Options:</p>
                <div className="back">
                    <button onMouseEnter={playHoverSound} onClick={handleClick}></button>
                </div>
            </div>
        </div>
    );
}
export default OptionsMenu;