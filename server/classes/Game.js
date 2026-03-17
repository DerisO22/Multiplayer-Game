global.self = global; 
import RAPIER from "@dimforge/rapier3d-compat";
import { Player } from "./Player.js";
import { World } from "./GameWorld/World.js";
import { GameState } from "./GameState.js";
import { Lobby } from "./GameWorld/Lobby.js";

const GRAVITY_CONST = -18.81;

export class Game {
    constructor(io) {
        this.io = io;
        this.players = {};
        this.world = null;
        this.GameState = new GameState(io);
        this.Lobby = new Lobby(io);
    }

    async startGame() {
        try {
            const map_winner = await this.Lobby.startVoting();
            console.log(`Map ${map_winner} won the vote`);
 
            await this.initPhysics(map_winner);
        } catch (error) {
            console.error("Error starting game:", error);
            throw error;
        }
    }

    async initPhysics(map_winner) {
        await RAPIER.init();
        this.world = new RAPIER.World({ x: 0.0, y: GRAVITY_CONST, z: 0 });

        const gameWorld = new World(this.world);
        gameWorld.initWorldPhysics(map_winner);
    
        console.log("Physics Loaded via gltf-transform");
        this.setupSocketEvents();
    }
    
    setupSocketEvents() {
        this.io.on("connection", (socket) => {
            this.io.sockets.emit("message", `player at socket ${socket.id} has connected.`);
            this.players[socket.id] = new Player(this, socket);

            socket.on("disconnect", (reason) => {
                const player = this.players[socket.id];

                this.io.sockets.emit("message", `Player at socket ${socket.id} has disconnected`);

                if(player) {
                    this.world.removeRigidBody(player.body);
                    delete this.players[socket.id];
                }
            })

            socket.on("setButton", ({button, value}) => {
                let player = this.players[socket.id];

                if (player) {
                    player.setButton(button, value);
                }
            });

            socket.on("send_message", ({ text }) => {
                let player = this.players[socket.id];

                if (player) {
                    player.sendMessage(text);
                }
            });
        });
    }

    update() {
        if (!this.world) return;

        this.world.step();

        Object.values(this.players).forEach((player) => {
            if (player) player.update();
        });
    }

    getGameState() {
        let players = Object.entries(this.players).map(([id, player]) => {
            return {
                id: id,
                ...player.getDrawInfo(),
            }
        })

        return {
            players
        }
    }
    
    sendState() {
        const state = this.getGameState();
        this.io.sockets.emit("sendState", state);
    }
}