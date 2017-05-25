import React from 'react';
import request from 'superagent';
import AvatarCropper from "react-avatar-cropper";
import img from '../../../../images/camera_upload.jpg';
import FileUploaderUser from './file_uploader_user';
import axios from 'axios';
import validateInput from '../../validations/create_user_validation';
import TextFieldGroup from './text_field_group';
import {connect} from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

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
      roles: [],
      clients: [],
      errors: {},
      user_role: '',
      associated_clients: ''
    }
  }
  onSelectorChange(val){
    this.setState({associated_clients : val})
  }
  componentWillMount() {
    this.getRoles();
    this.getClients();
  }
  componentDidMount() {

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
  getRoles(){
    var this2 = this;
    axios.get('/api/roles').then(function(res){
      this2.setState({
        roles: res.data.data
      })

    })
  }
  getClients(){
    var this2 = this;
    axios.get('/api/getUserClients/' + this.props.auth.user.id).then(function(res){
      this2.setState({
        clients: res.data.data
      })

    })
  }
  onChange(e){
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  submitForm(event){
    console.log('hit');
    var this2= this;
    if(this.isValid()){
    var upload = request.post(CLOUDINARY_UPLOAD_URL)
        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
        .field('file', this.state.croppedImg);

    upload.end((err, response) => {
      if (err) {

      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
        var userFirstName = this.refs.user_first_name.value;
        var userLastName = this.refs.user_last_name.value;
        var parentUser = this.props.auth.user.id;
        var userRole = this.refs.user_role.value;
        var userAddress = this.refs.user_address.value;
        var userCity = this.refs.user_city.value;
        var userState = this.refs.user_state.value;
        var userZip = this.refs.user_zip.value;
        var token = this.makeId();

        //var userClientAssociation = this.refs.user_client_association.value;
        var imgURL = this.state.uploadedFileCloudinaryUrl;


        var data = {
          "first_name" : userFirstName,
          "last_name" : userLastName,
          "email" : this.state.user_email,
          "password": token,
          "role" : userRole,
          "parent_user": parentUser,
          "address" : userAddress,
          "contacts" : [],
          "city" : userCity,
          "associated_clients": [this.state.associated_clients],
          "views" : {},
          "state": userState,
          "zip": userZip,
          "user_img_path": imgURL,
          "active": 0
        }

        axios.post('/api/users', data).then(function(res){
          var data = {
            email: this2.state.user_email,
            token : token
          }
            axios.post('/api/sendInviteMailer',data).then(function(res){
              console.log(res);
            })

          var data = {
            clientId : this2.state.associated_clients.value,
            userId : res.data.User.generated_keys[0]
          };
          axios.put('/api/addAssociatedUser', data).then(function(res){
            console.log(res)
          })
          this2.props.collapse();
        })


      }
    });

    }


  }
makeId(){

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;

}

render(){
  var clientArray = this.state.clients.map(function(data,i){
    return { value: data.id, label: data.client_name }
  });

   const {user_password,user_email, errors} = this.state;
   var roles;
    if(this.state.roles.length > 0){
      roles = this.state.roles.map(function(data,i){
        return <option key={i}>{data.role_name}</option>
      },this)
    }
    var clients;
    if(this.state.clients.length > 0){
      clients = this.state.clients.map(function(data,i){
        return <option key={i}>{data.client_name}</option>
      },this)
    }
    var userClientAssociation;
    if(this.state.user_role === 'Basic'){

      userClientAssociation = <div><div className="popup-small-title">Client Association</div>
            <div className="form-row">
              <div className="popup-selector-dropdown" style={{flex: 1, maxWidth: 300, marginLeft: 0}}>
                <Select
                                className="my-selector"
                                name="associated_clients"
                                value={this.state.associated_clients}
                                options={clientArray}
                                clearable={false}
                                onChange={this.onSelectorChange.bind(this)}
                            />
              </div>
            </div></div>
    }

    return (
      <div id="user-popup" className="popup">
        <div className="popup-container animated-slow bounceInUp">
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
                <select name="user_role" onChange={this.onChange.bind(this)} ref="user_role">

                  {roles}
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
            {userClientAssociation}
            <div className="form-row" style={{borderTop: 'solid 1px #e0e0e0', marginTop: 35}}>
              <div onClick={this.submitForm.bind(this)} className="create-client-btn" style={{marginTop: 15, marginLeft: 'auto', padding: '10px 45px', float: 'right'}}>Create User &amp;<br />Send Invite Email</div>
            </div>
          </form>
        </div>
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
export default connect(mapStateToProps)(CreateUserPopup);
