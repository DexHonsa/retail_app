import React from 'react';
import axios from 'axios';
import banner from '../../../images/banner.svg';
import validateInput from '../validations/card_validation';
import TextFieldGroup from './text_field_group_2';
import {connect} from 'react-redux';
import {getCustomer} from '../../actions/auth_actions';

class EnterInfo extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      plan:'',
      name:'',
      email:'',
      card_num:'',
      exp_mn:'',
      cvc:'',
      exp_yr:'',
      amt:'',
      errors: {},
      result:''
    }

		this.onChange = this.onChange.bind(this);
  }
  componentDidMount(){
    this.setState({plan:this.props.plan})
    if(this.props.plan == 'silver'){
      this.setState({amt:'9900'})
    }
    if(this.props.plan == 'gold'){
      this.setState({amt:'14900'})
    }
    if(this.props.plan == 'platnium'){
      this.setState({amt:'19900'})
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
  submitSubscription(){
    if(this.isValid()){

    let this2 = this;
      var data = {name:this.state.name,userId:this.props.auth.user.id,email:this.props.auth.user.email,plan:this.state.plan,card_num:this.state.card_num,exp_mn:this.state.exp_mn,cvc:this.state.cvc,exp_yr:this.state.exp_yr,amt:this.state.amt };
      //console.log(data)
      axios.post('/api/addSubscriptionUser',data).then(function(res){
      
      if(!res.data.data.status)
      {
         this2.setState({errors: {form:res.data.data.message}}) //for error
      }
      else{
      this2.setState({result:{form:res.data.data.status}})//for successful payment
      this2.props.getCustomer(this2.props.auth.user.id);
      }
    })
  }
  }
  render(){
    const {card_num, errors, result} = this.state;
    var plan;
    if(this.state.plan == 'silver'){
      plan = "Silver"
    }
    if(this.state.plan == 'gold'){
      plan = "Gold"
    }
    if(this.state.plan == 'platnium'){
      plan = "Platnium"
    }
    return(
      <div className="animated fadeIn">
        <div className="subscribe-container" style={{textAlign: 'center'}}>
          <img style={{width: '100%', position: 'absolute', top: 0, left: 0}} src={banner} />
          <div className="subscribe-title-top"><i style={{marginRight: 15}} className="fa fa-arrow-up" />{plan} Plan<br />
            <span style={{fontSize: '15pt'}}>You're almost there!</span></div>
        </div>
        <div style={{width: '100%', textAlign: 'center'}}>
          <div className="upgrade-options" style={{width: '50%', display: 'inline-block'}}>
            <div className="row">
              <div className="col-sm-12">
                <div className="option-tile enter-info-tile">
                  <div className="row">
                    <div className="row">
                      <div className="col-sm-12" style={{display: 'flex'}}>
                        <div className="card-input-container" style={{flex: 1}}>
                          <div className="card-input-title">Name On Card</div>
                          <TextFieldGroup
      		                	field="name"
      		                	label="Name On Card"
      		                	type="text"
      		                	value={this.state.name}
      		                	error={errors.name}
      		                	onChange={this.onChange.bind(this)}
      		                />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12" style={{display: 'flex'}}>
                        <div className="card-input-container" style={{flex: 3}}>
                          <div className="card-input-title">Card Number</div>
                          <TextFieldGroup
      		                	field="card_num"
      		                	label="XXXX-XXXX-XXXX-XXXX"
      		                	type="text"
      		                	value={this.state.card_num}
      		                	error={errors.card_num}
      		                	onChange={this.onChange.bind(this)}
      		                />
                        </div>
                        <div className="card-input-container" style={{flex: 1}}>
                          <div className="card-input-title">cvc</div>
                          <TextFieldGroup
      		                	field="cvc"
      		                	label="cvc"
      		                	type="text"
      		                	value={this.state.cvc}
      		                	error={errors.cvc}
      		                	onChange={this.onChange.bind(this)}
      		                />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12" style={{display: 'flex'}}>
                        <div className="card-input-container" style={{flex: 1}}>
                          <div className="card-input-title">Exp Month</div>
                          <TextFieldGroup
      		                	field="exp_mn"
      		                	label="mm"
      		                	type="text"
      		                	value={this.state.exp_mn}
      		                	error={errors.exp_mn}
      		                	onChange={this.onChange.bind(this)}
      		                />
                        </div>
                        <div className="card-input-container" style={{flex: 1}}>
                          <div className="card-input-title">Exp Year</div>
                          <TextFieldGroup
      		                	field="exp_yr"
      		                	label="yy"
      		                	type="text"
      		                	value={this.state.exp_yr}
      		                	error={errors.exp_yr}
      		                	onChange={this.onChange.bind(this)}
      		                />
                        </div>
                        <div className="card-input-container" style={{flex: 2}}>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div onClick={this.submitSubscription.bind(this)} className="submit-info-btn">Go {plan}</div>
                  {errors.form && <div style={{marginTop:'25px'}} className="alert alert-danger">{errors.form}</div>}
                  {result.form && <div style={{marginTop:'25px'}} className="alert alert-success">{result.form}</div>}
                  <div className="submit-info-disclaimer">By clicking above, you agree to all terms and conditions listed in our terms of service agreement.</div>
                </div>
                <div onClick={() => this.props.goBack()} className="back-to-options"><i className="fa fa-arrow-left" /> Back</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
function mapStateToProps(state){
  return{
    auth: state.auth,
    client: state.client
  }
}
export default connect(mapStateToProps, { getCustomer })(EnterInfo);
