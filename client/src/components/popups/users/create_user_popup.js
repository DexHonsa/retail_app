import React from 'react';
import request from 'superagent';
import AvatarCropper from "react-avatar-cropper";
import img from '../../../../images/camera_upload.jpg';
import FileUploaderUser from './file_uploader_user';
import axios from 'axios';
import validateInput from '../../validations/create_user_validation';
import TextFieldGroup from './text_field_group';

const CLOUDINARY_UPLOAD_PRESET = 'MyPreset';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dexhonsa/image/upload';

class CreateUserPopup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      state : "",
      contacts : [],
      croppedImg: img,
      cropperOpen: false,
      img: null,
      user_email: '',
      user_password: '',
      errors: {}
    }
  }
  isValid(){
    const { errors, isValid } = validateInput(this.state);
    if(!isValid){
      this.setState({
        errors : errors
      })
    }
    return isValid;
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
  onChange(e){
    this.setState({
      [e.target.name] : e.target.value
    })
  }
  
  submitForm(event){
    var this2= this;
    if(this.isValid()){
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
        
        //var userClientAssociation = this.refs.user_client_association.value;
        var imgURL = this.state.uploadedFileCloudinaryUrl;

        
        var data = {
          "first_name" : userFirstName,
          "last_name" : userLastName,
          "email" : this.state.user_email,
          "password": this.state.user_password,
          "type" : userType,
          "address" : userAddress,
          "city" : userCity,
          "state": userState,
          "zip": userZip,
          "user_img_path": imgURL,
          
        }
        axios.post('/api/users', data).then(function(res){
        
          this2.props.collapse();
        })
        
        
      }
    });

    }
    

  }

  
render(){
   const {user_password,user_email, errors} = this.state;
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
                  
                  <input className="popup-input" placeholder="First Name" type="text" ref="user_first_name" id="user-first-name" />
                </p>
              </div>
              <div style={{flex: 2, marginLeft: 10}}>
                <p>
                  
                  <input className="popup-input" placeholder="Last Name" type="text" ref="user_last_name" id="user-last-name" />
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
                  
                  <input className="popup-input" placeholder="Address" type="text" ref="user_address" id="user-address" />
                </p>
              </div>
              <div style={{flex: 1, marginLeft: 10}}>
                <p>
                  
                  <input className="popup-input" placeholder="City" type="text" ref="user_city" id="user-city" />
                </p>
              </div>
            </div>
            <div className="form-row">
              <div className="popup-selector-dropdown" style={{flex: 1, maxWidth: 250, marginLeft: 0}}>
                <select ref="user_state">
                  <option default> Select State</option>
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
                  
                  <input className="popup-input" placeholder="Zip" type="text" ref="user_zip" id="user-zip" />
                </p>
              </div>
            </div>
            <div className="popup-small-title">User Credentials</div>
            <div className="form-row">
              <div style={{flex: 1, maxWidth: 300}}>
                
                  
                  <TextFieldGroup
                      field="user_email"
                      label="Email"
                      type="text"
                      value={user_email}
                      error={errors.user_email}
                      onChange={this.onChange.bind(this)}
                    />
                
              </div>

            </div>
            <div className="form-row">
              <div style={{flex: 1, maxWidth: 300}}>
                
                  
                  <TextFieldGroup
                      field="user_password"
                      label="Password"
                      type="text"
                      value={user_password}
                      error={errors.user_password}
                      onChange={this.onChange.bind(this)}
                    />
                
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