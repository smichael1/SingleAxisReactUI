/**
 * Created by smichaels on 6/23/17.
 */


import {WebsocketActionTypes} from '../websockets';


export default function(state = [], action) {

    switch (action.type) {

        case WebsocketActionTypes.RECEIVE:
            console.log('websocket received data: ' + action.payload);

            const payload = JSON.parse(action.payload);
            
            /* dummy data for testing
            const payload = [
                {field: 'commandState', value: 'Busy', units: ''},
                {field: 'moveState', value: 'Moving', units: ''},
                {field: 'stagePosition', value: '0.042', units: 'meters'}
            ];
            */
            return payload;

        case WebsocketActionTypes.CONNECTED:
            console.log('websocket connected: ' + action.payload);
            return state;
    }

    return state;
}