import React from 'react';




class ProspectItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showPage: ""
    }
    
  }

   
 
  
  


  render(){

    return (
            <li>
              <div className="pros-loc-details">
                <div className="pros-loc-img" />
                <div className="pros-loc-name"><span className="pros-location-click" style={{color: '#3080e8', fontSize: '11pt'}}>3535 Malcom Ave</span><br />San Francisco CA, 94545<br />Strip Ctr.</div>
              </div>
              <div className="pros-loc-metric">Sales <br /><span style={{color: '#3080e8', fontWeight: 'bold', fontSize: '12pt'}}>+$344,445</span></div>
              <div className="pros-loc-metric">Profit <br /><span style={{color: '#3080e8', fontWeight: 'bold', fontSize: '12pt'}}>+$344,445</span></div>
              <div className="pros-loc-metric">Total SF <br /><span style={{color: '#3080e8', fontWeight: 'bold', fontSize: '12pt'}}>+$344,445</span></div>
              <div className="pros-loc-metric">Headcount <br /><span style={{color: '#3080e8', fontWeight: 'bold', fontSize: '12pt'}}>+$344,445</span></div>
              <div className="pros-loc-metric">Expenses <br /><span style={{color: '#3080e8', fontWeight: 'bold', fontSize: '12pt'}}>+$344,445</span></div>
              <div className="change-shadow-loc-btn">Change</div>
              <div className="pros-shadow-loc">
                
                <div className="pros-shadow-name"><span style={{color: '#C94345', fontSize: '11pt'}}>3535 Malcom Ave (Shadow)</span><br />San Francisco CA, 94545<br />Strip Ctr.</div>
                <div className="pros-shadow-img" />
              </div>
            </li>

    );
  }
  }

export default ProspectItem;