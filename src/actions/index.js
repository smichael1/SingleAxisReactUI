import axios from 'axios';
import {ActionTypes} from '../websockets';

const ROOT_URL = `http://localhost:9000`;

export const FETCH_COMMANDS = 'FETCH_COMMANDS';


export function fetchCommands() {

    const request = axios.get(`${ROOT_URL}/commands`);

    return {
        type: FETCH_COMMANDS,
        payload: request
    };
}


export function sendWebsocketMessage() {

    console.log('sendWebsocketMessage called');

    return {
        type: ActionTypes.WEBSOCKET_SEND,
        payload: "Scott Websocket rocks",
        meta: { websocket: true }
    }
}
