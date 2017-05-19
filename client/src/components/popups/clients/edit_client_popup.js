import React from 'react';
import request from 'superagent';
import $ from "jquery";
import AvatarCropper from "react-avatar-cropper";
import img from '../../../../images/camera_upload.jpg';
import ContactItem from './contact_item';
import FileUploader from './file_uploader';
import {connect} from 'react-redux';
import validateInput from '../../validations/create_client_validation';
import TextFieldGroup from './text_field_group';
import axios from 'axios';


const CLOUDINARY_UPLOAD_PRESET = 'MyPreset';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dexhonsa/image/upload';

class CreateClientPopup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      client_name : "",
      state : "",
      contacts : [],
      croppedImg: img,
      cropperOpen: false,
      img: null,
      closePopup: false,
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
  onChange(e){
    this.setState({
      [e.target.name] : e.target.value
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
    var this2 = this;
    if(this.isValid()){
        var upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', this.state.croppedImg);

        upload.end((err, response) => {
          if (err) {
            console.error(err);
          }

          if (response.body.secure_url !== '') {
            this2.setState({
              uploadedFileCloudinaryUrl: response.body.secure_url,
            });


            var clientName = this.state.client_name;
            var industryName = this.refs.industry_name.value;
            var addressName = this.refs.address_name.value;
            var cityName = this.refs.city_name.value;
            var stateName = this.refs.state_name.value;
            var zipName = this.refs.zip_name.value;
            var imgURL = this.state.uploadedFileCloudinaryUrl;



            var data = {'user_id': this.props.auth.user.id,"client_name" : clientName,"industry" : industryName,"address" : addressName,"city" : cityName, "associated_users" : [this.props.auth.user.id], "state" : stateName,"zip" : zipName,"logo_path" : imgURL, contacts: [] };

            $.ajax({
              type: "POST",
              url: "/api/clients",
              data: JSON.stringify(data),
              success: function(data){

                // var data = {
                //   userId: this2.props.auth.user.id,
                //   clientName: data[0].client_name,
                //   clientId: data[0].id
                // }
                // axios.put('/api/addAssociatedUser', data).then(function(res){
                //   //console.log(res);

                // })
               this2.props.collapse();
              },
              dataType: "json",
              contentType: "application/json"
            });
          }
        });
    }


  }

  collapseThis(event){
    this.setState({
      closePopup: true
    })
  }


render(){
  const {client_name, errors} = this.state;
      if(this.state.closePopup === true){
        this.props.collapse();
      }
    return (

      <div className="popup">

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
            <div className="popup-title">Edit Client</div>
            <div onClick={this.props.collapse} className="popup-close"><i className="fa fa-times"></i></div>
            <form>

              {/* <div className="popup-small-title">Upload a Logo</div>
              <div className="upload-picture" style={{backgroundImage: 'url(' + this.state.croppedImg + ')'}}>
              <FileUploader handleFileChange={this.handleFileChange.bind(this)} />


              </div> */}
              <div className="popup-small-title">Basic Info</div>
              <div className="form-row">
                <div style={{flex: 2}}>

                    <TextFieldGroup
                      field="client_name"
                      label="Client Name"
                      type="text"
                      value={client_name}
                      error={errors.client_name}
                      onChange={this.onChange.bind(this)}
                    />
                </div>
                <div className="popup-selector-dropdown" style={{flex: 1}}>
                  <select ref="industry_name">
                    <option default>Industry</option>
                    <option>Retail</option>
                    <option>Food Service</option>
                    <option>Specialty Retailer</option>
                    <option>Warehouse Retailer</option>
                    <option>Department Store</option>
                    <option>Supermarkets</option>
                    <option>Restaurants</option>
                    <option>E-tailers</option>


                  </select>
                </div>
              </div>
              <div className="form-row">
                <div style={{flex: 1}}>

                    <p>
                    <input className="popup-input" placeholder="Street Address" type="text" ref="address_name" id="address" />
                    </p>
                </div>
                <div style={{flex: 1, marginLeft: 10}}>
                    <p>
                    <input className="popup-input" placeholder="City" type="text" ref="city_name" id="city" />
                    </p>
                </div>
              </div>
              <div className="form-row">
                <div className="popup-selector-dropdown" style={{flex: 1, maxWidth: 250, marginLeft: 0}}>
                  <select ref="state_name">
                    <option default>State</option>
                    <option>Alabama</option>
                    <option>Alaska</option>
                    <option>Arizona</option>
                    <option>Arkansas</option>
                    <option>California</option>
                    <option>Colorado</option>
                    <option>Conneticut</option>
                    <option>Delaware</option>
                    <option>Florida</option>
                    <option>Georgia</option>
                    <option>Hawaii</option>
                    <option>Idaho</option>
                    <option>Illinois</option>
                    <option>Indiana</option>
                    <option>Iowa</option>
                    <option>Kansas</option>
                    <option>Kentucky</option>
                    <option>Louisiana</option>
                    <option>Maine</option>
                    <option>Maryland</option>
                    <option>Massachusetts</option>
                    <option>Michigan</option>
                    <option>Minnesota</option>
                    <option>Mississippi</option>
                    <option>Missouri</option>
                    <option>Montana</option>
                    <option>Nebraska</option>
                    <option>Nevada</option>
                    <option>New Hampshire</option>
                    <option>New Jersey</option>
                    <option>New Mexico</option>
                    <option>New York</option>
                    <option>North Carolina</option>
                    <option>North Dakota</option>
                    <option>Ohio</option>
                    <option>Oklahoma</option>
                    <option>Oregon</option>
                    <option>Pennsylvania</option>
                    <option>Rhode Island</option>
                    <option>South Carolina</option>
                    <option>South Dakota</option>
                    <option>Tennessee</option>
                    <option>Texas</option>
                    <option>Utah</option>
                    <option>Vermont</option>
                    <option>Virginia</option>
                    <option>Washington</option>
                    <option>West Virginia</option>
                    <option>Wisconsin</option>
                    <option>Wyonming</option>
                    
                  </select>
                </div>
                <div style={{flex: 1, maxWidth: 100, marginLeft: 10}}>
                    <p>
                    <input className="popup-input" placeholder="Zip" type="text" ref="zip_name" id="zip" />
                    </p>
                </div>
              </div>
              {/*<div className="popup-small-title">Contact Info</div>
              <div className="added-contacts">
                <ul className="added-contacts-list">
                  {this.state.contacts.map(function(data, i) {
                    return <ContactItem id={i} first_name={data.first_name} last_name={data.last_name} title={data.title} email={data.email} phone={data.phone} delete={this.deleteContact.bind(this, data)}   />
                  },this)
                }

                </ul>
              </div>
              <div className="form-row">
                <div style={{flex: 1}}>
                    <p>
                    <input className="popup-input" placeholder="First Name" type="text" ref="first_name" id="first-name" />
                    </p>
                </div>
                <div style={{flex: 1, marginLeft: 10}}>
                    <p>
                    <input className="popup-input" placeholder="Last Name" type="text" ref="last_name" id="last-name" />
                  </p>
                </div>
                <div style={{flex: 1, marginLeft: 10}}>
                    <p>
                    <input className="popup-input" placeholder="Title" type="text" ref="title" id="title-name" />
                    </p>
                </div>
              </div>
              <div className="form-row">
                <div style={{flex: 2}}>
                  <p>
                    <input className="popup-input" placeholder="Email" type="text" ref="email" id="email" />
                  </p>
                </div>
                <div style={{flex: 2, marginLeft: 10}}>
                  <p>
                    <input className="popup-input" placeholder="Phone" type="text" ref="phone" id="phone" />
                  </p>
                </div>
                <div style={{flex: 1, marginLeft: 10}}>
                  <div onClick={this.addContact.bind(this)} className="add-contact-btn">Add Contact</div>
                </div>
              </div>*/}
              <div className="form-row" style={{borderTop: 'solid 1px #e0e0e0'}}>
                <div onClick={this.submitForm.bind(this)} className="create-client-btn" style={{marginTop: 15}}>Create Client</div>
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
export default connect(mapStateToProps)(CreateClientPopup);
