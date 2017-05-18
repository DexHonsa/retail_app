import React from 'react';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import {connect} from 'react-redux';
import ProspectiveLocationItem from './prospective_location';
class ProspectiveLocations extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searches: []
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      searches : nextProps.searches,

    })
  }
  componentDidMount(){
    this.getClientSearches(this.props.client.clientId);
  }
  getClientSearches(clientId){
    var this2 = this;
    axios.get('/api/getClientSearches/'+ clientId).then(function(res){
      this2.setState({searches: res.data.data});
    })
  }
  refresh(){
    this.props.refresh();
  }

  render(){
    var searches;
    searches = this.state.searches.map(function(data, i){
      return <ProspectiveLocationItem refresh={this.refresh.bind(this)} key={i} id={data.id} city={data.city} street={data.street} sales={data.sales} profit={data.profit} totalSf={data.totalSf} headcount={data.headcount} expenses={data.expenses} imgUrl={data.imgUrl}   />;
    },this)
    return(
      <div className="animated fadeIn">
        <ul className="prospective-locations-list">
          {searches}
          <ReactTooltip />

        </ul>
      </div>
    );
  }
}
function mapStateToProps(state){
  return {
    auth: state.auth,
    client: state.client
  };
}
export default connect(mapStateToProps)(ProspectiveLocations);
