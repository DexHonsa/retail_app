import React from 'react';
import fileDownload from 'react-file-download';
import file from './template.xlsx';
import img from '../../../images/128.jpg';


class ImportData extends React.Component {
  downloadTemplate(){
    var img2 = btoa(img);
    fileDownload(img2, 'template.jpg');
  }
  render(){
    return(
      <div className="overlay" style={{display: 'flex', position: 'fixed', alignItems: 'center', justifyContent: 'center'}}>
        <div className="import-data-popup animated-slow bounceInUp">
          <div className="add-filter-title">Import Data <i onClick={this.props.hideImportData} className="fa fa-close" /></div>
          <div className="import-data-body">
            You can upload an excel Spreadsheet with your existing location infomation in order to use SiteMap to be an analytical tool.<br /> Your headers much be identical to the headers listed below.  If you do not have a particular field, leave the spaces blank.<br /><br />
            <div style={{marginBottom:15}}>Example:</div>
            <table className="example-table">
              <tbody><tr><th>Location #</th><th>Address</th><th>State</th><th>City</th><th>SqFt</th></tr>
                <tr><td /><td /><td /><td /><td /></tr>
                <tr><td /><td /><td /><td /><td /></tr>
                <tr><td /><td /><td /><td /><td /></tr>
              </tbody></table>
          </div>
          <div className="add-filter-footer">
            <div className="download-template-btn basic-btn-blue" onClick={this.downloadTemplate.bind(this)}>Download Template</div>
            <div style={{marginLeft: 'auto', display: 'flex'}}>
              <div style={{marginRight: 10, marginLeft: 'auto'}} className="basic-btn-blue">Upload Spreadsheet</div>
              <div onClick={this.props.hideImportData} className="add-filter-close-btn">close</div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default ImportData;
