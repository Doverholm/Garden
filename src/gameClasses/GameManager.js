
import io from 'socket.io-client';

import GameRenderer from './GameRenderer';
import InputManager from './InputManager';
import Camera from './Camera';
import Player from './Player';

const socketUrl = 'https://doverholms-garden-f9b37f3b70c4.herokuapp.com/';

export default class GameManager {

    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.renderer = null;
        this.inputManager = null;
        this.socket = null;
        this.loadedImages = null;
        this.gameState = null;
        this.gameLoopRunning = false;

        window.addEventListener('resize', this.resizeCanvas);
        this.resizeCanvas();

        this.initGame();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    socketListener() {

        this.socket.on('playerJoined', (playerData) => {
            if (playerData.id != this.socket.id) {
                this.gameState.players.set(playerData.id, new Player(playerData));
            }
        });

        this.socket.on('newPlayerState', (newState) => {
            if (newState.id != this.socket.id && newState.stamp > this.gameState.players.get(newState.id).prevStamp) {
                this.gameState.players.get(newState.id).pos = newState.pos;
                this.gameState.players.get(newState.id).animation = newState.animation;
                this.gameState.players.get(newState.id).prevStamp = newState.stamp;
            }
        });

        this.socket.on('playerDisconnected', (id) => {
            this.gameState.players.delete(id);
            console.log(this.gameState);
        });
    }

    // INITIALIZING THE GAME AND STARTING THE GAMELOOP
    initGame() {
        this.initSocket()
            .then(() => this.loadImages())
            .then(() => this.initPlayer())
            .then(() => this.initGameState())
            .then(() => this.initGameRenderer())
            .then(() => this.initInputManager())
            .then(() => this.initCamera())
            .then(() => this.socketListener())
            .then(() => this.startGameLoop())
            .catch(err => console.log(err));
    }

    initSocket() {
        return new Promise((resolve, reject) => {
            this.socket = io(socketUrl);
            this.socket.on('connect', () => {
                console.log('Socket initialized');
                resolve();
            });
            this.socket.on('connect_error', (err) => {
                console.error(('Client failed to connect to server: ', err));
                reject(err);
            });
        });
    }

    loadImages() {
        return new Promise((resolve, reject) => {
            this.socket.emit('reqImages');
            this.socket.on('resImages', (imageMetaDataArray) => {
                const imageMetaData = new Map(imageMetaDataArray);
                let loadedSprites = {};

                imageMetaData.forEach((url, name) => {
                    const img = new Image();
                    img.src = "https://doverholms-garden-f9b37f3b70c4.herokuapp.com/" + url;

                    img.onload = () => {
                        loadedSprites[name] = img;

                        if (Object.keys(loadedSprites).length === imageMetaData.size) {
                            this.loadedImages = loadedSprites;
                            console.log('Loaded images');
                            resolve();
                        }
                    }

                    img.onerrror = () => {
                        reject(new Error(('Failed to load images')));
                    }
                });
            });
        });
    }

    initPlayer() {
        return new Promise((resolve, reject) => {
            const newPlayer = new Player({
                id: this.socket.id,
                pos: {
                    x: 1200,
                    y: 500
                },
                sprite: {
                    name: "BODY-skeleton",
                    type: "sheet",
                },
                animation: {
                    animating: false,
                    currentFrame: 0,
                    currentFacing: 2,
                    size: 64
                }
            });
            this.socket.emit('newPlayer', newPlayer);
            this.socket.on('newPlayerInitialized', () => {
                console.log('Player initialized');
                resolve();
            });
            this.socket.on('newPlayerInitFailed', () => {
                reject(new Error(('Failed to initialize new player')));
            });
        });
    }

    initGameState() {
        return new Promise ((resolve, reject) => {
            this.socket.emit('reqGameState');
            this.socket.on('resGameState', (gameState) => {
                const players = new Map();
                const objects = new Map(gameState.objects);

                gameState.players.forEach(([id, playerData]) => {
                    players.set(id, new Player(playerData));
                });
    
                this.gameState = {
                    players: players,
                    objects: objects,
                    map: gameState.map
                }
                
                console.log('Gamestate initialized');
                resolve();
            });
            this.socket.on('initGameStateFailed', () => {
                reject(new Error('Failed to initialize gameState'));
            });
        });
    }

    initGameRenderer() {
        this.renderer = new GameRenderer(this.canvas, this.loadedImages);
        console.log('GameRenderer initialized');
    }

    initInputManager() {
        this.inputManager = new InputManager();
        console.log('InputManager initialized');
    }

    initCamera() {
        this.camera = new Camera();
        this.camera.screenSize.width = this.canvas.width;
        this.camera.screenSize.height = this.canvas.height;
        this.camera.adjustmentCenter.x = this.camera.screenSize.width / 2;
        this.camera.adjustmentCenter.y = this.camera.screenSize.height / 2;
        this.camera.setCameraPosition(320, 320, this.gameState.map);
    }

    //GAMELOOP
    startGameLoop() {
        console.log('Gameloop started');
        this.gameLoopRunning = true;
        this.gameLoop();
    }

    stopGameLoop() {
        this.gameLoopRunning = false;
    }

    gameLoop() {
        if (!this.gameLoopRunning) return;

        this.updatePlayer();
        this.camera.target(
            this.gameState.players.get(this.socket.id).pos.x + 56,
            this.gameState.players.get(this.socket.id).pos.y + 56,
            this.gameState.map
        );

        this.renderGame();
        this.sendPlayerStateToServer();

        requestAnimationFrame(() => this.gameLoop());
    }

    updatePlayer() {
        this.gameState.players.get(this.socket.id).updatePlayer(this.inputManager.keysPressed);
    }

    renderGame() {
        this.renderer.clearCanvas();
        this.renderer.renderMap(this.gameState.map, this.camera);

        this.gameState.objects.forEach((object) => {
            this.renderer.renderObject(object, this.gameState.map, this.camera);
        });

        this.gameState.players.forEach((player) => {
            this.renderer.renderPlayer(player, this.gameState.map, this.camera);
        });

        //this.renderer.drawCrosshair(this.camera);
    }

    sendPlayerStateToServer() {
        this.socket.emit('newPlayerState', {
            id: this.socket.id,
            stamp: Date.now(),
            pos: this.gameState.players.get(this.socket.id).pos,
            animation: this.gameState.players.get(this.socket.id).animation
        });
    }

}