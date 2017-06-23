import React from 'react';

class EmailReportPopup extends React.Component{
  emailReport(){

  }
  render(){
    return(
      <div className="overlay" style={{
          display: 'flex',
          position: 'fixed',
          top:0,
          left:0,
          alignItems: 'center',
          justifyContent: 'center'
      }}>
          <div className="import-data-popup animated-slow bounceInUp" style={{width:300}}>

              <div className="add-filter-title">Email Report
                  <i onClick={() => this.props.hideEmailReportPopup()} className="fa fa-close"/></div>
              <div className="import-data-body" style={{textAlign:'center', margin:20,fontSize:'15pt'}}>
                  <input style={{padding:'5px',fontSize:'12pt', border:'solid 1px #eaeaea', borderRadius:'3px'}} placeholder="Email" type="text"></input>
              </div>
              <div className="add-filter-footer">

                  <div style={{
                      marginLeft: 'auto',
                      display: 'flex'
                  }}>

                      <div style={{
                          marginRight: 10,
                          marginLeft: 'auto'
                      }} className="basic-btn-blue" onClick={this.emailReport.bind(this)}>Email Report</div>
                      <div onClick={() => this.props.hideEmailReportPopup()} className="add-filter-close-btn">close</div>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}
export default EmailReportPopup;
