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
                            <td><TableInput id={this.props.params.id} value={this.state.property['Suite']} title='Suite'/></td>
                            <td><TableInput id={this.props.params.id} value={this.state.property['Floor']} title='Floor'/></td>
                            <td><TableInput id={this.props.params.id} value={this.state.property['Rentable Square Feet']} title='Rentable Square Feet'/></td>
                            <td><TableInput id={this.props.params.id} value={this.state.property['Usable Square Feet']} title='Usable Square Feet'/></td>
                            <td><TableInput id={this.props.params.id} value={this.state.property['Tenant Space From']} title='Tenant Space From'/></td>
                            <td><TableInput id={this.props.params.id} value={this.state.property['Tenant Space To']} title='Tenant Space To'/></td>
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
                            <td><TableInput id={this.props.params.id} value={this.state.property['Rent Schedule - Suite']} title='Rent Schedule - Suite'/></td>
                            <td><TableInput id={this.props.params.id} value={this.state.property['Rent Schedule - Charge Code']} title='Rent Schedule - Charge Code'/></td>
                            <td><TableInput id={this.props.params.id} value={this.state.property['Rent Schedule - From']} title='Rent Schedule - From'/></td>
                            <td><TableInput id={this.props.params.id} value={this.state.property['Rent Schedule - To']} title='Rent Schedule - To'/></td>
                            <td><TableInput id={this.props.params.id} value={this.state.property['Rent Schedule - Months']} title='Rent Schedule - Months'/></td>
                            <td><TableInput id={this.props.params.id} value={this.state.property['Rent Schedule - Annual ($)']} title='Rent Schedule - Annual ($)'/></td>
                            <td><TableInput id={this.props.params.id} value={this.state.property['Rent Schedule - Monthly ($)']} title='Rent Schedule - Monthly ($)'/></td>
                            <td><TableInput id={this.props.params.id} value={this.state.property['Rent Schedule - Per Square Feet/Year ($)']} title='Rent Schedule - Per Square Feet/Year ($)'/></td>
                            <td><TableInput id={this.props.params.id} value={this.state.property['Rent Schedule - SF']} title='Rent Schedule - SF'/></td>
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
                            <td><TableInput id={this.props.params.id} value={this.state.property['Percentage Sales Rent - Category']} title='Percentage Sales Rent - Category'/></td>
                            <td><TableInput id={this.props.params.id} value={this.state.property['Percentage Sales Rent - Charge Code']} title='Percentage Sales Rent - Charge Code'/></td>
                            <td><TableInput id={this.props.params.id} value={this.state.property['Percentage Sales Rent - Sales Estimate']} title='Percentage Sales Rent - Sales Estimate'/></td>
                            <td><TableInput id={this.props.params.id} value={this.state.property['Percentage Sales Rent - Estimated Sales Escalation/Year']} title='Percentage Sales Rent - Estimated Sales Escalation/Year'/></td>
                            <td><TableInput id={this.props.params.id} value={this.state.property['Percentage Sales Rent - From']} title='Percentage Sales Rent - From'/></td>
                            <td><TableInput id={this.props.params.id} value={this.state.property['Percentage Sales Rent - To']} title='Percentage Sales Rent - To'/></td>
                            <td><TableInput id={this.props.params.id} value={this.state.property['Percentage Sales Rent - Break Point ($)']} title='Percentage Sales Rent - Break Point ($)'/></td>
                            <td><TableInput id={this.props.params.id} value={this.state.property['Percentage Sales Rent - Ceiling Amount ($)']} title='Percentage Sales Rent - Ceiling Amount ($)'/></td>
                            <td><TableInput id={this.props.params.id} value={this.state.property['Percentage Sales Rent - Overage ($)']} title='Percentage Sales Rent - Overage ($)'/></td>
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

                            <td><TableInput id={this.props.params.id} value={this.state.property['Parking Rent - Charge Code']} title='Parking Rent - Charge Code'/></td>
                            <td><TableInput id={this.props.params.id} value={this.state.property['Parking Rent - #']} title='Parking Rent - #'/></td>
                            <td><TableInput id={this.props.params.id} value={this.state.property['Parking Rent - Reserved $/Space/Month']} title='Parking Rent - Reserved $/Space/Month'/></td>
                            <td><TableInput id={this.props.params.id} value={this.state.property['Parking Rent - Total $/month']} title='Parking Rent - Total $/month'/></td>
                            <td><TableInput id={this.props.params.id} value={this.state.property['Parking Rent - #']} title='Parking Rent - #'/></td>
                            <td><TableInput id={this.props.params.id} value={this.state.property['Parking Rent - Unreserved $/Space/Month']} title='Parking Rent - Unreserved $/Space/Month'/></td>
                            <td><TableInput id={this.props.params.id} value={this.state.property['Parking Rent - Total $/month']} title='Parking Rent - Total $/month'/></td>
                            <td><TableInput id={this.props.params.id} value={this.state.property['Parking Rent - Total Parking/month ($)']} title='Parking Rent - Total Parking/month ($)'/></td>
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
