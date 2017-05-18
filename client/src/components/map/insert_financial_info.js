import React from 'react';

class ImportFinancialInfo extends React.Component{
	render() {
		return(
				<div className="modal-overlay fadeIn animated">
			        <div className="add-demo-filter-popup-container">
			          <div className="add-demo-filter-popup animated fadeInUp" style={{width: '75%'}}>
			            <div className="add-filter-title">Insert Sales Information <i onClick={this.props.saveFinancialInfo} className="fa fa-close" /></div>
			            <div className="add-filter-stage">
			              <div className="financial-input-container">
			                <div className="input-item">
			                  <div className="financial-input-main-value">
			                    <div className="financial-input-main-title">Annual Sales</div>$0</div>
			                  <div className="input-label"># of transations</div>
			                  <input type="text" />
			                  <div className="input-label">Average Dollars per Transaction</div>
			                  <input type="text" />
			                </div>
			                <div className="input-item">
			                  <div className="financial-input-main-value">
			                    <div style={{float:'left'}}><div className="financial-input-main-title">Annual Profits</div>$0</div>
			                    <div style={{marginLeft:'auto', textAlign: 'right'}}><div className="financial-input-main-title">Profit Percent</div>0%</div>
			                  </div>
			                  <div className="input-label">Profit Margin (%)</div>
			                  <input type="text" />
			                </div>
			                <div className="input-item">
			                  <div className="financial-input-main-value">
			                    <div className="financial-input-main-title">Total Square Feet</div>0</div>
			                  <div className="input-label">Total SF</div>
			                  <input type="text" />
			                </div>
			              </div>
			              <div className="financial-input-container">
			                <div className="input-item">
			                  <div className="financial-input-main-value">
			                    <div className="financial-input-main-title">Average Annual Headcount</div>0</div>
			                  <div className="input-label">Headcount</div>
			                  <input type="text" />
			                  <div className="input-label">Average Dollar per Headcount</div>
			                  <input type="text" />
			                </div>
			                <div className="input-item">
			                  <div className="financial-input-main-value">
			                    <div className="financial-input-main-title">Total Annual Expenses</div>$0</div>
			                  <div className="input-label">YTD expense Dollars</div>
			                  <input type="text" />
			                </div>
			                <div className="input-item">
			                  <div className="financial-input-main-value">
			                   <div style={{float:'left'}}><div className="financial-input-main-title">Annual Labor % to Sales</div>0%</div>
			                    <div style={{marginLeft:'auto', textAlign: 'right'}}><div className="financial-input-main-title">Labor Dollars</div>$0</div>

			                    </div>

			                  <div className="input-label">Labor % to Sales</div>
			                  <input type="text" />

			                </div>
			              </div>
			            </div>
			            <div className="add-filter-footer"><div onClick={this.props.saveFinancialInfo} className="add-filter-close-btn">close</div></div>
			          </div>
			        </div>
			      </div>

			);
	}
}
export default ImportFinancialInfo;
