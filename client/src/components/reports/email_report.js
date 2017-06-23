import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import ReportItem from './report_item';


class EmailReport extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: [],
			clients: [],
			clientId: this.props.client.clientId,
			searches: [],

		}
	}
	componentDidMount() {
		this.getSearches(this.props.client.clientId);
		var this2 = this;


		axios.get('/api/users/' + this.props.auth.user.id).then(function(res){
			this2.setState({
				user: res.data.User
			})
		})

	}

	componentWillReceiveProps(nextProps) {
		this.getSearches(nextProps.client.clientId);
	}
	getSearches(clientId){
		var this2 = this;
		axios.get('/api/search/' + this.props.params.id).then(function(res){
			console.log(res.data);
			this2.setState({
				searches: res.data.Searches
			})
		})
	}
	render(){

		var report;
		if(Object.keys(this.state.searches).length > 0){
			report = <ReportItem id={this.state.searches.id} zip={this.state.searches.zip} latitude={this.state.searches.lat} street={this.state.searches.street} city={this.state.searches.city} longitude={this.state.searches.lng} img={this.state.searches.imgUrl} />;

		}else{
			report = <div className="no-search-results-found">Please Select a Client To See Search Results</div>
		}
		return(
			<main className="main">

		        <div className="main-wrapper" style={{textAlign: 'center', position: 'relative'}}>
		          <div className="container" style={{background: '#fff', boxShadow: '1px 1px 3px rgba(0,0,0,0.2)', padding: 0, paddingBottom: 150}}>
		          {report}

		          </div>
		          </div>
		          </main>

			);
	}
}

function mapStateToProps(state){
  return {
    auth: state.auth,
    client: state.client
  };
}
export default connect(mapStateToProps)(EmailReport);
