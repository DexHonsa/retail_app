import React from 'react';
import Overlay from './overlay';
import banner from '../../../images/banner.svg'

class Upgrade extends React.Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }
  render(){
    return(
      <div>
        <Overlay />
        <div className="overlay">
        <div className="popup-container">
        <div className="popup-top">Upgrade Account<i onClick={() => this.props.hideUpgradePopup()} className="fa fa-close" /></div>
        <div className="subscribe-container">
          <img style={{width: '100%', position: 'absolute', top: 0}} src={banner} />
          <div className="subscribe-title-top"><i style={{marginRight: 15}} className="fa fa-arrow-up" />Upgrade Your Account<br />
            <span style={{fontSize: '15pt'}}>Get the most out of SiteMAP!</span></div>
        </div>
        <div className="upgrade-options">
          <div className="row">
            <div className="col-sm-4 ">
              <div className="option-tile">
                <div className="option-tile-title">Basic &nbsp;&nbsp;<strong>$99</strong> <i className="fa fa-certificate" /></div>
                <div className="option-tile-details">
                  <ul>
                    <li>
                      <i className="fa fa-check" /> Share locations with up to 3 clients.
                    </li>
                    <li>
                      <i className="fa fa-check" /> Unlimited Saved Searches and Demographic Reports
                    </li>
                    <li>
                      <i className="fa fa-check" /> Unlimited Saved Searches and Demographic Reports
                    </li>
                    <li>
                      <i className="fa fa-check" /> Unlimited Saved Searches and Demographic Reports
                    </li>
                  </ul>
                </div>
                <div className="option-choose-btn">Go Basic</div>
                <div className="plan-disclaimer">* Yearly Subscription</div>
              </div>
            </div>
            <div className="col-sm-4 ">
              <div className="option-tile">
                <div className="option-tile-title">Pro &nbsp;&nbsp;<strong>$149</strong><i className="fa fa-certificate" /> <div className="most-badge most-orange">Most Popular</div></div>
                <div className="option-tile-details">
                  <ul>
                    <li>
                      <i className="fa fa-check" /> Share locations with up to 3 clients.
                    </li>
                    <li>
                      <i className="fa fa-check" /> Unlimited Saved Searches and Demographic Reports
                    </li>
                    <li>
                      <i className="fa fa-check" /> Unlimited Saved Searches and Demographic Reports
                    </li>
                    <li>
                      <i className="fa fa-check" /> Unlimited Saved Searches and Demographic Reports
                    </li>
                  </ul>
                </div>
                <div className="option-choose-btn">Go Pro</div>
                <div className="plan-disclaimer">* Yearly Subscription</div>
              </div>
            </div>
            <div className="col-sm-4 ">
              <div className="option-tile">
                <div className="option-tile-title">Ultimate &nbsp;&nbsp;<strong>$199 </strong><i className="fa fa-certificate" /> <div className="most-badge">Best Value</div></div>
                <div className="option-tile-details">
                  <ul>
                    <li>
                      <i className="fa fa-check" /> Share locations with unlimited clients.
                    </li>
                    <li>
                      <i className="fa fa-check" /> Unlimited Saved Searches and Demographic Reports
                    </li>
                    <li>
                      <i className="fa fa-check" /> Unlimited Saved Searches and Demographic Reports
                    </li>
                    <li>
                      <i className="fa fa-check" /> Unlimited Saved Searches and Demographic Reports
                    </li>
                  </ul>
                </div>
                <div className="option-choose-btn">Go Ultimate</div>
                <div className="plan-disclaimer">* Yearly Subscription</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>
    );
  }
}
export default Upgrade;
