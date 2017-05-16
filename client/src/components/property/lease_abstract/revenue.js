import React from 'react';
import axios from 'axios';
import TableInput from '../table_input';
import TextInput from '../text_input';

class Revenue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      property: []
    }

  }
  componentDidMount(){
    var this2 = this;
    axios.get('/api/search' + '/' + this.props.params.id).then(function(res){
      this2.setState({property: res.data.Searches});
    })
  }
    render() {
        return (
            <div className="animated fadeInUp">
                <div className="input-segment">
                    <div className="input-segment-title">Tenant Space Information</div>
                    <table className="lease-revenue-table">
                        <tr>
                            <th>Suite</th>
                            <th>Floor</th>
                            <th>Rentable Square Feet</th>
                            <th>Usable Square Feet</th>
                            <th>From</th>
                            <th>To</th>
                        </tr>
                        <tr>
                            <td><TableInput/></td>
                            <td><TableInput/></td>
                            <td><TableInput/></td>
                            <td><TableInput/></td>
                            <td><TableInput/></td>
                            <td><TableInput/></td>
                        </tr>
                    </table>
                </div>

                <div className="input-segment">
                    <div className="input-segment-title">Rent Schedule</div>
                    <table className="lease-revenue-table">
                        <tr>
                            <th>Suite</th>
                            <th>Charge Code</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Months</th>
                            <th>Annual ($)</th>
                            <th>Monthly ($)</th>
                            <th>Per Square Feet/Year ($)</th>
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

                <div className="input-segment">
                    <div className="input-segment-title">Percentage Sales Rent</div>
                    <table className="lease-revenue-table">
                        <tr>
                            <th>Category</th>
                            <th>Charge Code</th>
                            <th>Sales Estimate</th>
                            <th>Estimated Sales Escalation/Year</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Break Point ($)</th>
                            <th>Ceiling Amount ($)</th>
                            <th>Overage ($)</th>
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

                <div className="input-segment">
                    <div className="input-segment-title">Parking Rent</div>
                    <table className="lease-revenue-table">
                        <tr>

                            <th>Charge Code</th>
                            <th>#</th>
                            <th>Reserved $/Space/Month</th>
                            <th>Total $/month</th>
                            <th>#</th>
                            <th>Unreserved $/Space/Month</th>
                            <th>Total $/month</th>
                            <th>Total Parking/month ($)</th>
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
                        </tr>
                    </table>
                </div>

                <div className="input-segment">
                  <div className="input-segment-title">Budget NER</div>
                  <div className="input-segment-inputs">
                    <TextInput id={this.props.params.id} value={this.state.property['Budget NER']} title="Budget NER"/>

                    <div className="input-segment-item" style={{border: 'none'}}>
                    </div>
                  </div>
                </div>

                <div className="input-segment">
                  <div className="input-segment-title">Late Charge</div>
                  <div className="input-segment-inputs">
                    <TextInput id={this.props.params.id} value={this.state.property['Late Charge']} title="Late Charge"/>
                    <TextInput id={this.props.params.id} value={this.state.property['Late Fee Flat Amount']} title="Late Fee Flat Amount"/>
                    <TextInput id={this.props.params.id} value={this.state.property['Charge Code']} title="Charge Code"/>
                    <TextInput id={this.props.params.id} value={this.state.property['Late Fee Rate']} title="Late Fee Rate"/>
                    <TextInput id={this.props.params.id} value={this.state.property['Days to Delinquency']} title="Days to Delinquency"/>
                    <TextInput id={this.props.params.id} value={this.state.property['Interest Rate']} title="Interest Rate"/>
                    <TextInput id={this.props.params.id} value={this.state.property['Notice Days']} title="Notice Days"/>
                    <TextInput id={this.props.params.id} value={this.state.property['Prime Rate Bank Info']} title="Prime Rate Bank Info"/>
                    <div className="input-segment-item" style={{border: 'none'}}>
                    </div>
                  </div>
                </div>

                <div className="input-segment">
                  <div className="input-segment-title">Expense Recovery</div>
                  <div className="input-segment-inputs">
                    <TextInput id={this.props.params.id} value={this.state.property['Charge Type']} title="Charge Type"/>
                    <TextInput id={this.props.params.id} value={this.state.property['Charge Code']} title="Charge Code"/>
                    <TextInput id={this.props.params.id} value={this.state.property['From']} title="From"/>
                    <TextInput id={this.props.params.id} value={this.state.property['Project PRS%']} title="Project PRS%"/>
                    <TextInput id={this.props.params.id} value={this.state.property['To']} title="To"/>
                    <TextInput id={this.props.params.id} value={this.state.property['Pro Rata Share']} title="Pro Rata Share"/>
                    <TextInput id={this.props.params.id} value={this.state.property['Admin Fee']} title="Admin Fee"/>
                    <TextInput id={this.props.params.id} value={this.state.property['Admin Fee Charge Code']} title="Admin Fee Charge Code"/>
                    <TextInput id={this.props.params.id} value={this.state.property['Suite']} title="Suite"/>
                    <TextInput id={this.props.params.id} value={this.state.property['Gross-up %']} title="Gross-up %"/>
                    <TextInput id={this.props.params.id} value={this.state.property['Base Year']} title="Base Year"/>
                    <TextInput id={this.props.params.id} value={this.state.property['Cap-Min']} title="Cap-Min"/>
                    <TextInput id={this.props.params.id} value={this.state.property['Base Stop']} title="Base Stop"/>
                    <TextInput id={this.props.params.id} value={this.state.property['Cap-Max']} title="Cap-Max"/>
                    <TextInput id={this.props.params.id} value={this.state.property['Tax-Rate']} title="Tax-Rate"/>
                    <TextInput id={this.props.params.id} value={this.state.property['Flat Amount $']} title="Flat Amount $"/>
                    <div className="input-segment-item" style={{border: 'none'}}>
                    </div>
                  </div>
                </div>

            </div>
        );
    }
}
export default Revenue;
