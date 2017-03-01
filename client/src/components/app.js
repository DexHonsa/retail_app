import React from 'react';
import Script from 'react-load-script';

import Header from './header';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			clientId : ""
		}
		
	}
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
		     
	          <Script url="https://api.tiles.mapbox.com/mapbox-gl-js/v0.32.1/mapbox-gl.js"
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

export default App;