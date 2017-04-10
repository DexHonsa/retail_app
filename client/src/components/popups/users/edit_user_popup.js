import React from 'react';
import request from 'superagent';
import AvatarCropper from "react-avatar-cropper";
import img from '../../../../images/camera_upload.jpg';
import FileUploaderUser from './file_uploader_user';
import axios from 'axios';
import validateInput from '../../validations/create_user_validation';
import TextFieldGroup from './text_field_group';
import {connect} from 'react-redux';

const CLOUDINARY_UPLOAD_PRESET = 'MyPreset';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dexhonsa/image/upload';

class EditUserPopup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      state : "",
      user: [],
      contacts : [],
      user_email: '',
      user_password: '',
      roles: [],
      clients: [],
      errors: {}
    }
  }
  componentWillMount() {
    var this2 = this;
    axios.get('/api/users/' + this.props.userId).then(function(res){
      console.log(res.data.User);
      this2.setState({
        firstName:res.data.User.first_name,
        lastName:res.data.User.last_name,
        address:res.data.User.address,
        city:res.data.User.city,
        zip:res.data.User.zip
      })
    })
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
    axios.get('/api/getUserClients/' + this.props.userId).then(function(res){
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
    if(this.props.auth.user.role === 'Basic'){
      var this2= this;
        const {firstName, lastName, address, city, zip} = this.state;
        const { user_role, user_state } = this.refs;
        
        //var userClientAssociation = this.refs.user_client_association.value;
        var data = {'userId':this.props.userId,'data':{
          "first_name" : firstName,
          "last_name" : lastName,
          "role" : 'Basic',
          "address" : address,
          "city" : city,
          "state": user_state.value,
          "zip": zip
        }}
        console.log(data);
        axios.put('/api/updateUser', data).then(function(res){
          this2.props.collapse();
        })
      }else{
        var this2= this;
        const {firstName, lastName, address, city, zip} = this.state;
        const { user_role, user_state } = this.refs;
        
        //var userClientAssociation = this.refs.user_client_association.value;
        var data = {'userId':this.props.userId,'data':{
          "first_name" : firstName,
          "last_name" : lastName,
          "role" : user_role.value,
          "address" : address,
          "city" : city,
          "state": user_state.value,
          "zip": zip
        }}
        console.log(data);
        axios.put('/api/updateUser', data).then(function(res){
          this2.props.collapse();
        })
      }
    

  }

  
render(){
  
   const {user_password,user_email, errors} = this.state;

   var roles;
    if(this.state.roles.length > 0){
      roles = this.state.roles.map(function(data,i){
        if(data.role_name === this.props.auth.user.role){
          return <option selected key={i}>{data.role_name}</option>
        }else{
          return <option key={i}>{data.role_name}</option>
        }
        
      },this)
    }
    var clients;
    if(this.state.clients.length > 0){
      clients = this.state.clients.map(function(data,i){
        return <option key={i}>{data.client_name}</option>
      },this)
    }
   var role_selector;
  if(this.props.auth.user.role === 'Admin'){
    role_selector = <div className="popup-selector-dropdown" style={{flex: 1}}>
                <select ref="user_role">
                  {roles}
                </select>
              </div>
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
          <div className="popup-title">Edit Profile</div>
          <div onClick={this.props.collapse} className="popup-close"><i className="fa fa-times"></i></div>
          <form>
            
            <div className="popup-small-title">Basic Info</div>
            <div className="form-row">
              <div style={{flex: 2}}>
                <p>
                  
                  <input className="popup-input" name="firstName" onChange={this.onChange.bind(this)} value={this.state.firstName} placeholder="First Name" type="text" ref="user_first_name" id="user-first-name" />
                </p>
              </div>
              <div style={{flex: 2, marginLeft: 10}}>
                <p>
                  
                  <input className="popup-input" name="lastName" onChange={this.onChange.bind(this)} value={this.state.lastName} placeholder="Last Name" type="text" ref="user_last_name" id="user-last-name" />
                </p>
              </div>
              {role_selector}
            </div>
            <div className="form-row">
              <div style={{flex: 1}}>
                <p>
                  
                  <input className="popup-input" name="address" onChange={this.onChange.bind(this)} value={this.state.address} placeholder="Address" type="text" ref="user_address" id="user-address" />
                </p>
              </div>
              <div style={{flex: 1, marginLeft: 10}}>
                <p>
                  
                  <input className="popup-input" name="city" onChange={this.onChange.bind(this)} value={this.state.city} placeholder="City" type="text" ref="user_city" id="user-city" />
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
                  
                  <input className="popup-input" name="zip" onChange={this.onChange.bind(this)} value={this.state.zip} placeholder="Zip" type="text" ref="user_zip" id="user-zip" />
                </p>
              </div>
            </div>
            {/*<div className="popup-small-title">User Credentials</div>
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
                  {clients}
                </select>
              </div>
            </div>*/}
            <div className="form-row" style={{borderTop: 'solid 1px #e0e0e0', marginTop: 35}}>
              <div onClick={this.submitForm.bind(this)} className="create-client-btn" style={{marginTop: 15, marginLeft: 'auto', padding: '10px 45px', float: 'right'}}>Save Changes</div>
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
export default connect(mapStateToProps)(EditUserPopup);