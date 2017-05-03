import React from 'react';
import ProspectItem from './prospect_item';


class KeyMetrics extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showPage: ""
    }

  }







  render(){

    return (
      <main className="main">

        <div className="main-wrapper" style={{textAlign: 'center', position: 'relative'}}>
        <div className="container" style={{background: '#fff', boxShadow: '1px 1px 3px rgba(0,0,0,0.2)', minHeight: 'calc(100vh - 70px)', padding: 0}}>
          <div className="key-metrics-top">
            <div className="key-metrics-title"><h3>Key Metrics</h3><br />See the potential impact of your prospective locations on your key financial metrics.</div>
            <div className="client-selector-dropdown">
              <div className="client-selector-img" />
              <div className="client-selector-name">Client<br /><span style={{color: '#3080e8', fontSize: '12pt'}}>Muscle Maker Grill</span><i className="fa fa-caret-down" /></div>
            </div>
          </div>
          <div className="key-metrics-tile-container">
            <div className="key-metrics-tile">
              <div className="tile-title">Locations<span style={{float: 'right'}}>100%</span></div>
              <div className="tile-content">
                <div className="tile-number">203</div>
                <div className="tile-difference"><div className="difference-number" style={{color: 'goldenrod'}}>+100</div><i className="fa fa-arrow-right" /></div>
                <div className="ti304le-number">303</div>
              </div>
              <div className="tile-details">
                <table className="tile-details">
                  <tbody><tr><td>Budget</td><td>$100,000</td></tr>
                    <tr><td>variance</td><td>-50</td></tr>
                  </tbody></table>
              </div>
            </div>
            <div className="key-metrics-tile">
              <div className="tile-title">Sales<span style={{float: 'right'}}>100%</span></div>
              <div className="tile-content">
                <div className="tile-number">$2.8B</div>
                <div className="tile-difference"><div className="difference-number" style={{color: 'red'}}>-$3,343,224</div><i className="fa fa-arrow-right" /></div>
                <div className="ti304le-number">$2.4B</div>
              </div>
              <div className="tile-details">
                <table className="tile-details">
                  <tbody><tr><td>Budget</td><td>$2,333,233,445</td></tr>
                    <tr><td>variance</td><td>-$100,000,000</td></tr>
                  </tbody></table>
              </div>
            </div>
            <div className="key-metrics-tile">
              <div className="tile-title">Profit<span style={{float: 'right'}}>100%</span></div>
              <div className="tile-content">
                <div className="tile-number">$403M</div>
                <div className="tile-difference"><div className="difference-number" style={{color: '#20A640'}}>+$3,344,300</div><i className="fa fa-arrow-right" /></div>
                <div className="tile-number">$403M</div>
              </div>
              <div className="tile-details">
                <table className="tile-details">
                  <tbody><tr><td>Budget</td><td>$100,000</td></tr>
                    <tr><td>variance</td><td>-50</td></tr>
                  </tbody></table>
              </div>
            </div>
            <div className="key-metrics-tile">
              <div className="tile-title">Total SF<span style={{float: 'right'}}>100%</span></div>
              <div className="tile-content">
                <div className="tile-number">8.7M <sup>SF</sup></div>
                <div className="tile-difference"><div className="difference-number" style={{color: '#20A640'}}>+100</div><i className="fa fa-arrow-right" /></div>
                <div className="ti304le-number">8.7M <sup>SF</sup></div>
              </div>
              <div className="tile-details">
                <table className="tile-details">
                  <tbody><tr><td>Budget</td><td>2,344,334 SF</td></tr>
                    <tr><td>variance</td><td>-50,342,233 SF</td></tr>
                  </tbody></table>
              </div>
            </div>
          </div>
          <div className="key-metrics-tile-container" style={{paddingTop: 0}}>
            <div className="key-metrics-tile">
              <div className="tile-title">HeadCount<span style={{float: 'right'}}>100%</span></div>
              <div className="tile-content">
                <div className="tile-number">1943</div>
                <div className="tile-difference"><div className="difference-number" style={{color: '#20A640'}}>+1</div><i className="fa fa-arrow-right" /></div>
                <div className="ti304le-number">1944</div>
              </div>
              <div className="tile-details">
                <table className="tile-details">
                  <tbody><tr><td>Budget</td><td>2000</td></tr>
                    <tr><td>variance</td><td>-57</td></tr>
                  </tbody></table>
              </div>
            </div>
            <div className="key-metrics-tile">
              <div className="tile-title">Expenses<span style={{float: 'right'}}>100%</span></div>
              <div className="tile-content">
                <div className="tile-number">$1.4B</div>
                <div className="tile-difference"><div className="difference-number" style={{color: '#20A640'}}>+$3,344,767</div><i className="fa fa-arrow-right" /></div>
                <div className="ti304le-number">1.4B</div>
              </div>
              <div className="tile-details">
                <table className="tile-details">
                  <tbody><tr><td>Budget</td><td>$100,000</td></tr>
                    <tr><td>variance</td><td>-50</td></tr>
                  </tbody></table>
              </div>
            </div>
            <div className="key-metrics-tile">
              <div className="tile-title">Headcount / SF<span style={{float: 'right'}}>100%</span></div>
              <div className="tile-content">
                <div className="tile-number">4.3</div>
                <div className="tile-difference"><div className="difference-number" style={{color: '#20A640'}}>+100</div><i className="fa fa-arrow-right" /></div>
                <div className="ti304le-number">4.3</div>
              </div>
              <div className="tile-details">
                <table className="tile-details">
                  <tbody><tr><td>Budget</td><td>$100,000</td></tr>
                    <tr><td>variance</td><td>-50</td></tr>
                  </tbody></table>
              </div>
            </div>
            <div className="key-metrics-tile">
              <div className="tile-title">Labor / Sales<span style={{float: 'right'}}>100%</span></div>
              <div className="tile-content">
                <div className="tile-number">$203</div>
                <div className="tile-difference"><div className="difference-number" style={{color: '#20A640'}}>+100</div><i className="fa fa-arrow-right" /></div>
                <div className="ti304le-number">$204</div>
              </div>
              <div className="tile-details">
                <table className="tile-details">
                  <tbody><tr><td>Budget</td><td>$100,000</td></tr>
                    <tr><td>variance</td><td>-50</td></tr>
                  </tbody></table>
              </div>
            </div>
          </div>
          <ul className="prospective-locations-list">
            <ProspectItem />
            <ProspectItem />
            <ProspectItem />

          </ul>
        </div>
      </div>

      </main>

    );
  }
  }

export default KeyMetrics;
