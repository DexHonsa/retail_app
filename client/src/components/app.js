import React from 'react';
import Script from 'react-load-script';
import {browserHistory} from 'react-router';
import Header from './header';
import {connect} from 'react-redux';





class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			clientId : "",
			events : []
		}

	}

	componentDidMount(){
		if(this.props.auth.isAuthenticated){
			//browserHistory.push('/admin/')
		}else{
			browserHistory.push('/login')
		}
	}

 // componentWillMount(){
 //    this.pusher = new Pusher("d3d161be3854778f5031", {
 //      encrypted: true,
 //    });
 //    //this.channel = this.pusher.subscribe('events_to_be_shown');
 //  }

 //  componentDidMount(){
 //    this.channel.bind('created', this.updateEvents);
 //    this.channel.bind('updated', this.updateEvents);
 //    this.channel.bind('deleted', this.updateEvents);
 //  }

 //  componentWillUnmount(){
 //    this.channel.unbind();

 //    this.pusher.unsubscribe(this.channel);
 //  }

  // updateEvents(){
  // 	console.log('updateEvents');
  //   // var newArray = this.state.events.slice(0);
  //   // newArray.unshift(data);

  //   // this.setState({
  //   //   events: newArray,
  //   // });
  // }
	getClient(clientId){
		this.setState({
			clientId : clientId
		})
	}

	render(){


		return (
			<div>

		     <Header clientId={this.getClient.bind(this)} />
		     { React.Children.map( this.props.children, child => React.cloneElement(child, {clientId : this.state.clientId}))}

	          <Script url="https://api.tiles.mapbox.com/mapbox-gl-js/v0.37.0/mapbox-gl.js"
              onCreate={this.handleScriptCreate.bind(this)}
              onError={this.handleScriptError.bind(this)}
              onLoad={this.handleScriptLoad.bind(this)}
            />
            <Script url="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v2.0.1/mapbox-gl-geocoder.js"
              onCreate={this.handleScriptCreate.bind(this)}
              onError={this.handleScriptError.bind(this)}
              onLoad={this.handleScriptLoad.bind(this)}
            />



	    	</div>
	    );

	}










  handleScriptCreate() {
    this.setState({ scriptLoaded: false })
  }

  handleScriptError() {
    this.setState({ scriptError: true })
  }

  handleScriptLoad() {
    this.setState({ scriptLoaded: true })
  }

}

function mapStateToProps(state){
  return {
    auth: state.auth,
    client: state.client
  };
}
export default connect(mapStateToProps)(App);
