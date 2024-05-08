import React, { useEffect, useRef } from "react";

import "./GameScreen.css";

const GameScreen = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        }

    }, []);

    return (
        <canvas ref={canvasRef} width={400} height={400} className="Game-screen">

        </canvas>
    );
}
export default GameScreen;