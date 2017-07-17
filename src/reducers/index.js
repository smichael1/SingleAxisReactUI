import { combineReducers } from 'redux';
import CommandsReducer from './reducer_commands';
import WebsocketsReducer from './reducer_websockets';
import CommandStatusReducer from './reducer_command_status';


const rootReducer = combineReducers({

    commands: CommandsReducer,
    telemetry: WebsocketsReducer,
    commandStatus: CommandStatusReducer

});

export default rootReducer;
