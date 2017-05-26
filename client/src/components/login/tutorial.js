import React from 'react';
import {connect} from 'react-redux';


class Tutorial extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }
  render(){
    var page = <div>YAY Page;</div>
    return(
      <div className="demo-popup-container ">

				<div className="add-demo-filter-popup-container">
		        <div className="add-demo-filter-popup animated fadeInUp">
		        <div className="add-filter-title">Add a Demographic Filter <i onClick={this.props.hideTutorial} className="fa fa-close" /></div>

                  {page}


		        </div>
		      </div>

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
export default connect(mapStateToProps)(Tutorial);
