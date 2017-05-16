import React from 'react';
import TextInput from './text_input';
import axios from 'axios';
import {Link} from 'react-router';
class LeaseInformation extends React.Component {
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
  render(){
    return(
      <div className="animated fadeInUp">
        <div className="lease-information-top">
          <div className="lease-information-item">
            <div className="lease-information-title">Building</div>
            <div className="lease-information-value">Orange Plaza</div>
          </div>
          <div className="lease-information-item">
            <div className="lease-information-title">Value of Lease</div>
            <div className="lease-information-value">$0</div>
          </div>
          <div className="lease-information-item">
            <div className="lease-information-title">Term Remaining</div>
            <div className="lease-information-value">81/180 Months</div>

          </div>
        </div>
        <div className="sub-tabs">
          <Link activeClassName="active" to={"/property/leaseinformation/terms/"+ this.props.params.id}><div className="sub-tab">Terms</div></Link>
          <Link activeClassName="active" to={"/property/leaseinformation/revenue/"+ this.props.params.id}><div className="sub-tab">Revenue</div></Link>
          <Link activeClassName="active" to={"/property/leaseinformation/capex/"+ this.props.params.id}><div className="sub-tab">Capex</div></Link>
          <Link activeClassName="active" to={"/property/leaseinformation/options/"+ this.props.params.id}><div className="sub-tab">Options</div></Link>
          <Link activeClassName="active" to={"/property/leaseinformation/clauses/"+ this.props.params.id}><div className="sub-tab">Clauses</div></Link>
          <Link activeClassName="active" to={"/property/leaseinformation/documents/"+ this.props.params.id}><div className="sub-tab">Documents</div></Link>
          <Link activeClassName="active" to={"/property/leaseinformation/insurance/"+ this.props.params.id}><div className="sub-tab">Insurance</div></Link>
          <Link activeClassName="active" to={"/property/leaseinformation/tenant/"+ this.props.params.id}><div className="sub-tab">Tenant</div></Link>
        </div>
        {this.props.children}
      </div>
    );
  }
}
export default LeaseInformation;
