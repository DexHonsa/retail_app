import React from 'react';
import request from 'superagent';
import validateInput from '../../validations/create_role_validation';
import TextFieldGroup from './text_field_group';
import axios from 'axios';
import Checkbox from './checkbox';

const CLOUDINARY_UPLOAD_PRESET = 'MyPreset';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dexhonsa/image/upload';
const items = [
  'Create Clients',
  'Create Users',
  'Access All Clients'

];

class CreateRolePopup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

      role_name: '',
      roles: [],
      role_accesses: [],
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

    onChange(e){
    this.setState({
      [e.target.name] : e.target.value
    })
  }




  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  }

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  }

  handleFormSubmit = formSubmitEvent => {
    var this2 = this;
      if(this.isValid()){
        formSubmitEvent.preventDefault();
        var role_accesses = [];
        for (const checkbox of this2.selectedCheckboxes) {
          role_accesses.push(checkbox);
        }
        this2.setState({
          role_accesses: role_accesses
        })
        var data = {
          "role_name" : this2.state.role_name,
          "role_accesses" : role_accesses
        }

        axios.post('/api/roles', data).then(function(res){
          this2.setState({
            roles: res.data
          })
          this2.props.collapse();
        })
      }
    }


  createCheckbox = label => (
    <Checkbox
            label={label}
            handleCheckboxChange={this.toggleCheckbox}
            key={label}
        />
  )

  createCheckboxes = () => (
    items.map(this.createCheckbox)
  )



render(){
  const {role_name, errors} = this.state;
    return (
      <div id="role-popup" className="popup">
        <div className="popup-container animated-slow bounceInUp" style={{textAlign: 'center'}}>
          <div className="popup-title" style={{textAlign: 'center'}}>Add New Role</div>
          <div onClick={this.props.collapse} className="popup-close"><i className="fa fa-times"></i></div>
          <form>
            {/*<div className="popup-small-title">Change Color</div>
            <div className="create-role-badge" style={{display: 'inline-block'}}>
              <i className="fa fa-glass" />
            </div>*/}

            <div className="form-row" style={{width: 400, display: 'inline-block'}}>
              <div>
                <TextFieldGroup
                      field="role_name"
                      label="Role Name"
                      type="text"
                      value={role_name}
                      error={errors.role_name}
                      onChange={this.onChange.bind(this)}
                    />
              </div>
            </div>
            <div className="form-row" style={{display: 'inline-block', width: 400, paddingBottom:25}}>
              <div className="control-group">
                <div className="popup-small-title">Role Access</div>
                {this.createCheckboxes()}
                {/*<label className="control control--checkbox">Create Clients
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
                </label>*/}
              </div>
            </div>
            <div className="form-row" style={{borderTop: 'solid 1px #e0e0e0', textAlign: 'center', display: 'block'}}>
              <div onClick={this.handleFormSubmit.bind(this)} className="create-client-btn" style={{marginTop: 15, display: 'inline-block'}}>Create Role</div>
            </div>
          </form>
        </div>
      </div>



    );
  }
  }

export default CreateRolePopup;
