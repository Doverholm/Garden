import React, { useEffect, useRef } from "react";

import "./GameScreen.css";

import GameManager from '../../gameClasses/GameManager';

const GameScreen = () => {
    const gameManagerRef = useRef(null);

    useEffect(() => {

        if (!gameManagerRef.current) {
            gameManagerRef.current = new GameManager();
        }

        return () => {
            // Clean-up logic
        }

    }, []);

    return (
        <canvas id="canvas" width={400} height={400} className="Game-screen">

        </canvas>
    );
}
export default GameScreen;