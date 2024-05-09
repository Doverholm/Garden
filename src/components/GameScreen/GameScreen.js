import React, { useEffect, useRef } from "react";
import io from "socket.io-client";

import "./GameScreen.css";

const socket = io('https://doverholms-garden-f9b37f3b70c4.herokuapp.com/');

const GameScreen = () => {
    const canvasRef = useRef(null);
    const keys = {};

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            socket.emit('requestRedraw');
        }

        const handleKeyDown = (e) => {
            keys[e.key] = true;
        }

        const handleKeyUp = (e) => {
            delete keys[e.key];
        }

        const handlePlayerMovement = () => {
            let x = 0;
            let y = 0;
            if (Object.keys(keys).length > 0) {
                if ('ArrowUp' in keys) {
                    y -= 5;
                }
                if ('ArrowDown' in keys) {
                    y += 5;
                }
                if ('ArrowRight' in keys) {
                    x += 5;
                }
                if ('ArrowLeft' in keys) {
                    x -= 5;
                }
                socket.emit('move', {
                    id: socket.id,
                    x: x,
                    y: y
                });
            }
            window.requestAnimationFrame(handlePlayerMovement);
        }

        const drawPlayers = (players) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (const playerId in players) {
                const player = players[playerId];
                ctx.fillStyle = `rgb(${player.color.r}, ${player.color.g}, ${player.color.b})`;
                ctx.fillRect(player.pos.x, player.pos.y, player.size.x, player.size.y);
            }
        }

        socket.emit('enter-world', {
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        });

        socket.on('playersObject', drawPlayers);

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        resizeCanvas();

        window.requestAnimationFrame(handlePlayerMovement);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyUp', handleKeyUp);
        }

    }, []);

    return (
        <canvas ref={canvasRef} width={400} height={400} className="Game-screen">

        </canvas>
    );
}
export default GameScreen;