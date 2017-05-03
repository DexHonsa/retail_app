import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
class AddPropertyPopup extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searches : []
    }
  }
  componentDidMount(){
    var this2 = this;
    axios.get('/api/getClientSearches' + '/' + this.props.client.clientId).then(function(res){
      this2.setState({searches:res.data.data});

    })
  }
  render(){
    var searches;

    if(this.state.searches.length > 0){
      searches = this.state.searches.map(function(data,i){
        return <div key={i} className="add-property-item" onClick={() => this.props.addProperty(data.id)}>
          <div className="add-property-img" style={{backgroundImage:'url('+data.imgUrl+')'}}></div>
          <div className="add-property-title">{data.city}</div>
        </div>
      },this)
    }
    return(
      <div className="popup">
        <div className="add-demo-filter-popup animated-slow fadeInUp">
          <div className="add-filter-title">Add Location <i onClick={this.props.hideAddPropertyPopup} className="fa fa-close" /></div>
          {searches}

          <div className="add-filter-footer"><div onClick={this.props.hideAddPropertyPopup} className="add-filter-close-btn">close</div></div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    auth: state.auth,
    client: state.client
  }
}
export default connect(mapStateToProps)(AddPropertyPopup);
