import { PlayerChat } from "./PlayerChat.js";

import RAPIER from  "@dimforge/rapier3d-compat";
const jumpImpulse = { x: 0.0, y: 10.0, z: 0}
const wakeUp = true;

export class Player {
    constructor(game, socket){
        this.game = game;
        this.socket = socket;
        this.io = socket.id;
        this.position = {x: 0, y: 0, z: 0};
        this.movespeed = {x: 0.1, y: 0.1, z: 0.1};
        this.nickname = `Player_${socket.id.substring(0, 4)}`;
        /**
         * Current Keyboard Inputs
         */
        // w - forward
        // a - left
        // s - backward
        // d - right
        this.input = {};

        this.chat = new PlayerChat(this, socket);

        /**
         * Physics Members
         */
        let bodyDesc = RAPIER.RigidBodyDesc.dynamic()
                       .setTranslation(0, 5, 0)
                       .enabledRotations(false, false, false);

        this.body = this.game.world.createRigidBody(bodyDesc);

        let colliderDesc = RAPIER.ColliderDesc.capsule(0.5, 0.5);
        this.game.world.createCollider(colliderDesc, this.body);

    };

    update() {
        // Movement Logic
        let xInput = 0;
        if (this.input.left) xInput--;
        if (this.input.right) xInput++;

        let zInput = 0;
        if (this.input.forward) zInput--;
        if (this.input.backward) zInput++;

        const currentVel = this.body.linvel();
        this.body.setLinvel(
            { x: xInput * 5, y: currentVel.y, z: zInput * 5 },
            true
        );

        /**
         * Jumping Logic 
         */
        if(this.input.jump) {
            this.body.applyImpulse(jumpImpulse, wakeUp);
            this.input.jump = false;
        };
    };

    setButton(button, value) {
        this.input[button] = value;
    };

    setNickname(newNickname) {
        this.nickname = newNickname;
    }

    getDrawInfo() {
        const position = this.body.translation();
        return {
            position: { x: position.x, y: position.y, z: position.z },
        }
    };

    sendMessage(text) {
        this.chat.handleMessage(text);
    }
}