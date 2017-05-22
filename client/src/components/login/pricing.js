import React from 'react';

class Pricing extends React.Component{
  render(){
    return(
      <main className="main">
        <div className="main-wrapper" style={{textAlign: 'center', position: 'relative'}}>
          <div className="container" style={{background: '#fff', boxShadow: '1px 1px 3px rgba(0,0,0,0.2)', minHeight: 'calc(100vh - 70px)', padding: 0}}>
            <div className="upgrade-top">
              <div className="upgrade-title">Get the most out of SiteMap</div>
              <div className="upgrade-sub-title">Try out SiteMap Pro today and see how you can get the most out of the most advanced site selection tool on the market.</div>
              <div className="upgrade-free-trial-btn">Try it Free for 30 days</div>
              <div className="upgrade-disclaimer">*restrictions apply<br />$59.99 / mo</div>
            </div>
            <div className="upgrade-plans">
              <div className="upgrade-title-2" style={{color: '#000'}}>A SiteMap experience for everyone
                <div className="underscore-bar" /></div>
              <div className="plan-container">
                <div className="plan-item">
                  <div className="plan-title">
                    <div className="plan-title-name">SiteMap Basic</div>
                    <div className="plan-price">$99 <small>(20 days remaining)</small></div>
                  </div>
                  <div className="plan-benefits">
                    <div className="plan-benefit-item active"><i className="fa fa-check" /> Discover, stream and share a contantly expanding mix of music from established artists.</div>
                    <div className="plan-benefit-item active"><i className="fa fa-check" /> 120M Tracks</div>
                    <div className="plan-benefit-item"><i className="fa fa-check" /> Offline Listening</div>
                    <div className="plan-benefit-item"><i className="fa fa-check" /> Other Item Listening</div>
                    <div className="plan-benefit-item"><i className="fa fa-check" /> Other Item Also Listening</div>
                  </div>
                  <div className="plan-btn inactive">Current Plan</div>
                </div>
                <div className="plan-item">
                  <div className="plan-title">
                    <div className="plan-badge">New</div>
                    <div className="plan-title-name">SiteMap Pro</div>
                    <div className="plan-price">$149</div>
                  </div>
                  <div className="plan-benefits">
                    <div className="plan-benefit-item active"><i className="fa fa-check" /> Discover, stream and share a contantly expanding mix of music from established artists.</div>
                    <div className="plan-benefit-item active"><i className="fa fa-check" /> 120M Tracks</div>
                    <div className="plan-benefit-item active"><i className="fa fa-check" /> Offline Listening</div>
                    <div className="plan-benefit-item active"><i className="fa fa-check" /> Other Item Listening</div>
                    <div className="plan-benefit-item"><i className="fa fa-check" /> Other Item Also Listening</div>
                  </div>
                  <div className="plan-btn">Try Free for 30 days</div>
                </div>
                <div className="plan-item">
                  <div className="plan-title">
                    <div className="plan-badge">Best Value</div>
                    <div className="plan-title-name">SiteMap Unlimited</div>
                    <div className="plan-price">$199</div>
                  </div>
                  <div className="plan-benefits">
                    <div className="plan-benefit-item active"><i className="fa fa-check" /> Discover, stream and share a contantly expanding mix of music from established artists.</div>
                    <div className="plan-benefit-item active"><i className="fa fa-check" /> 120M Tracks</div>
                    <div className="plan-benefit-item active"><i className="fa fa-check" /> Offline Listening</div>
                    <div className="plan-benefit-item active"><i className="fa fa-check" /> Other Item Listening</div>
                    <div className="plan-benefit-item active"><i className="fa fa-check" /> Other Item Also Listening</div>
                  </div>
                  <div className="plan-btn">Try Free for 30 days</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    );
  }
}
export default Pricing;
