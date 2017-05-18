import React from 'react';
import axios from 'axios';
import TableInput from '../table_input';
import TextInput from '../text_input';

class Tenant extends React.Component{
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
          <div className="input-segment-title">Tenant Classification</div>
          <div className="input-segment-inputs">
            <TextInput id={this.props.params.id} value={this.state.property['Business Growth Stage']} title="Business Growth Stage"/>
            <TextInput id={this.props.params.id} value={this.state.property['Industry NAICS']} title="Industry NAICS"/>

            <TextInput id={this.props.params.id} value={this.state.property['Scale']} title="Scale"/>
            <TextInput id={this.props.params.id} value={this.state.property['NAICS Sub-Category']} title="NAICS Sub-Category"/>

            <TextInput id={this.props.params.id} value={this.state.property['Use']} title="Use"/>
            <TextInput id={this.props.params.id} value={this.state.property['D&B Credit Rating']} title="D&B Credit Rating"/>
            <TextInput id={this.props.params.id} value={this.state.property['Insurance Coverage Required($)']} title="Insurance Coverage Required($)"/>
            <TextInput id={this.props.params.id} value={this.state.property['Year in Business']} title="Year in Business"/>




            <div className="input-segment-item" style={{border: 'none'}}>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Tenant;
