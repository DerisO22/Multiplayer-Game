import RAPIER from "@dimforge/rapier3d-compat";
import { Player } from "./Player.js";

const GRAVITY_CONST = -9.81;

export class Game {
    constructor(io) {
        this.io = io;
        this.players = {};
        this.world = null;
        this.initPhysics();
    }

    async initPhysics() {
        await RAPIER.init();

        const gravity = { x: 0.0, y: GRAVITY_CONST, z: 0 };
        this.world = new RAPIER.World(gravity);

        let groundBodyDesc = RAPIER.RigidBodyDesc.fixed();
        let groundBody = this.world.createRigidBody(groundBodyDesc);
        let groundColliderDesc = RAPIER.ColliderDesc.cuboid(100, 0.1, 100); 
        this.world.createCollider(groundColliderDesc, groundBody);

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