import React, { Component } from 'react';
import CommandList from './command_list';
import TelemetryList from './telemetry_list';
import LoadButton from './load_button';
import WsSendButton from './ws_send_button';

class App extends Component {



  render() {
      

      return (
        <div>
          <h1>Single Axis Assembly</h1>
           <div className="panel panel-default">

          <div id="commandSection" className="panel-body">
            <h2>Commands</h2>

            <CommandList />
          </div>
                </div>
            <div className="panel panel-default">

            <div id="telemetrySection" className="panel-body">

                <div className="pull-right">
                    Mode: <button type="button" className="btn btn-success">Normal</button>
                </div>
                <h2>Telemetry</h2>
                <TelemetryList />
          </div>

                </div>

            <div>
                <LoadButton />
            </div>
        </div>



      );
  }
}

export default App;