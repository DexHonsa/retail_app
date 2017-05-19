import React from 'react';
import axios from 'axios';

class Documents extends React.Component{
  render(){
    return(
      <div className="animated fadeInUp">
        <div className="input-segment">
          <div className="input-segment-title">Related Documents</div>
          {/* <div className="related-document-item">2017_P&amp;L.xsxl <div className="download-btn">Download <i className="fa fa-download" /></div></div> */}
          <div className="add-document-dropdown-area"><i className="fa fa-upload" /> &nbsp;&nbsp; Drop File Here</div>
        </div>
      </div>
    );
  }
}
export default Documents;
