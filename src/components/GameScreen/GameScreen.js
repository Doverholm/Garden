import React, { useEffect, useRef, useState, useCallback } from "react";
import io from "socket.io-client";

import "./GameScreen.css";

import GameRenderer from "../../gameClasses/GameRenderer";
import InputManager from '../../gameClasses/InputManager';

const socketUrl = process.env.REACT_APP_SOCKET_URL || 'https://doverholms-garden-f9b37f3b70c4.herokuapp.com/';

const GameScreen = () => {
    const canvasRef = useRef(null);
    const rendererRef = useRef(null);
    const [socket, setSocket] = useState(null);
    const [gameState, setGameState] = useState(null);
    const [loadedImages, setLoadedImages] = useState(null);
    const [inputManager, setInputManager] = useState(null);

    useEffect(() => {
        const socketInstance = io(socketUrl)
        setSocket(socketInstance);

        return () => {
            if (socketInstance) {
                socketInstance.disconnect();
            }
        }
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!socket || !canvas) return;

        if (loadedImages) {
            const renderer = new GameRenderer(canvas, loadedImages);
            rendererRef.current = renderer;
        };

        setInputManager(new InputManager(socket));

        socket.on('imageMetaData', (imageMetaDataArray) => {
            const imageMetaData = new Map(imageMetaDataArray);
            preloadImages(imageMetaData);
        });

        socket.on('updateGameState', (newGameState) => {
            setGameState(JSON.parse(newGameState));
        });

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            socket.emit('requestRedraw');
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        }

    }, [socket, loadedImages]);

    const preloadImages = (imageMetaData) => {
        let loadedSprites = {};

        imageMetaData.forEach((url, name) => {
            const img = new Image();
            img.src = "http://localhost:3001/" + url;

            img.onload = () => {
                loadedSprites[name] = img;

                if (Object.keys(loadedSprites).length === imageMetaData.size) {
                    setLoadedImages(loadedSprites);
                    console.log(loadedSprites);
                }
            }
        });
    }

    const gameLoop = useCallback(() => {
        const canvas = canvasRef.current;
        const renderer = rendererRef.current;

        if (!canvas || !gameState || !renderer) return;

        renderer.clearCanvas();
        renderer.renderImage(gameState.map.name);

        for (const playerId in gameState.players) {
            const player = gameState.players[playerId];
            renderer.renderPlayer(player);
        }

        for (const gameObject in gameState.gameObjects) {
            const object = gameState.gameObjects[gameObject];
            renderer.renderObject(object);
        }

        window.requestAnimationFrame(gameLoop);
    }, [gameState]);


    useEffect(() => {
        const animationFrameId = window.requestAnimationFrame(gameLoop);
        return () => cancelAnimationFrame(animationFrameId);
    }, [gameState]);

    return (
        <canvas ref={canvasRef} width={400} height={400} className="Game-screen">

        </canvas>
    );
}
export default GameScreen;