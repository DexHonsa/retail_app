import React from 'react';

class SettingsDropdown extends React.Component{
	render(){
		return(
				<div className="client-dropdown-dd animated fadeInUp">
			          <div onClick={this.props.logout} className="client-dd-option">Logout</div>
			      </div>
			);
	}
}
export default SettingsDropdown;