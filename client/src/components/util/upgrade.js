import React from 'react';
import Overlay from './overlay';
import banner from '../../../images/banner.svg';
import EnterInfo from './subscribe_enter_info';

class Upgrade extends React.Component{
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
  render(){
    var plan;
    plan = <div><div className="subscribe-container">
      <img style={{width: '100%', position: 'absolute', top: 0,left:0}} src={banner} />
      <div className="subscribe-title-top"><i style={{marginRight: 15}} className="fa fa-arrow-up" />Upgrade Your Account<br />
        <span style={{fontSize: '15pt'}}>Get the most out of SiteMAP!</span></div>
    </div>
    <div className="upgrade-options">
      <div className="row">
        <div className="col-sm-4 ">
          <div className="option-tile">
            <div className="option-tile-title">Silver &nbsp;&nbsp;<strong>$99</strong> <i className="fa fa-certificate" /></div>
            <div className="option-tile-details">
              <ul>
                <li>
                  <i className="fa fa-check" /> Add up to 3 clients.
                </li>
                <li>
                  <i className="fa fa-check" />  Unlimited Saved Searches and Demographic Reports
                </li>
                <li>
                  <i className="fa fa-check" /> Email Reports directly to anyone.
                </li>
                <li>
                  <i className="fa fa-check" /> Keep track of all existing locations.
                </li>
              </ul>
            </div>
            <div onClick={() => this.selectPlan('silver-plan')} className="option-choose-btn">Go Silver</div>
            <div className="plan-disclaimer">* Yearly Subscription</div>
          </div>
        </div>
        <div className="col-sm-4 ">
          <div className="option-tile">
            <div className="option-tile-title">Gold &nbsp;&nbsp;<strong>$149</strong><i className="fa fa-certificate" /> <div className="most-badge most-orange">Most Popular</div></div>
            <div className="option-tile-details">
              <ul>
                <li>
                  <i className="fa fa-check" /> add 3 additional users to your account.
                </li>
                <li>
                  <i className="fa fa-check" /> Add up to 10 clients
                </li>
                <li>
                  <i className="fa fa-check" /> Unlimited Saved Searches and Demographic Reports
                </li>
                <li>
                  <i className="fa fa-check" /> Keep track of all existing locations.
                </li>
              </ul>
            </div>
            <div onClick={() => this.selectPlan('gold-plan')} className="option-choose-btn">Go Gold</div>
            <div className="plan-disclaimer">* Yearly Subscription</div>
          </div>
        </div>
        <div className="col-sm-4 ">
          <div className="option-tile">
            <div className="option-tile-title">Platnium &nbsp;&nbsp;<strong>$199 </strong><i className="fa fa-certificate" /> <div className="most-badge">Best Value</div></div>
            <div className="option-tile-details">
              <ul>
                <li>
                  <i className="fa fa-check" /> Add unlimited clients.
                </li>
                <li>
                  <i className="fa fa-check" /> Add unlimited users to your account.
                </li>
                <li>
                  <i className="fa fa-check" /> Unlimited Saved Searches and Demographic Reports
                </li>
                <li>
                  <i className="fa fa-check" /> Keep track of all existing locations.
                </li>
              </ul>
            </div>
            <div onClick={() => this.selectPlan('platnium-plan')} className="option-choose-btn">Go Platnium</div>
            <div className="plan-disclaimer">* Yearly Subscription</div>
          </div>
        </div>
      </div>
    </div>
  </div>



    if(this.state.plan == 'silver-plan'){
      plan = <EnterInfo plan="silver-plan" goBack={this.goBack.bind(this)} />
    }
    if(this.state.plan == 'gold-plan'){
      plan = <EnterInfo plan="gold-plan" goBack={this.goBack.bind(this)} />
    }
    if(this.state.plan == 'platnium-plan'){
      plan = <EnterInfo plan="platnium-plan" goBack={this.goBack.bind(this)} />
    }
    return(
      <div style={{position:'fixed',top:0,left:0,zIndex:10000}}>
        <Overlay />

        <div className="overlay">
        <div className="popup-container animated-slow bounceInUp" style={{padding:0}}>

        <div className="popup-top">Upgrade Account<i onClick={() => this.props.hideUpgradePopup()} className="fa fa-close" /></div>
        {plan}
      </div>
    </div>
      </div>
    );
  }
}
export default Upgrade;
