import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import '../../../style/signups.css';

class SignUps extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  componentDidMount(){
    axios.get('/api/getTotalUsers').then(function(res){
      console.log(res);
    })
  }
  render(){
    return(
      <div className="container">
        <div className="signups-container">
          <div className="signups-top">
            <div className="signups-total">
              <div className="signups-title">Total Sign-ups</div>
              <div className="signups-value">46</div>
            </div>
            <div className="signups-total">
              <div className="signups-title">AMP Sign-ups</div>
              <div className="signups-value">46</div>
            </div>
            <div className="signups-total">
              <div className="signups-title">Colliers Sign-ups</div>
              <div className="signups-value">46</div>
            </div>
          </div>
          <div className="signups-item">
            <div className="signup-group">
              <div className="signups-title">Name</div>
              <div className="signups-value">Doug Tenny</div>
            </div>
            <div className="signup-group">
              <div className="signups-title">Email</div>
              <div className="signups-value">Dougtenny@gmail.com</div>
            </div>
            <div className="signup-group">
              <div className="signups-title">Account Plan</div>
              <div className="signups-value">silver-plan</div>
            </div>
            <div className="signup-group">
              <div className="signups-title">Account Status</div>
              <div className="signups-value">active</div>
            </div>
            <div className="signup-time">2 days ago</div>
          </div>
          <div className="signups-item">
            <div className="signup-group">
              <div className="signups-value">Doug Tenny</div>
            </div>
            <div className="signup-group">
              <div className="signups-value">Dougtenny@gmail.com</div>
            </div>
            <div className="signup-group">
              <div className="signups-value">silver-plan</div>
            </div>
            <div className="signup-group">
              <div className="signups-value">active</div>
            </div>
            <div className="signup-time">2 days ago</div>
          </div>
          <div className="signups-item">
            <div className="signup-group">
              <div className="signups-value">Doug Tenny</div>
            </div>
            <div className="signup-group">
              <div className="signups-value">Dougtenny@gmail.com</div>
            </div>
            <div className="signup-group">
              <div className="signups-value">silver-plan</div>
            </div>
            <div className="signup-group">
              <div className="signups-value">active</div>
            </div>
            <div className="signup-time">2 days ago</div>
          </div>
          <div className="signups-item">
            <div className="signup-group">
              <div className="signups-value">Doug Tenny</div>
            </div>
            <div className="signup-group">
              <div className="signups-value">Dougtenny@gmail.com</div>
            </div>
            <div className="signup-group">
              <div className="signups-value">silver-plan</div>
            </div>
            <div className="signup-group">
              <div className="signups-value">active</div>
            </div>
            <div className="signup-time">2 days ago</div>
          </div>
        </div>
      </div>

    );
  }
}
function mapStateToProps(state){
  return {
    auth:state.auth,
    client:state.client,
    customer:state.customer
  }
}

export default connect(mapStateToProps)(SignUps);
