import React from 'react';

class Messages extends React.Component{
	render(){
		return(

 
          <div className="main-wrapper" style={{textAlign: 'center'}}>
            <div style={{display:'flex', overflow: 'auto', padding: 0}}>
              <div className="col-sm-3" style={{padding: 15, textAlign: 'left', alignItems:'stretch', borderRight: 'solid 1px #e0e0e0', paddingTop: 25}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <div style={{color: '#606060', fontSize: '15pt', marginBottom: 7, float: 'left'}}>My Conversations</div>
                  <div style={{color: '#606060', fontSize: '10pt', marginBottom: 7, float: 'right', marginLeft: 'auto'}}>4 of 4</div>
                </div>
                <div className="search-messages"><i style={{position: 'absolute', top: 6, left: 8, color: '#888888'}} className="fa fa-search" /><input type="text" /></div>
                <div className="conversation-list">
                  <div className="conversation-item active">
                    <div className="conversation-img"  />
                    <div className="conversation-title">Tom Low</div>
                    <div className="conversation-time">11:34 am</div>
                    <div className="conversation-preview">Hey Buddy! Just seeing how youre doing. </div>
                    <div className="conversation-close"><i className="fa fa-times" /></div>
                  </div>
                  <div className="conversation-item">
                    <div className="conversation-img"  />
                    <div className="conversation-title">Jerry Bulmer</div>
                    <div className="conversation-time">11:34 am</div>
                    <div className="conversation-preview">Hows life?</div>
                    <div className="conversation-close"><i className="fa fa-times" /></div>
                  </div>
                </div>
              </div>
              <div className="col-sm-9" style={{padding: 15, minHeight: 700}}>
                <div className="conversation-inner-title">Converstaion with Tom Low</div>
                <div className="conversation-container">
                  <div className="message">
                    <div>
                      <div className="message-img"/>
                    </div>
                    <div className="message-body">
                      <div className="message-sender">Me</div>
                      <div className="message-timestamp">2 days</div>
                      <div className="message-content">Hey Tom, I saw you were on HALO today and I thought Id give you a message!</div>
                    </div>
                  </div>
                  <div className="message">
                    <div>
                      <div className="message-img" />
                    </div>
                    <div className="message-body">
                      <div className="message-sender">Tom Low</div>
                      <div className="message-timestamp">2 days</div>
                      <div className="message-content">Hey! How are you doing?</div>
                    </div>
                  </div>
                  <div className="message">
                    <div>
                      <div className="message-img"  />
                    </div>
                    <div className="message-body">
                      <div className="message-sender">Me</div>
                      <div className="message-timestamp">7 hours</div>
                      <div className="message-content">I am doing great thanks for asking!</div>
                    </div>
                  </div>
                  <div className="message">
                    <div>
                      <div className="message-img"  />
                    </div>
                    <div className="message-body">
                      <div className="message-sender">Me</div>
                      <div className="message-timestamp">2 days</div>
                      <div className="message-content">I was wondering if I could ask you for a favor..</div>
                    </div>
                  </div>
                </div>
                <div className="reply-container">
                  <div className="reply-title">Write your reply to Tom Low.</div>
                  <div className="reply-text-area">
                    <textarea defaultValue={""} />
                  </div>
                  <div className="reply-bottom">
                    <div className="load-more-btn" style={{margin: 0}}><i className="fa fa-paperclip" />&nbsp;&nbsp;&nbsp;Add Attachment</div>
                    <div className="send-reply-btn" style={{marginLeft: 'auto'}}>Send</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        

);
	}
}

export default Messages;