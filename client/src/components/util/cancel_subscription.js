import React from 'react';
import Overlay from './overlay';
import banner from '../../../images/banner.svg';
import EnterInfo from './subscribe_enter_info';
import axios from 'axios';
import {connect} from 'react-redux';
import {getCustomer} from '../../actions/auth_actions';

class CancelSubscription extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      plan: ''
    }
  }
  selectPlan(plan){
    this.setState({
      plan:plan
    })
  }
  goBack(){
    this.setState({plan:''})
  }
  submitCancelSubscription(){
    var this2 = this;
    var data = {userId:this.props.auth.user.id};
    axios.post('/api/cancelSubscription', data).then(function(res){
      this2.props.getCustomer(this2.props.auth.user.id);
      this2.props.hideCancelSubscriptionPopup();

    })
  }
  render(){
    var plan;
    plan = <div><div className="subscribe-container" style={{textAlign: 'center'}}>
      <img style={{width: '100%', position: 'absolute', top: 0,left:0}} src={banner} />
      <div className="subscribe-title-top"><i style={{marginRight: 15}} className="fa fa-times-circle" />Cancel Your Account<br />
        <span style={{fontSize: '15pt'}}>Wait Don't Go!</span></div>
    </div>
    <div style={{width: '100%', textAlign: 'center'}}>
    <div className="upgrade-options" style={{width: '50%', display: 'inline-block'}}>
      <div className="row">
          <div className="col-sm-12">
            <div className="option-tile enter-info-tile" style={{height:'145px'}}><span style={{fontSize:'15pt'}}>Are you sure you want to cancel?</span>
              <div onClick={this.submitCancelSubscription.bind(this)} className="option-choose-btn">Cancel My Subscription</div>
            </div>
          </div>
      </div>
    </div>
  </div>
  </div>




    return(
      <div style={{position:'fixed',top:0,left:0,zIndex:10000}}>
        <Overlay />

        <div className="overlay">
        <div className="popup-container animated-slow bounceInUp" style={{padding:0}}>

        <div className="popup-top">Cancel Subscription<i onClick={() => this.props.hideCancelSubscriptionPopup()} className="fa fa-close" /></div>
        {plan}
      </div>
    </div>
      </div>
    );
  }
}
function mapStateToProps(state){
  return{
    auth: state.auth,
    client:state.client,
    customer:state.customer
  }
}
export default connect(mapStateToProps, {getCustomer})(CancelSubscription);
