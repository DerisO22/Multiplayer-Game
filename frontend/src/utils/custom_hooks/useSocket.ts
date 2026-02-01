import { useEffect, useRef } from "react";
import { io, type Socket } from "socket.io-client";

const SERVER_URL = 'http://localhost:3001';

export const useSocket = () => {
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        socketRef.current = io(SERVER_URL, {
            transports: ['websocket'],
        });

        socketRef.current.on('connect', () => {
            console.log(`Connected to server: ${socketRef.current?.id}`);
        });

        socketRef.current.on('disconnect', () => {
            console.log(`Disconnected from server`);
        });

        socketRef.current.on('message', (message: string) => {
            console.log(`Server message: ${message}`);
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        }
    }, [])

    return socketRef.current;
}