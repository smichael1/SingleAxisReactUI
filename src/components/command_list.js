/**
 * Created by smichaels on 6/23/17.
 */
import React, {Component} from 'react';
import CommandListItem from './command_list_item';
import {connect} from 'react-redux';

class CommandList extends Component {


    constructor(props) {
        super(props);
        this.renderList = this.renderList.bind(this);
    }

    renderList() {

        return this.props.commands.map((command) => {

            return (
                <CommandListItem key={command.commandName} commandName={command.commandName}
                                 commandState={command.commandState}
                                 commandSetupConfig={command.commandSetupConfig}/>
            );

        });
    }

    render() {
    return (
        <form className="form-inline">

            <table className="table">
                <caption>Select a command and press Submit to send.</caption>
                <thead>
                <tr>
                    <th>Command</th>
                    <th>Arguments</th>
                    <th> </th>
                    <th>Command State</th>
                </tr>
                </thead>
                <tbody>
                {this.renderList()}
                </tbody>
            </table>
        </form>
    );
    }

}

function mapStateToProps(state) {
    return {
        commands: state.commands
    }
}

export default connect(mapStateToProps)(CommandList);