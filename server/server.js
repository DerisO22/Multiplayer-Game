import http from 'http';
import express from 'express'
import path from 'path';
import socketIO from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

import { Game } from './classes/Game';

const PORT = process.env.PORT || 3001;
const FRAME_TIME = Math.floor(1000 / 60);

const app = express();
const server = http.Server(app);
const io = socketIO(server, { pingInterval: 1000 });
const game = new Game(io);

app.set('port', PORT);

setInterval(() => {
    console.log("Running Game Server");

    if (game) {
        game.update();
        game.sendState();
    }
}, FRAME_TIME);

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})