import React from 'react';
import fileDownload from 'react-file-download';
import ReactUploadFile from 'react-upload-file';
import Dropzome from 'react-dropzone';
import $ from 'jquery';
import axios from 'axios';
import {connect} from 'react-redux';




class ImportData extends React.Component {
  downloadTemplate(){
    setTimeout(() => {
        const response = {
          file: 'http://localhost:9000/xlfile',
        };
        window.location.href = response.file;
      }, 100);
  }
  handleUpload(){
    console.log('hit');
    var this2 = this;
 var formData = new FormData();
    formData.append('file',$('[name="file"]')[0].files[0]);
  $.ajax({
    url: '/upload',
    data: formData,
    cache: false,
    contentType: false,
    enctype: 'multipart/form-data',
    processData: false,
    type: 'POST',
    dataType:'json',
    success: function(data){
      console.log(data.error_code)
      if(data.error_code===0)
        {
        console.log("success")
        console.log(data.data);
        var newData = [];
        data.data.forEach(function(item, i){
          var clientId = this2.props.client.clientId;
          var locationNumber = item.locationnumber;
          var locationName = item.locationname;
          var address = item.address;
          var sales = item.sales;
          var profit = item.profit;
          var country = item.country;
          var group = item.group;
          var state = item.state;
          var city = item.city;
          var zip = item.zipcode;
          var sqFt = item.squarefeet;
          var lat = item.lat;
          var lng = item.lng;


          var formatted_address = address.replace(/[^A-Z0-9]+/ig, "+");
          var formatted_city = city.replace(/[^A-Z0-9]+/ig, "+");
        //  console.log(formatted_address);




          var createData = {
            clientId: clientId,
            locationNumber:locationNumber,
            locationName:locationName,
            sales:sales,
            profit:profit,
            group:group,
            country:country,
            address:address,
            state:state,
            city:city,
            zip:zip,
            sqFt:sqFt,
            lat:lat,
            lng:lng
          }
          newData[i] = createData;
        });

        console.log(newData);

        axios.post('/uploadData',newData).then((res)=>{
        console.log("complete")
        this2.props.hideImportData();
        }).catch(function (error) {
          console.log(error);
        });



      }else{
        console.log('else')
      }
    }
})
}
  render(){
    const options = {
    baseUrl: 'http://localhost:3000',
    query: {
      warrior: 'fight'
    }
  }
    return(
      <div className="overlay" style={{display: 'flex', position: 'fixed', alignItems: 'center', justifyContent: 'center'}}>
        <div className="import-data-popup animated-slow bounceInUp">

          <div className="add-filter-title">Import Data <i onClick={this.props.hideImportData} className="fa fa-close" /></div>
          <div className="import-data-body">
            You can upload an excel Spreadsheet with your existing location infomation in order to use SiteMap to be an analytical tool.<br /> Your headers much be identical to the headers listed below.  If you do not have a particular field, leave the spaces blank.<br /><br />
            <div style={{marginBottom:15}}>Example:</div>
            <table className="example-table">
              <tbody><tr><th>Location #</th><th>Name</th><th>Address</th><th>State</th><th>City</th><th>Zip</th><th>SqFt</th><th>Lat</th><th>Lng</th><th>Sales</th><th>Profit</th></tr>
                <tr><td>234</td><td>Bloomberg Store</td><td>1234 Westbrooke Ave</td><td>CA</td><td>San Francisco</td><td>94582</td><td>2500</td><td>30.12345</td><td>-120.1245524</td><td>321575</td><td>23000</td></tr>

              </tbody></table>
          </div>
          <div className="add-filter-footer">
            <div className="download-template-btn basic-btn-blue" onClick={this.downloadTemplate.bind(this)}>Download Template</div>
            <div style={{marginLeft: 'auto', display: 'flex'}}>
              <input type="file" name="file" id="file" />
            <div style={{marginRight: 10, marginLeft: 'auto'}} className="basic-btn-blue" onClick={this.handleUpload.bind(this)}>Upload</div>
              <div onClick={this.props.hideImportData} className="add-filter-close-btn">close</div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

class ChooseBtn extends React.Component {
  render(){
  return(
    <div>

  </div>
  );
}
}

function mapStateToProps(state){
  return {
    auth: state.auth,
    client: state.client
  };
}
export default connect(mapStateToProps)(ImportData);
