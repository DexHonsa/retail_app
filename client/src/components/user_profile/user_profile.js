import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import request from 'superagent';
import $ from 'jquery';
import AvatarCropper from "react-avatar-cropper";
import img from '../../../images/camera_upload.jpg';
import FileUploaderUser from './file_uploader_user';
import EditUserPopup from '../popups/users/edit_user_popup';
import CreateContact from './create_user_contact';
import {Link} from 'react-router';
import Upgrade from '../util/upgrade';
import CancelSubscription from '../util/cancel_subscription';


const CLOUDINARY_UPLOAD_PRESET = 'MyPreset';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dexhonsa/image/upload';



class UserProfile extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			userId: this.props.params.id,
			user: [],
      searches: [],
      croppedImg: img,
      cropperOpen: false,
      img: null,
      myProfile: false,
      editUserPopup: false,
      createContactPopup: false,
			upgradePopup: false,
			CancelSubscriptionPopupL:false,
      userContacts: [],
      errors: {},
			userPlan:this.props.customer.customerPlan,
			customer:{}

		}
	}

	componentDidMount() {
		this.getUser();
		this.getCustomer();
    this.getSearches(this.props.params.id);
	}
  componentWillReceiveProps(nextProps) {
     this.getSearches(nextProps.params.id);
		 this.setState({
			 userPlan:nextProps.customer.customerPlan
		 })
  }
  getSearches(userId){
    var this2 = this
    axios.get('/api/getUserSearches/' + userId).then(function(res){

      this2.setState({
        searches : res.data
      })
    })
  }
	getUser(){
		var this2 = this;
    if(this.state.userId === this.props.auth.user.id){
      this.setState({
        myProfile:true
      })
    }


		axios.get('/api/users/' + this.state.userId).then(function(res){

			this2.setState({
				user: res.data.User,
        userContacts: res.data.User.contacts
			})
		})
	}
	getCustomer(){
		var this2 = this;
		axios.get('/api/getCustomer' + '/' + this.props.auth.user.id).then(function(res){
			console.log(res);
			this2.setState({customer:res.data.customer})
		})
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
    },function(){this.updatePicture()})

  }
  handleRequestHide() {
    this.setState({
      cropperOpen: false
    })
  }
  updatePicture(){
    var this2 = this;
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
        var img_path = this.state.uploadedFileCloudinaryUrl;
        var data = {
          userId : this.props.auth.user.id,
          img : img_path
        }
        axios.put('/api/changePicture', data).then(function(res){
          this2.getUser();
        })
        }




    });
  }
  hideEditUserPopup(){
    this.setState({editUserPopup : false});
    this.getUser();
  }
  showEditUserPopup(){
    this.setState({editUserPopup : true});
  }
	hideUpgradePopup(){
    this.setState({upgradePopup : false});
    this.getUser();
  }
  showUpgradePopup(){
    this.setState({upgradePopup : true});
  }
	hideCancelSubscriptionPopup(){
    this.setState({cancelSubscriptionPopup : false});
  }
  showCancelSubscriptionPopup(){
    this.setState({cancelSubscriptionPopup : true});
  }
  showCreateContact(){
    this.setState({createContactPopup:true})
  }
  hideCreateContact(){
    this.setState({createContactPopup:false})
    this.getUser();
  }
  deleteUserContact(index, userId){
    var this2 = this;
    var newData = this.state.userContacts.slice(); //copy array
      newData.splice(index, 1); //remove element
      this.setState({userContacts: newData}); //update state

      var data = {
        userId :  this.props.params.id,
        contactIndex: index,
        deleteContact: true
      }
    axios.put('/api/updateUserContact', data).then(function(res){

        this2.hideCreateContact();
      })
}
	render(){
    var createContactPopup;
		var upgradePopup;
		var plan;
		var cancelSubscriptionPopup;
		var accountPlan;
		var accountStatus;
		if(Object.keys(this.state.customer).length > 0){
			//console.log(this.state.customer);
			if(Object.keys(this.state.customer.subscriptions.data).length > 0){
				accountPlan = this.state.customer.subscriptions.data[0].plan.name;
				accountStatus = this.state.customer.subscriptions.data[0].status;
			}else{
				accountPlan = "None";
				accountStatus = "Canceled"
			}

		}
		if(this.state.cancelSubscriptionPopup){
			cancelSubscriptionPopup = <CancelSubscription hideCancelSubscriptionPopup={this.hideCancelSubscriptionPopup.bind(this)}/>
		}
		if(this.state.userPlan == 'silver-plan'){
			plan = 'Silver';
		}
		if(this.state.userPlan == 'gold-plan'){
			plan = 'Gold';
		}
		if(this.state.userPlan == 'platnium-plan'){
			plan = 'Platnium';
		}
    if(this.state.createContactPopup === true){
      createContactPopup = <CreateContact hideCreateContact={this.hideCreateContact.bind(this)} userId={this.props.params.id} />;
    }else{
      createContactPopup = '';
    }

		if(this.state.upgradePopup === true){
      upgradePopup = <Upgrade hideUpgradePopup={this.hideUpgradePopup.bind(this)} userId={this.props.params.id} />;
    }else{
      upgradePopup = '';
    }
    const {contactName, contactEmail, contactPhone, errors} = this.state;
    var popup;
     if(this.state.editUserPopup){
            popup = <EditUserPopup userId={this.state.userId} edit={true} collapse={this.hideEditUserPopup.bind(this)} />
        }
		 var searches;
     var changePictureBtn;
     if(this.state.myProfile){
      changePictureBtn = <div className="change-logo-btn">Change Picture
                        <FileUploaderUser handleFileChange={this.handleFileChange.bind(this)} />
                      </div>;
     }
    if(this.state.searches.length > 0){
      searches = this.state.searches.map(function(data, i){
        return <Link key={i} to={"/property/propertydetails" + '/'+ data.id}><div  className="saved-location-item">
                    <div className="saved-location-img" style={{backgroundImage: 'url('+data.imgUrl+')'}}/>
                    <div className="saved-location-title">{data.street}<br /> <span style={{fontSize: '10pt'}}>{data.city}</span></div>
                    <i className="fa fa-map-marker" />
                  </div></Link>
      })
    }else{
      searches = <div className="no-searches">No Saved Searches</div>;
    }
    var editBtn;
    var addClientContactBtn;
    if(this.props.auth.user.role === 'Admin'){
    if(this.state.userId === this.props.auth.user.id){
     editBtn = <div onClick={this.showEditUserPopup.bind(this)} className=" load-more-btn">Edit</div>;
     addClientContactBtn = <div className="client-contact-create">
                    <div onClick={this.showCreateContact.bind(this)} className="client-contact-create-title">Add Contact</div>
                  </div>;
    }else{
      editBtn = <div onClick={this.showEditUserPopup.bind(this)} className=" load-more-btn">Edit</div>;

    }
		}else{
      if(this.state.userId === this.props.auth.user.id){
      editBtn = <div onClick={this.showEditUserPopup.bind(this)} className=" load-more-btn">Edit</div>
      addClientContactBtn = <div className="client-contact-create">
                    <div onClick={this.showCreateContact.bind(this)} className="client-contact-create-title">Add Contact</div>
                  </div>;
    }
    }
		return(
			<main className="main">
      {popup}
      {createContactPopup}
			{upgradePopup}
			{cancelSubscriptionPopup}
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
        <div className="main-wrapper" style={{textAlign: 'center', position: 'relative'}}>
          <div className="container" style={{background: '#fff', boxShadow: '1px 1px 3px rgba(0,0,0,0.2)', minHeight: 'calc(100vh - 70px)', padding: 0}}>
            <div className="view-client-top">
              <div className="view-client-logo-container">
                <div className="view-client-logo-img" style={{backgroundImage: 'url('+this.state.user.user_img_path+')'}} />
                {changePictureBtn}

              </div>

              <div className="view-client-title">{this.state.user.first_name} {this.state.user.last_name}<br /><span style={{fontSize: '15pt', color: '#808080'}}>{this.state.user.role}</span></div>

            </div>

            <div className="details-container">
            <div className="edit-profile-btn-container">
             {editBtn}
             </div>
              <div className="col-sm-8">
                <div className="client-details">
                  <div className="field-header">Your Info</div>
                  <div className="field-container">
                    <div className="field-title">Email Address</div>
                    <div className="field-value">{this.state.user.email}</div>
                  </div>
                  <div className="field-container">
                    <div className="field-title">Password</div>
                    <div className="field-value">Change Password</div>
                  </div>
									<div className="field-container">
                    <div className="field-title">Account Plan</div>
                    <div className="field-value">{accountPlan}<div onClick={this.showUpgradePopup.bind(this)} className="upgrade-btn">Upgrade</div></div>
                  </div>
									<div className="field-container">
                    <div className="field-title">Account Status</div>
                    <div className="field-value">{accountStatus} (15 days Remaining)<div onClick={this.showCancelSubscriptionPopup.bind(this)} className="upgrade-btn">Cancel Subscription</div></div>
                  </div>
                </div>
                <div className="saved-locations-container">
                  <div className="field-header">Saved Searches</div>
                  {searches}

                </div>
              </div>

              <div className="col-sm-4">
                <div className="client-contacts">
                  <div className="client-contact-header">Related Contacts</div>
                  {this.state.userContacts.map(function(data, i){
                    if(this.state.userId === this.props.auth.user.id){
                        return <div className="client-contact-item">
                            <div className="client-contact-desc">{data.contactName}<br /><span style={{fontSize: '10pt', color: '#808080'}}>{data.contactEmail}</span><br /><span style={{fontSize: '10pt', color: '#808080'}}>{data.contactPhone}</span></div>
                            <div className="client-contact-icons"> <i onClick={(index) => this.deleteUserContact(i).bind(this)} className="fa fa-times-rectangle" /></div>
                          </div>;
                    }else{
                    return <div className="client-contact-item">
                            <div className="client-contact-desc">{data.contactName}<br /><span style={{fontSize: '10pt', color: '#808080'}}>{data.contactEmail}</span><br /><span style={{fontSize: '10pt', color: '#808080'}}>{data.contactPhone}</span></div>
                            <div className="client-contact-icons"> </div>
                          </div>;
                        }
                  },this)}
                   {addClientContactBtn}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

			);
	}
}


function mapStateToProps(state){
  return{
    auth: state.auth,
    client: state.client,
		customer:state.customer
  }
}
export default connect(mapStateToProps)(UserProfile);
