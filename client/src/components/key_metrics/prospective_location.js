import React from 'react';
import axios from 'axios';

class ProspectiveLocationItem extends React.Component{
  constructor(props){
    super(props);
      this.state = {
        sales: this.props.sales,
        profit: this.props.profit,
        totalSf:this.props.totalSf,
        headcount:this.props.headcount,
        expenses:this.props.expenses
      }

  }
  componentWillReceiveProps(nextProps){
    this.setState({
      sales: nextProps.sales,
      profit: nextProps.profit,
      totalSf:nextProps.totalSf,
      headcount:nextProps.headcount,
      expenses:nextProps.expenses
    })
  }
  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSave(searchId){
    var data = {sales:this.state.sales, profit:this.state.profit, totalSf:this.state.totalSf, headcount:this.state.headcount, expenses:this.state.expenses}
    var this2 = this;
    axios.put('/api/searches' + '/' + searchId, data).then(function(res){
      this2.props.refresh();
    })

  }
  render(){
    return(
      <li>
        <div className="pros-loc-details">
          <div className="pros-loc-img" style={{backgroundImage: 'url('+this.props.imgUrl+')'}} />
          <div className="pros-loc-name"><span className="pros-location-click" style={{color: '#3080e8', fontSize: '11pt'}}>{this.props.street}</span><br />{this.props.city}</div>
        </div>
        <div className="pros-loc-metric">Sales <br /><span style={{color: '#3080e8', fontWeight: 'bold', fontSize: '12pt'}}><input onChange={this.handleChange.bind(this)} name="sales" value={this.state.sales} type="text" placeholder="--"/></span></div>
        <div className="pros-loc-metric">Profit <br /><span style={{color: '#3080e8', fontWeight: 'bold', fontSize: '12pt'}}><input onChange={this.handleChange.bind(this)} name="profit" value={this.state.profit} type="text" placeholder="--"/></span></div>
        <div className="pros-loc-metric">Total SF <br /><span style={{color: '#3080e8', fontWeight: 'bold', fontSize: '12pt'}}><input onChange={this.handleChange.bind(this)} name="totalSf" value={this.state.totalSf} type="text" placeholder="--"/></span></div>
        <div className="pros-loc-metric">Headcount <br /><span style={{color: '#3080e8', fontWeight: 'bold', fontSize: '12pt'}}><input onChange={this.handleChange.bind(this)} name="headcount" value={this.state.headcount} type="text" placeholder="--"/></span></div>
        <div className="pros-loc-metric">Expenses <br /><span style={{color: '#3080e8', fontWeight: 'bold', fontSize: '12pt'}}><input onChange={this.handleChange.bind(this)} name="expenses" value={this.state.expenses} type="text" placeholder="--"/></span></div>
        <div onClick={() => this.handleSave(this.props.id)} className="change-shadow-loc-btn">Add</div>
        {/*<div className="pros-shadow-loc">
          <div className="pros-shadow-img" />
          <div className="pros-shadow-name"><span style={{color: '#C94345', fontSize: '11pt'}}>3535 Malcom Ave (Shadow)</span><br />San Francisco CA, 94545<br />Strip Ctr.</div>
        </div>*/}
      </li>
    );
  }
}
export default ProspectiveLocationItem;
