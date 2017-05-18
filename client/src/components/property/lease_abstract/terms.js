import React from 'react';
import axios from 'axios';
import TextInput from '../text_input';

class Terms extends React.Component{
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
          <div className="input-segment-title">Tenant</div>
          <div className="input-segment-inputs">
            <TextInput id={this.props.params.id} value={this.state.property['Legal Name']} title="Legal Name"/>
            <TextInput id={this.props.params.id} value={this.state.property['Company Name']} title="Company Name"/>
            <TextInput id={this.props.params.id} value={this.state.property['Tenant Email']} title="Tenant Email"/>
            <TextInput id={this.props.params.id} value={this.state.property['Tenant Address']} title="Tenant Address"/>
            <TextInput id={this.props.params.id} value={this.state.property['Tenant Phone']} title="Tenant Phone"/>
            <TextInput id={this.props.params.id} value={this.state.property['Tenant Tax ID']} title="Tenant Tax ID"/>
            <div className="input-segment-item" style={{border: 'none'}}>
            </div>
          </div>
        </div>

        <div className="input-segment">
          <div className="input-segment-title">Landlord</div>
          <div className="input-segment-inputs">
            <TextInput id={this.props.params.id} value={this.state.property['Landlord Legal Name']} title="Legal Name"/>
            <TextInput id={this.props.params.id} value={this.state.property['Landlord Contact Name']} title="Company Name"/>
            <TextInput id={this.props.params.id} value={this.state.property['Landlord Email']} title="Tenant Email"/>
            <TextInput id={this.props.params.id} value={this.state.property['Landlord Address']} title="Tenant Address"/>
            <TextInput id={this.props.params.id} value={this.state.property['Landlord Phone']} title="Tenant Phone"/>
            <TextInput id={this.props.params.id} value={this.state.property['Landlord Tax ID']} title="Tenant Tax ID"/>
            <div className="input-segment-item" style={{border: 'none'}}>
            </div>
          </div>
        </div>

        <div className="input-segment">
          <div className="input-segment-title">Billing Name Addresses</div>
          <div className="input-segment-inputs">
            <TextInput id={this.props.params.id} value={this.state.property['Billing Contact Name']} title="Contact Name"/>
            <TextInput id={this.props.params.id} value={this.state.property['Billing Tenant Address']} title="Tenant Address"/>
            <div className="input-segment-item" style={{border: 'none'}}>
            </div>
          </div>
        </div>

        <div className="input-segment">
          <div className="input-segment-title">Notice Name Addresses</div>
          <div className="input-segment-inputs">
            <TextInput id={this.props.params.id} value={this.state.property['Notice Contact Name']} title="Contact Name"/>
            <TextInput id={this.props.params.id} value={this.state.property['Notice Tenant Address']} title="Tenant Address"/>
            <div className="input-segment-item" style={{border: 'none'}}>
            </div>
          </div>
        </div>

        <div className="input-segment">
          <div className="input-segment-title">Sub-lessee/Assignee Contact</div>
          <div className="input-segment-inputs">
            <TextInput id={this.props.params.id} value={this.state.property['Sub-lessee Contact Name']} title="Contact Name"/>
            <TextInput id={this.props.params.id} value={this.state.property['Sub-lessee Tenant Address']} title="Tenant Address"/>
            <div className="input-segment-item" style={{border: 'none'}}>
            </div>
          </div>
        </div>

        <div className="input-segment">
          <div className="input-segment-title">Lease Dates</div>
          <div className="input-segment-inputs">
            <TextInput id={this.props.params.id} value={this.state.property['Lease Execution']} title="Lease Execution"/>
            <TextInput id={this.props.params.id} value={this.state.property['Month to Month']} title="Month to Month"/>
            <TextInput id={this.props.params.id} value={this.state.property['Lease Commencement']} title="Lease Commencement"/>
            <TextInput id={this.props.params.id} value={this.state.property['Lease Terms']} title="Terms"/>
            <TextInput id={this.props.params.id} value={this.state.property['Rent Commencement']} title="Rent Commencement"/>
            <TextInput id={this.props.params.id} value={this.state.property['Early Termination']} title="Early Termination"/>
            <TextInput id={this.props.params.id} value={this.state.property['Lease Expiration']} title="Lease Expiration"/>
            <div className="input-segment-item" style={{border: 'none'}}>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Terms;
