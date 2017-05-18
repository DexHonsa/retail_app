import React from 'react';
import axios from 'axios';
import TableInput from '../table_input';
import TextInput from '../text_input';

class Options extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      property: []
    }

  }
  componentDidMount(){
    var this2 = this;
    var id = this.props.params.id;
    axios.get('/api/search/' + id).then(function(res){
      this2.setState({property:res.data.Searches})
    }).catch(function (error) {
      if (error.response) {
        axios.get('/api/getUploadedLocation' + '/' + id).then(function(res2){
               this2.setState({property:res2.data.data,isOwned:true});
         })
      }
    })
  }
  render(){
    return(
      <div className="animated fadeInUp">
        <div className="input-segment">
          <div className="input-segment-title">Options</div>
          <div className="input-segment-inputs">
            <TextInput id={this.props.params.id} value={this.state.property['Option Type']} title="Option Type"/>
            <TextInput id={this.props.params.id} value={this.state.property['Suite']} title="Suite"/>

            <TextInput id={this.props.params.id} value={this.state.property['Option Start']} title="Option Start"/>
            <TextInput id={this.props.params.id} value={this.state.property['Notice Start']} title="Notice Start"/>

            <TextInput id={this.props.params.id} value={this.state.property['Option End']} title="Option End"/>
            <TextInput id={this.props.params.id} value={this.state.property['Notice End']} title="Notice End"/>

            <TextInput id={this.props.params.id} value={this.state.property['Auto Renewal']} title="Auto Renewal"/>



            <div className="input-segment-item" style={{border: 'none'}}>
            </div>
          </div>
        </div>

        <div className="input-segment">
            <div className="input-segment-title">Option Rent Schedule</div>
            <table className="lease-revenue-table">
                <tr>
                    <th>Suite</th>
                    <th>Charge Code</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Months</th>
                    <th>Annual</th>
                    <th>Monthly</th>
                    <th>Per Square Feet/Year</th>
                    <th>SF</th>

                </tr>
                <tr>
                    <td><TableInput/></td>
                    <td><TableInput/></td>
                    <td><TableInput/></td>
                    <td><TableInput/></td>
                    <td><TableInput/></td>
                    <td><TableInput/></td>
                    <td><TableInput/></td>
                    <td><TableInput/></td>
                    <td><TableInput/></td>

                </tr>
            </table>
        </div>
      </div>
    );
  }
}
export default Options;
