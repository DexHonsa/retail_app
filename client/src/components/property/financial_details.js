import React from 'react';
import TextInput from './text_input';
import axios from 'axios';
class FinancialDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      property: []
    }

  }
  componentDidMount(){
    var this2 = this;
    var id = this.props.params.id;
    axios.get('/api/search/' + id).then(function(res){
      this2.setState({property:res.data.Searches})
    }).catch(function (error) {
      if (error.response) {
        axios.get('/api/getUploadedLocation' + '/' + id).then(function(res2){
               this2.setState({property:res2.data.data,isOwned:true});
         })
      }
    })
  }
  render(){
    return(
      <div className="animated fadeInUp">
        <div className="input-segment">
          <div className="input-segment-title">Operating Statement Summary</div>
          <div className="input-segment-inputs">
            <TextInput id={this.props.params.id} value={this.state.property['Total Operating Revenues (actual)']} title="Total Operating Revenues (actual)"/>
            <TextInput id={this.props.params.id} value={this.state.property['Total Operating Revenues (budget)']} title="Total Operating Revenues (budget)"/>
            <TextInput id={this.props.params.id} value={this.state.property['Total Operating Expenses (actual)']} title="Total Operating Expenses (actual)"/>
            <TextInput id={this.props.params.id} value={this.state.property['Total Operating Expenses (budget)']} title="Total Operating Expenses (budget)"/>
            <TextInput id={this.props.params.id} value={this.state.property['Net Operating Income (actual)']} title="Net Operating Income (actual)"/>
            <TextInput id={this.props.params.id} value={this.state.property['Net Operating Income (budget)']} title="Net Operating Income (budget)"/>
            <div className="input-segment-item" style={{border: 'none'}}>
            </div>
          </div>
        </div>
        <div className="input-segment">
          <div className="input-segment-title">Cashflow Statement Summary</div>
          <div className="input-segment-inputs">
            <TextInput id={this.props.params.id} value={this.state.property['Beginning Cash Balance (actual)']} title="Beginning Cash Balance (actual)"/>
            <TextInput id={this.props.params.id} value={this.state.property['Beginning Cash Balance (budget)']} title="Beginning Cash Balance (budget)"/>
            <TextInput id={this.props.params.id} value={this.state.property['Cash Flows From Operating Activities (actual)']} title="Cash Flows From Operating Activities (actual)"/>
            <TextInput id={this.props.params.id} value={this.state.property['Cash Flows From Operating Activities (budget)']} title="Cash Flows From Operating Activities (budget)"/>
            <TextInput id={this.props.params.id} value={this.state.property['Cash Flows From Investing Activities (actual)']} title="Cash Flows From Investing Activities (actual)"/>
            <TextInput id={this.props.params.id} value={this.state.property['Cash Flows From Investing Activities (budget)']} title="Cash Flows From Investing Activities (budget)"/>
            <TextInput id={this.props.params.id} value={this.state.property['Cash Flows From Financing Activities (actual)']} title="Cash Flows From Financing Activities (actual)"/>
            <TextInput id={this.props.params.id} value={this.state.property['Cash Flows From Financing Activities (budget)']} title="Cash Flows From Financing Activities (budget)"/>
            <TextInput id={this.props.params.id} value={this.state.property['Net Cash Flow (actual)']} title="Net Cash Flow (actual)"/>
            <TextInput id={this.props.params.id} value={this.state.property['Net Cash Flow (budget)']} title="Net Cash Flow (budget)"/>
            <TextInput id={this.props.params.id} value={this.state.property['Ending Cash Balance (actual)']} title="Ending Cash Balance (actual)"/>
            <TextInput id={this.props.params.id} value={this.state.property['Ending Cash Balance (budget)']} title="Ending Cash Balance (budget)"/>
            <div className="input-segment-item" style={{border: 'none'}}>
            </div>
          </div>
        </div>
        <div className="input-segment">
          <div className="input-segment-title">Balance Sheet Statement Summary as of Apr 2017</div>
          <div className="input-segment-inputs">
            <TextInput id={this.props.params.id} value={this.state.property['Total Assets']} title="Total Assets"/>
            <TextInput id={this.props.params.id} value={this.state.property['Total Equity']} title="Total Equity"/>
            <TextInput id={this.props.params.id} value={this.state.property['Total Liabilities']} title="Total Liabilities"/>

            <div className="input-segment-item" style={{border: 'none'}}>
            </div>
          </div>
        </div>
        <div className="input-segment">
          <div className="input-segment-title">Loan Summary</div>
          <div className="input-segment-inputs">
            <TextInput id={this.props.params.id} value={this.state.property['Loan Amount']} title="Loan Amount"/>
            <TextInput id={this.props.params.id} value={this.state.property['Loan Amount PSF']} title="Loan Amount PSF"/>
            <TextInput id={this.props.params.id} value={this.state.property['Purpose of Loan']} title="Total Liabilities"/>
            <TextInput id={this.props.params.id} value={this.state.property['Note Date']} title="Total Liabilities"/>
            <TextInput id={this.props.params.id} value={this.state.property['Loan Term (months)']} title="Loan Term (months)"/>
            <TextInput id={this.props.params.id} value={this.state.property['Loan Type']} title="Loan Type"/>
            <TextInput id={this.props.params.id} value={this.state.property['Maturity Date']} title="Maturity Date"/>
            <TextInput id={this.props.params.id} value={this.state.property['Interest Only Period (months)']} title="Interest Only Period (months)"/>
            <TextInput id={this.props.params.id} value={this.state.property['Interest Rate']} title="Interest Rate"/>
            <TextInput id={this.props.params.id} value={this.state.property['Amortization Term (months)']} title="Amortization Term (months)"/>
            <TextInput id={this.props.params.id} value={this.state.property['Annual Debt Service']} title="Annual Debt Service"/>
            <TextInput id={this.props.params.id} value={this.state.property['Debt Service Constant']} title="Debt Service Constant"/>
            <TextInput id={this.props.params.id} value={this.state.property['Debt Service Coverage Ratio']} title="Debt Service Coverage Ratio"/>
            <TextInput id={this.props.params.id} value={this.state.property['Loan To Value']} title="Loan To Value"/>
            <TextInput id={this.props.params.id} value={this.state.property['Balloon']} title="Balloon"/>
            <TextInput id={this.props.params.id} value={this.state.property['Interest Accrual Method']} title="Interest Accrual Method"/>


            <div className="input-segment-item" style={{border: 'none'}}>
            </div>
          </div>
        </div>
        <div className="input-segment">
          <div className="input-segment-title">Valuation Summary</div>
          <div className="input-segment-inputs">
            <TextInput id={this.props.params.id} value={this.state.property['Capitalization Rate']} title="Capitalization Rate"/>
            <TextInput id={this.props.params.id} value={this.state.property['Discount Rate']} title="Discount Rate"/>
            <TextInput id={this.props.params.id} value={this.state.property['Cost of Sale']} title="Cost of Sale"/>
            <TextInput id={this.props.params.id} value={this.state.property['Valuation']} title="Valuation"/>
            <TextInput id={this.props.params.id} value={this.state.property['IRR']} title="IRR"/>



            <div className="input-segment-item" style={{border: 'none'}}>
            </div>
          </div>
        </div>
        <div className="input-segment">
          <div className="input-segment-title">Related Documents</div>
          <div className="related-document-item">2017_P&amp;L.xsxl <div className="download-btn">Download <i className="fa fa-download" /></div></div>
          <div className="add-document-dropdown-area"><i className="fa fa-upload" /> &nbsp;&nbsp; Drop File Here</div>
        </div>
      </div>
    );
  }
}
export default FinancialDetails;
