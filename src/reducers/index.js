import { combineReducers } from 'redux';
import CommandsReducer from './reducer_commands';
import WebsocketsReducer from './reducer_websockets';


const rootReducer = combineReducers({

    commands: CommandsReducer,
    telemetry: WebsocketsReducer

});

export default rootReducer;
