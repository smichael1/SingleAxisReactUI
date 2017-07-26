/**
 * Created by smichaels on 6/23/17.
 */
import React, {Component} from 'react';
import ConfigListItem from './config_list_item';
import {connect} from 'react-redux';

class ConfigList extends Component {


    constructor(props) {
        super(props);
        this.renderList = this.renderList.bind(this);
    }

    // updates of each config item's data
    onUpdate(data) {
        this.setState(data);
    }


    renderList() {

        const componentConfigs = (this.props.target == "assembly") ?
            this.props.assemblyConfigs : this.props.hcdConfigs;


            return componentConfigs.map((config) => {


            //const commandState = (this.props.commandStatus && this.props.commandStatus.commandSetupConfig == command.commandSetupConfig) ? this.props.commandStatus.overallStatus : command.commandState
            
            return (
                <ConfigListItem key={config.name} configName={config.name}
                                 configValue={config.value} onUpdate={this.onUpdate.bind(this)} />
            );

        });
    }

    render() {
    return (
        <form className="form-inline">

            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Value</th>
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

    // this is where we decide which data to put into the component
    // if it is an HCD config, then use the hcdConfig

        return {
            assemblyConfigs: state.assemblyConfigs,
            hcdConfigs: state.hcdConfigs
        }


}

export default connect(mapStateToProps)(ConfigList);