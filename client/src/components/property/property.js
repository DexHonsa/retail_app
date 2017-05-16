import React from 'react';
import TextInput from './text_input.js';
import {Link, IndexLink} from 'react-router';
import axios from 'axios';
//import './scripts/mini_map.js';

class Property extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      property : []
    }

  }
  componentDidMount(){
    var this2 = this;
    axios.get('/api/search/' + this.props.params.id).then(function(res){
      this2.setState({property:res.data.Searches})

    })
  }
  render(){

    return(
      <div className="main-wrapper" style={{textAlign: 'center', position: 'relative', marginTop:50}}>
        <div className="container" style={{background: '#fff', boxShadow: '1px 1px 3px rgba(0,0,0,0.2)', padding: 0}}>
          <div className="view-client-top" style={{display:'flex', alignItems:'center'}}>
            <div className="saved-search-img" style={{backgroundImage: 'url('+ this.state.property['imgUrl'] +')'}} />
            <div className="saved-search-title">{this.state.property['city']}</div>
          </div>
          <div className="details-container">
            <div className="detail-tabs">
              <IndexLink to={"/property/propertydetails" + '/' + this.props.params.id } className="detail-tab" activeClassName="active">Property Details</IndexLink>
              <Link to={"/property/financialdetails" + '/' + this.props.params.id } className="detail-tab" activeClassName="active">Financial Details</Link>
              <Link to={"/property/leaseinformation/terms" + '/' + this.props.params.id } className="detail-tab" activeClassName="active">Lease Abstract</Link>
              {/*<Link to={"/property/thirdpartyreports" + '/' + this.props.params.id } className="detail-tab" activeClassName="active">Third Party Reports</Link>
              <Link to={"/property/insurance" + '/' + this.props.params.id } className="detail-tab" activeClassName="active">Insurance</Link>
              <Link to={"/property/feedback" + '/' + this.props.params.id } className="detail-tab" activeClassName="active">Feedback</Link>
              <Link to={"/property/events" + '/' + this.props.params.id } className="detail-tab" activeClassName="active">Events</Link>
              <Link to={"/property/requests" + '/' + this.props.params.id } className="detail-tab" activeClassName="active">Requests</Link>
              <Link to={"/property/vendor" + '/' + this.props.params.id } className="detail-tab" activeClassName="active">Vendor</Link>
              <Link to={"/property/tenant" + '/' + this.props.params.id } className="detail-tab" activeClassName="active">Tenant</Link>*/}

            </div>
            {this.props.children}

          </div>
        </div>
      </div>

    );
  }
}
export default Property;
