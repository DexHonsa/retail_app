import React from 'react';

class MapStyles extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active_style : this.props.activeStyle
		}
	}

	changeMap(val){
		this.setState({
			active_style : val
		})
		this.props.changeMap(val);

	}
	render() {
		var one;
		var two;
		var three;

		if(this.state.active_style === 1){
			one = "active";
			two = null;
			three = null;
		}
		if(this.state.active_style === 2){
			one = null;
			two = "active";
			three = null;
		}
		if(this.state.active_style === 3){
			one = null;
			two = null;
			three = "active";
		}
		return (
				<div className="left-nav-popup" style={{top:'-50px'}}>
			        <div className="left-nav-popup-title">Map Styles </div>
			        <div className="map-option-container">
			          <div onClick={() => this.changeMap(1)} className={"map-option-item " + one}>
			            <div className="map-option-image" style={{backgroundImage: 'url(https://api.mapbox.com/styles/v1/dexhonsa/cizyfpyzn003k2sobx3m1pbmh/static/-122.380079,37.783609,10.82,0.00,0.00/600x400?access_token=pk.eyJ1IjoiZGV4aG9uc2EiLCJhIjoiY2luejFndTViMThsNnUya2o5bThpemRsaSJ9.GFlYLJmm5XmM-cGc57UH9g)'}} />
			            <div className="map-desc"><div>Streets</div><div style={{marginLeft: 'auto', fontSize: '8pt', color: '#808080'}}>Basic Map</div></div>
			          </div>
			          <div onClick={() => this.changeMap(2)} className={"map-option-item " + two} >
			            <div className="map-option-image" style={{backgroundImage: 'url(https://api.mapbox.com/styles/v1/dexhonsa/ciyaweb92003d2ss7g5neultw/static/-122.380329,37.788165,11.48,0.00,0.00/600x400?access_token=pk.eyJ1IjoiZGV4aG9uc2EiLCJhIjoiY2luejFndTViMThsNnUya2o5bThpemRsaSJ9.GFlYLJmm5XmM-cGc57UH9g)'}} />
			            <div className="map-desc"><div>Live Traffic</div><div style={{marginLeft: 'auto', fontSize: '8pt', color: '#808080'}}>Traffic Data Feed</div></div>
			          </div>
			          <div onClick={() => this.changeMap(3)} className={"map-option-item " + three}>
			            <div className="map-option-image" style={{backgroundImage: 'url(https://api.mapbox.com/styles/v1/dexhonsa/cizyf1ndk003x2rpls6yc5ecd/static/-122.385447,37.781846,11.47,0.00,0.00/600x400?access_token=pk.eyJ1IjoiZGV4aG9uc2EiLCJhIjoiY2luejFndTViMThsNnUya2o5bThpemRsaSJ9.GFlYLJmm5XmM-cGc57UH9g)'}} />
			            <div className="map-desc"><div>Light Map</div><div style={{marginLeft: 'auto', fontSize: '8pt', color: '#808080'}}>Easy Data Viewing</div></div>
			          </div>
			        </div>
			      </div>

			);
	}
}

export default MapStyles;