import React from 'react';
import request from 'superagent';

import AvatarCropper from "react-avatar-cropper";

import FileUploaderUser from './file_uploader_user';


const CLOUDINARY_UPLOAD_PRESET = 'MyPreset';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dexhonsa/image/upload';

class CreateUserPopup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      state : "",
      contacts : [],
      croppedImg: '/images/camera_upload.jpg',
      cropperOpen: false,
      img: null
    }
  }


  deleteContact(data){
    const newState = this.state.contacts;
    if (newState.indexOf(data) > -1) {
      newState.splice(newState.indexOf(data), 1);
      this.setState({contacts: newState})
    }
  }
   handleFileChange(dataURI) {
    this.setState({
      img: dataURI,
      croppedImg: this.state.croppedImg,
      cropperOpen: true,
      uploadedFileCloudinaryUrl: ''
    })
  }
  handleCrop(dataURI) {
    
    this.setState({
      cropperOpen: false,
      img: null,
      croppedImg: dataURI
    })
    
    

  }
  handleRequestHide() {
    this.setState({
      cropperOpen: false
    })
  }

  addContact(event){
    var first = this.refs.first_name.value;
    var last = this.refs.last_name.value;
    var title = this.refs.title.value;
    var email = this.refs.email.value;
    var phone = this.refs.phone.value;

    this.setState({
      contacts : this.state.contacts.concat({first_name : first, last_name : last, title : title, email : email, phone : phone})
    })

    this.refs.first_name.value = "";
    this.refs.last_name.value = null;
    this.refs.title.value = null;
    this.refs.email.value = null;
    this.refs.phone.value = null;
  }
  submitForm(event){

    var upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', this.state.croppedImg);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
        var userFirstName = this.refs.user_first_name.value;
        var userLastName = this.refs.user_last_name.value;
        var userType = this.refs.user_type.value;
        var userAddress = this.refs.user_address.value;
        var userCity = this.refs.user_city.value;
        var userState = this.refs.user_state.value;
        var userZip = this.refs.user_zip.value;
        var userEmail = this.refs.user_email.value;
        var userClientAssociation = this.refs.user_client_association.value;
        var imgURL = this.state.uploadedFileCloudinaryUrl;

        console.log(userFirstName, userLastName, userType, userAddress, userCity, userState, userZip, userEmail, userClientAssociation,  imgURL);
        

        
      }
    });

    
    

  }

  
render(){
    return (
      <div id="user-popup" className="popup">
        <div className="popup-container animated fadeInUp">
        {this.state.cropperOpen &&
          <AvatarCropper
            onRequestHide={this.handleRequestHide.bind(this)}
            cropperOpen={this.state.cropperOpen}
            onCrop={this.handleCrop.bind(this)}
            image={this.state.img}
            width={300}
            height={300}
          />
        }
          <div className="popup-title">Add New User</div>
          <div onClick={this.props.collapse} className="popup-close"><i className="fa fa-times"></i></div>
          <form>
            <div className="popup-small-title">Upload a Photo</div>
            <div className="upload-picture" style={{backgroundImage: 'url(' + this.state.croppedImg + ')'}}>
              <FileUploaderUser handleFileChange={this.handleFileChange.bind(this)} />
              
                
              </div>
            <div className="popup-small-title">Basic Info</div>
            <div className="form-row">
              <div style={{flex: 2}}>
                <p>
                  <label htmlFor="user-first-name">First Name</label>
                  <input className="popup-input" type="text" ref="user_first_name" id="user-first-name" />
                </p>
              </div>
              <div style={{flex: 2, marginLeft: 10}}>
                <p>
                  <label htmlFor="user-last-name">Last Name</label>
                  <input className="popup-input" type="text" ref="user_last_name" id="user-last-name" />
                </p>
              </div>
              <div className="popup-selector-dropdown" style={{flex: 1}}>
                <select ref="user_type">
                  <option default>Account Type</option>
                  <option>Admin</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div style={{flex: 1}}>
                <p>
                  <label htmlFor="user-address">Street Address</label>
                  <input className="popup-input" type="text" ref="user_address" id="user-address" />
                </p>
              </div>
              <div style={{flex: 1, marginLeft: 10}}>
                <p>
                  <label htmlFor="user-city">City</label>
                  <input className="popup-input" type="text" ref="user_city" id="user-city" />
                </p>
              </div>
            </div>
            <div className="form-row">
              <div className="popup-selector-dropdown" style={{flex: 1, maxWidth: 250, marginLeft: 0}}>
                <select ref="user_state">
                  <option default>State</option>
                  <option>Alabama</option>
                  <option>Arkansa</option>
                  <option>Alaska</option>
                  <option>New York</option>
                  <option>Virginia</option>
                  <option>California</option>
                  <option>Nevada</option>
                  <option>Nebraska</option>
                  <option>New York</option>
                  <option>Virginia</option>
                  <option>California</option>
                  <option>Nevada</option>
                  <option>Nebraska</option>
                  <option>New York</option>
                  <option>Virginia</option>
                  <option>California</option>
                  <option>Nevada</option>
                  <option>Nebraska</option>
                  <option>New York</option>
                  <option>Virginia</option>
                </select>
              </div>
              <div style={{flex: 1, maxWidth: 100, marginLeft: 10}}>
                <p>
                  <label htmlFor="user-zip">Zip</label>
                  <input className="popup-input" type="text" ref="user_zip" id="user-zip" />
                </p>
              </div>
            </div>
            <div className="form-row">
              <div style={{flex: 1, maxWidth: 300}}>
                <p>
                  <label htmlFor="user-email">Email</label>
                  <input className="popup-input" type="text" ref="user_email" id="user-email" />
                </p>
              </div>
            </div>
            <div className="popup-small-title">Client Association</div>
            <div className="form-row">
              <div className="popup-selector-dropdown" style={{flex: 1, maxWidth: 300, marginLeft: 0}}>
                <select ref="user_client_association">
                  <option default>Select Client</option>
                  <option>Admin</option>
                </select>
              </div>
            </div>
            <div className="form-row" style={{borderTop: 'solid 1px #e0e0e0', marginTop: 35}}>
              <div onClick={this.submitForm.bind(this)} className="create-client-btn" style={{marginTop: 15, marginLeft: 'auto', padding: '10px 45px', float: 'right'}}>Create User &amp;<br />Send Invite Email</div>
            </div>
          </form>
        </div>
      </div>


    );
  }
  }

export default CreateUserPopup;