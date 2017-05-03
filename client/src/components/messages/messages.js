import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import TimeAgo from 'react-timeago';
import $ from 'jquery';
import AddPropertyPopup from './add_property_popup';
import {Link} from 'react-router';

class Messages extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      active: "",
      userId : this.props.auth.user.id,
      recipientId : "",
      users: [],
      user: [],
      recipient: [],
      messages: [],
      messageText: '',
      lastMessages: [],
      addPropertyPopup: false,
      addedProperty:[]
    }
  }
  componentDidMount() {
    $('body').on('keypress', 'input', function(args) {
      if (args.keyCode == 13) {
          this2.sendMessage();
          return false;
      }
    });
    this.getConversations();

    var this2 = this;
    axios.get('/api/users/' + this.props.auth.user.id).then(function(res){
      this2.setState({
        user: res.data.User
      })
    })
  }
  addProperty(id){
    console.log(id);
    this.hideAddPropertyPopup();
    var this2 = this;
    axios.get('/api/search' + '/' + id).then(function(res){

      this2.setState({addedProperty: res.data.Searches})
    })
  }
  showAddPropertyPopup(){
    this.setState({
      addPropertyPopup : true
    })
  }
  hideAddPropertyPopup(){
    this.setState({
      addPropertyPopup : false
    })
  }
  parseHTML(html) {
    var t = document.createElement('template');
    t.innerHTML = html;
    return t.content.cloneNode(true);
  }
  sendMessage(){
    var this2 = this;
    var data = {
      creator_id : this.state.user.id,
      recipient_id : this.state.recipient.id,
      message_body: this.refs.messageBody.value,
      is_read: 0,
      create_date: Date.now()
    }
    if(Object.keys(this.state.addedProperty).length > 0){
      data['addedPropertyImg'] = this.state.addedProperty.imgUrl;
      data['addedPropertyId'] = this.state.addedProperty.id;
      data['addedPropertyAddress'] = this.state.addedProperty.street;
    }
    if(this.state.messageText !== ''){
    axios.post('/api/sendMessage', data).then(function(res){

      this2.setState({
        messageText : '',
        addedProperty: []
      })
    })
    this.getMessages(this.state.recipient.id,this.state.recipient.id)
   }
  }

  onMessageChange(e){
    this.setState({
      messageText: e.target.value
    })
  }
  removeAddedProperty(){
    this.setState({
      addedProperty: []
    })
  }
  getConversations(){
    var this2 = this;
    axios.get('/api/getUsers/' + this.props.auth.user.parent_user).then(function(res){

      this2.setState({
        users: res.data.User
      },
      function(){
        this2.getLastMessages(res.data.User);
      })
    })
  }
  getLastMessages(users){
    var this2 = this;
    var lastMessages = [];
    users.forEach(function(item, i){
      var item = item;

          var data = {
            userId : this2.props.auth.user.id,
            recipientId: item.id
          };
          axios.post('/api/getLastMessages', data).then(function(res){

            lastMessages[item.id] = res.data.data;
            this2.setState({
              lastMessages : lastMessages
            })
          })

      })


  }
  readMessage(userId, recipientId){
   if(this.state.messages.length > 0){
    if(this.state.messages[this.state.messages.length-1].creator_id !== userId){
      var data = {
      userId : userId,
      recipientId : recipientId
    }
    axios.put('/api/readMessage', data).then(function(res){

    })
    }
      }

  }
  getMessages(recipientId){

    var this2 = this;

     axios.get('/api/users/' + recipientId).then(function(res){
      this2.setState({
        recipient: res.data.User,
        active: recipientId,
        recipientId : recipientId
      });
    })

    var data = {
      userId : this.props.auth.user.id,
      recipientId : recipientId
    }

    axios.post('/api/getMessages', data).then(function(res){
      this2.setState({
       messages: res.data.data
      },
      function(){
        this2.readMessage(this2.props.auth.user.id, recipientId)
      }
      )

    })
  }
  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
     this.sendMessage();
    }
  }


truncate(string){
   if (string.length > 45)
      return string.substring(0,45)+'...';
   else
      return string;
};
	render(){
    var addedProperty;
    var conversations;
    var replyBox;
    var addPropertyPopup;

    if(Object.keys(this.state.addedProperty).length > 0){
      addedProperty = <div className="added-property">
        <div className="added-property-img" style={{backgroundImage:'url('+this.state.addedProperty.imgUrl+')'}}></div>
        <div className="added-property-name">{this.state.addedProperty.city}</div>
        <div onClick={this.removeAddedProperty.bind(this)} className="remove-added-property"><i className="fa fa-close"></i></div>

      </div>;
      console.log('added');
    }
    if(this.state.addPropertyPopup){
      addPropertyPopup = <AddPropertyPopup addProperty={this.addProperty.bind(this)} hideAddPropertyPopup={this.hideAddPropertyPopup.bind(this)} />;
    }
    if(this.state.recipient !== undefined){
      replyBox = <div className="reply-container animated fadeInUp">
                  {addedProperty}
                  <div className="reply-title">Write your reply to {this.state.recipient.first_name} {this.state.recipient.last_name}.</div>
                  <div className="reply-text-area">

                    <textarea onKeyPress={this._handleKeyPress.bind(this)} value={this.state.messageText}  onChange={this.onMessageChange.bind(this)} ref="messageBody" placeholder={"write your message..."} />
                  </div>
                  <div className="reply-bottom">
                    <div className="load-more-btn" style={{margin: 0}}><i className="fa fa-paperclip" />&nbsp;&nbsp;&nbsp;Add Attachment</div>
                    <div onClick={this.showAddPropertyPopup.bind(this)} className="load-more-btn" style={{margin: 0, marginLeft:15}}><i className="fa fa-home" />&nbsp;&nbsp;&nbsp;Add Property</div>
                    <div  onClick={this.sendMessage.bind(this)} className="send-reply-btn" style={{marginLeft: 'auto'}}>Send</div>
                  </div>
                </div>
    }

    if(Object.keys(this.state.lastMessages).length > 0){
      conversations = this.state.users.map(function(data, i){
                  if(data.id === this.props.auth.user.id){

                  }else{
                    if(this.state.lastMessages[data.id][0]){
                      var unread;

                      if(this.state.lastMessages[data.id][0].is_read === 0 && this.props.auth.user.id !== this.state.lastMessages[data.id][0].creator_id ){
                        unread = <div className="unread-checker"><i className="fa fa-circle"></i></div>
                      }
                      return <div key={i} className={this.state.active === data.id ? 'conversation-item active animated fadeInUp' : 'conversation-item animated fadeInUp'} onClick={() => this.getMessages(data.id)}>
                          <div className="conversation-img" style={{backgroundImage: 'url(' +data.user_img_path+ ')'}} />
                          <div style={{flex: 1}}>
                          <div className="conversation-title">{unread}{data.first_name + ' ' + data.last_name}</div>
                          <div className="conversation-time"></div>
                          <div className="conversation-preview">{this.truncate(this.state.lastMessages[data.id][0].message_body)}</div>



                          </div>

                        </div>
                    }

                  return <div key={i} className={this.state.active === data.id ? 'conversation-item active animated fadeInUp' : 'conversation-item animated fadeInUp'} onClick={() => this.getMessages(data.id)}>
                          <div className="conversation-img" style={{backgroundImage: 'url(' +data.user_img_path+ ')'}} />
                          <div style={{flex: 1}}>
                          <div className="conversation-title">{data.first_name + ' ' + data.last_name}</div>
                          <div className="conversation-time"></div>
                          <div className="conversation-preview"></div>

                          </div>

                        </div>
                      }
                },this)

    }else{

    }
		return(


          <div className="main-wrapper" style={{textAlign: 'center'}}>
            {addPropertyPopup}
            <div style={{display:'flex', overflow: 'auto', padding: 0}}>
              <div className="col-sm-3" style={{padding: 15, textAlign: 'left', alignItems:'stretch', borderRight: 'solid 1px #e0e0e0', paddingTop: 25}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <div style={{color: '#606060', fontSize: '15pt', marginBottom: 7, float: 'left'}}>My Conversations</div>
                  <div style={{color: '#606060', fontSize: '10pt', marginBottom: 7, float: 'right', marginLeft: 'auto'}}></div>
                </div>
                <div className="search-messages"><i style={{position: 'absolute', top: 6, left: 8, color: '#888888'}} className="fa fa-search" /><input type="text" /></div>
                <div className="conversation-list">
                {conversations}


                </div>
              </div>
              <div className="col-sm-9" style={{padding: 15, minHeight: 700}}>
                <div className="conversation-inner-title">Conversations with {this.state.recipient.first_name} {this.state.recipient.last_name}</div>
                <div className="conversation-container">
                {this.state.messages.map(function(data, i){
                  var addedProperty;
                  if(data.recipient_id !== this.state.recipient.id){

                    if(data.addedPropertyImg !== undefined){
                      addedProperty = <Link to={"/property/propertydetails/" + data.addedPropertyId}><div className="added-property-mini">
                        <div className="added-property-mini-img" style={{backgroundImage:'url('+data.addedPropertyImg+')'}}></div>
                        <div className="added-property-mini-title">{data.addedPropertyAddress}</div>
                      </div></Link>;
                    }
                    return (<div className="message animated fadeInUp" key={i}>
                    <div>
                      <div className="message-img" style={{backgroundImage: 'url(' +this.state.recipient.user_img_path+ ')'}} />
                    </div>
                    <div className="message-body">
                      <div className="message-sender">{this.state.recipient.first_name + ' ' + this.state.recipient.last_name}</div>
                      <div className="message-timestamp"><TimeAgo date={data.create_date} /></div>
                      <div className="message-content">{data.message_body}</div>
                      {addedProperty}
                    </div>
                  </div>);
                  }else{
                    if(data.addedPropertyImg !== undefined){
                      addedProperty = <Link to={"/property/propertydetails/" + data.addedPropertyId}><div className="added-property-mini">
                        <div className="added-property-mini-img" style={{backgroundImage:'url('+data.addedPropertyImg+')'}}></div>
                        <div className="added-property-mini-title">{data.addedPropertyAddress}</div>
                      </div></Link>;
                    }
                    return (<div className="message animated fadeInUp" key={i}>
                    <div>
                      <div className="message-img" style={{backgroundImage: 'url(' +this.state.user.user_img_path+ ')'}} />
                    </div>
                    <div className="message-body">
                      <div className="message-sender">{this.state.user.first_name + ' ' + this.state.user.last_name}</div>
                      <div className="message-timestamp"><TimeAgo date={data.create_date} /></div>
                      <div className="message-content">{data.message_body}</div>
                      {addedProperty}

                    </div>
                  </div>);
                  }
                },this)}

                </div>
                {replyBox}
              </div>
            </div>
          </div>


);
	}
}

function mapStateToProps(state){
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(Messages);
