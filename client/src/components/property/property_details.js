import React from 'react';
import TextInput from './text_input';
import axios from 'axios';
class PropertyDetails extends React.Component {
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
          <div className="input-segment-title">Property Details</div>
          <div className="input-segment-inputs">
            <TextInput id={this.props.params.id} value={this.state.property['Property Name']} title="Property Name"/>
            <TextInput id={this.props.params.id} value={this.state.property['Year Built']} title="Year Built"/>
            <TextInput id={this.props.params.id} value={this.state.property['Property Address']} title="Property Address"/>
            <TextInput id={this.props.params.id} value={this.state.property['Year Renovated']} title="Year Renovated"/>
            <TextInput id={this.props.params.id} value={this.state.property['Zip Code']} title="Zip Code"/>
            <TextInput id={this.props.params.id} value={this.state.property['Number of Buildings']} title="Number of Buildings"/>
            <TextInput id={this.props.params.id} value={this.state.property['Country']} title="Country"/>
            <TextInput id={this.props.params.id} value={this.state.property['Number of Stories']} title="Number of Stories"/>
            <TextInput id={this.props.params.id} value={this.state.property['Gross Building Area']} title="Gross Building Area"/>
            <TextInput id={this.props.params.id} value={this.state.property['Building Condition']} title="Building Condition"/>
            <TextInput id={this.props.params.id} value={this.state.property['Net Rentable Area']} title="Net Rentable Area"/>



            <div className="input-segment-item" style={{border: 'none'}}>
            </div>
          </div>
        </div>
        <div className="input-segment">
          <div className="input-segment-title">Location Attributes</div>
          <div className="input-segment-inputs">
            <TextInput id={this.props.params.id} value={this.state.property['Building Type']} title="Building Type"/>
            <TextInput id={this.props.params.id} value={this.state.property['Drive Through']} title="Drive Through"/>
            <TextInput id={this.props.params.id} value={this.state.property['Indoor Seats']} title="Indoor Seats"/>
            <TextInput id={this.props.params.id} value={this.state.property['Outdoor Seats']} title="Outdoor Seats"/>
            <TextInput id={this.props.params.id} value={this.state.property['Location Number']} title="Location Number"/>
            <TextInput id={this.props.params.id} value={this.state.property['Site Number']} title="Site Number"/>
            <TextInput id={this.props.params.id} value={this.state.property['Open Date']} title="Open Date"/>
            <TextInput id={this.props.params.id} value={this.state.property['MSA']} title="MSA"/>
            <TextInput id={this.props.params.id} value={this.state.property['Type of Parking']} title="Type of Parking"/>
            <TextInput id={this.props.params.id} value={this.state.property['Sub Market']} title="Sub Market"/>
            <TextInput id={this.props.params.id} value={this.state.property['Zoning Classification']} title="Zoning Classification"/>
            <TextInput id={this.props.params.id} value={this.state.property['Ingress / Egress']} title="Ingress / Egress"/>
            <TextInput id={this.props.params.id} value={this.state.property['Legal / Conforming']} title="Legal / Conforming"/>
            <TextInput id={this.props.params.id} value={this.state.property['US Highways']} title="US Highways"/>
            <TextInput id={this.props.params.id} value={this.state.property['Number of Parking Spaces']} title="Number of Parking Spaces"/>
            <div className="input-segment-item" style={{border: 'none'}}>
            </div>
          </div>
        </div>
        <div className="input-segment">
          <div className="input-segment-title">Related Documents</div>
          {/* <div className="related-document-item">2017_P&amp;L.xsxl <div className="download-btn">Download <i className="fa fa-download" /></div></div> */}
          <div className="add-document-dropdown-area"><i className="fa fa-upload" /> &nbsp;&nbsp; Drop File Here</div>
        </div>
      </div>
    );
  }
}
export default PropertyDetails;
