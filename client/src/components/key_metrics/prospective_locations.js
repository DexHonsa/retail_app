import React from 'react';
import ReactTooltip from 'react-tooltip';
class ProspectiveLocations extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searches: this.props.searches
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      searches : nextProps.searches
    })
  }
  componentDidMount(){

  }
  render(){
    var searches;
    searches = this.state.searches.map(function(data, i){
      return <li key={i}>
        <div className="pros-loc-details">
          <div className="pros-loc-img" style={{backgroundImage: 'url('+data.imgUrl+')'}} />
          <div className="pros-loc-name"><span className="pros-location-click" style={{color: '#3080e8', fontSize: '11pt'}}>{data.street}</span><br />{data.city}</div>
        </div>
        <div className="pros-loc-metric">Sales <br /><span style={{color: '#3080e8', fontWeight: 'bold', fontSize: '12pt'}}><input type="text" placeholder="--"/></span></div>
        <div className="pros-loc-metric">Profit <br /><span style={{color: '#3080e8', fontWeight: 'bold', fontSize: '12pt'}}><input type="text" placeholder="--"/></span></div>
        <div className="pros-loc-metric">Total SF <br /><span style={{color: '#3080e8', fontWeight: 'bold', fontSize: '12pt'}}><input type="text" placeholder="--"/></span></div>
        <div className="pros-loc-metric">Headcount <br /><span style={{color: '#3080e8', fontWeight: 'bold', fontSize: '12pt'}}><input type="text" placeholder="--"/></span></div>
        <div className="pros-loc-metric">Expenses <br /><span style={{color: '#3080e8', fontWeight: 'bold', fontSize: '12pt'}}><input type="text" placeholder="--"/></span></div>
        <div className="change-shadow-loc-btn">Save</div>
        {/*<div className="pros-shadow-loc">
          <div className="pros-shadow-img" />
          <div className="pros-shadow-name"><span style={{color: '#C94345', fontSize: '11pt'}}>3535 Malcom Ave (Shadow)</span><br />San Francisco CA, 94545<br />Strip Ctr.</div>
        </div>*/}
      </li>;
    })
    return(
      <div className="animated fadeIn">
        <ul className="prospective-locations-list">
          {searches}
          <ReactTooltip />

        </ul>
      </div>
    );
  }
}
export default ProspectiveLocations;
