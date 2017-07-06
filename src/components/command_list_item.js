/**
 * Created by smichaels on 6/23/17.
 */
import React, {Component} from 'react';

import axios from 'axios';


class CommandListItem extends Component {


    constructor(props) {
        super(props);
        this.sendCommand = this.sendCommand.bind(this);
    }

    sendCommand() {

        console.log(this.props.commandSetupConfig);
        axios.post('http://localhost:9000/command', {commandSetupConfig: this.props.commandSetupConfig})
            .then(response => console.log(response));

    }

    render() {
        return (

            <tr>
                <td>{this.props.commandName}</td>
                <td><div className="form-group">Position: <input type="text" className="form-control"  placeholder="Enter Position" /> meters</div></td>
                <td><button type="button" className="btn btn-primary" onClick={() => this.sendCommand()}>Submit</button></td>
                <td>{this.props.commandState}</td>
            </tr>

        );
    }

}


export default CommandListItem;