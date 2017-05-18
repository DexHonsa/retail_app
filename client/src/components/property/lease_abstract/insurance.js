import React from 'react';
import axios from 'axios';
import TableInput from '../table_input';
import TextInput from '../text_input';

class Insurance extends React.Component{
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
            <TextInput id={this.props.params.id} value={this.state.property['Insurance Required By']} title="Insurance Required By"/>
            <TextInput id={this.props.params.id} value={this.state.property['Insurance Received']} title="Insurance Received"/>

            <TextInput id={this.props.params.id} value={this.state.property['Insurance Coverage Received($)']} title="Insurance Coverage Received($)"/>
            <TextInput id={this.props.params.id} value={this.state.property['Insurance Certificate Complete & Received']} title="Insurance Certificate Complete & Received"/>

            <TextInput id={this.props.params.id} value={this.state.property['Insurance Coverage Required($)']} title="Insurance Coverage Required($)"/>




            <div className="input-segment-item" style={{border: 'none'}}>
            </div>
          </div>
        </div>

        <div className="input-segment">
          <div className="input-segment-title">Attach Certificates & Details</div>
          <div className="add-document-dropdown-area"><i className="fa fa-upload" /> &nbsp;&nbsp; Drop File Here</div>
        </div>
      </div>
    );
  }
}
export default Insurance;
