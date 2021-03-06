import React from 'react';
import axios from 'axios';
import TableInput from '../table_input';
import TextInput from '../text_input';

class Capex extends React.Component{
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
            <div className="input-segment-title">Tenant Improvements</div>
            <table className="lease-revenue-table">
                <tr>
                    <th>Name</th>
                    <th>Charge Code</th>
                    <th>Amount Per Square Feet ($)</th>
                    <th>Total Amount ($)</th>
                    <th>Start Work Date</th>

                </tr>
                <tr>
                    <td><TableInput/></td>
                    <td><TableInput/></td>
                    <td><TableInput/></td>
                    <td><TableInput/></td>
                    <td><TableInput/></td>

                </tr>
            </table>
        </div>

        <div className="input-segment">
          <div className="input-segment-title">Leasing Commission</div>
          <div className="input-segment-inputs">
            <TextInput id={this.props.params.id} value={this.state.property['Listing']} title="Listing"/>
            <TextInput id={this.props.params.id} value={this.state.property['Procurement']} title="Procurement"/>
            <TextInput id={this.props.params.id} value={this.state.property['Bonus']} title="Bonus"/>

            <div className="input-segment-item" style={{border: 'none'}}>
            </div>
          </div>
        </div>

        <div className="input-segment">
            <div className="input-segment-title">Other Capital Exp</div>
            <table className="lease-revenue-table">
                <tr>
                    <th>Name</th>
                    <th>Charge Code</th>
                    <th>Amount Per Square Feet ($)</th>
                    <th>Total Amount ($)</th>
                    <th>Notes</th>

                </tr>
                <tr>
                    <td><TableInput/></td>
                    <td><TableInput/></td>
                    <td><TableInput/></td>
                    <td><TableInput/></td>
                    <td><TableInput/></td>

                </tr>
            </table>
        </div>

        <div className="input-segment">
          <div className="input-segment-title">Deposits</div>
          <div className="input-segment-inputs">
            <TextInput id={this.props.params.id} value={this.state.property['Security Deposit']} title="Security Deposit"/>
            <TextInput id={this.props.params.id} value={this.state.property['Suite']} title="Suite"/>

            <TextInput id={this.props.params.id} value={this.state.property['Letter of Credit $']} title="Letter of Credit $"/>
            <TextInput id={this.props.params.id} value={this.state.property['Charge Code']} title="Charge Code"/>

            <TextInput id={this.props.params.id} value={this.state.property['Rent Prepaid']} title="Rent Prepaid"/>
            <TextInput id={this.props.params.id} value={this.state.property['Charge Code']} title="Charge Code"/>

            <TextInput id={this.props.params.id} value={this.state.property['Key Deposit']} title="Key Deposit"/>
            <TextInput id={this.props.params.id} value={this.state.property['Charge Code']} title="Charge Code"/>


            <div className="input-segment-item" style={{border: 'none'}}>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Capex;
