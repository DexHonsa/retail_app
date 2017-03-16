import React from 'react';
import request from 'superagent';



const CLOUDINARY_UPLOAD_PRESET = 'MyPreset';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dexhonsa/image/upload';

class CreateRolePopup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      croppedImg: '/images/camera_upload.jpg',
      cropperOpen: false,
      img: null
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
      <div id="role-popup" className="popup">
        <div className="popup-container animated fadeInUp" style={{textAlign: 'center'}}>
          <div className="popup-title" style={{textAlign: 'center'}}>Add New Role</div>
          <div onClick={this.props.collapse} className="popup-close"><i className="fa fa-times"></i></div>
          <form>
            <div className="popup-small-title">Change Color</div>
            <div className="create-role-badge" style={{display: 'inline-block'}}>
              <i className="fa fa-glass" />
            </div>
            <div className="popup-small-title">Basic Info</div>
            <div className="form-row" style={{width: 400, display: 'inline-block'}}>
              <div>
                <p>
                  
                  <input className="popup-input" placeholder="Role Name" type="text" name="field_id" id="role-name" />
                </p>
              </div>
            </div>
            <div className="form-row" style={{display: 'inline-block', width: 400}}>
              <div className="control-group">
                <div className="popup-small-title">Role Access</div>
                <label className="control control--checkbox">Create Clients
                  <input type="checkbox" />
                  <div className="control__indicator" />
                </label>
                <label className="control control--checkbox">Create Users
                  <input type="checkbox" />
                  <div className="control__indicator" />
                </label>
                <label className="control control--checkbox">Edit Existing Users
                  <input type="checkbox" />
                  <div className="control__indicator" />
                </label>
                <label className="control control--checkbox">Create Properties
                  <input type="checkbox" />
                  <div className="control__indicator" />
                </label>
                <label className="control control--checkbox">Edit Properties
                  <input type="checkbox" />
                  <div className="control__indicator" />
                </label>
              </div>
            </div>
            <div className="form-row" style={{borderTop: 'solid 1px #e0e0e0', textAlign: 'center', display: 'block'}}>
              <div className="create-client-btn" style={{marginTop: 15, display: 'inline-block'}}>Create Role</div>
            </div>
          </form>
        </div>
      </div>



    );
  }
  }

export default CreateRolePopup;