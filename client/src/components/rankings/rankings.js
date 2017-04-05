import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class Rankings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientSearches : [],
      zips: [],
      field: 'Population',
      clientName : this.props.client.clientName,
      clientId: this.props.client.clientId,
      clientSearchesRankings: [],
      results: [],
    }
  }
  componentDidMount() {
   
    this.getClientSearches(this.props.auth.user.id, this.state.clientId);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      clientName: nextProps.client.clientName,
      clientId: nextProps.client.clientId
    })
    this.getClientSearches(this.props.auth.user.id, nextProps.client.clientId);
  }
  getClientSearches(userId, clientId){
    var this2=this;
    axios.get('/api/searches/' + userId + '/' + clientId).then(function(res){
      var zipArray = [];
      res.data.forEach(function(item){
        zipArray.push(item.zip);
      })
      this2.getClientSearchesRankings(zipArray, this2.state.field);
      this2.setState({
        clientSearches:res.data,
        zips: zipArray
      })
     
    })

  }

  getClientSearchesRankings(zips, field){
    var this2 = this;
    axios.post('/api/getSearchRankings', {'zips': zips, 'field': field }).then(function(res){
      //console.log(res.data);
      this2.setState({
        clientSearchesRankings: res.data
      })
     // console.log(this2.state.clientSearchesRankings.data[0].Population.value);
    })

  }
	render(){
      
		return(
			<main className="main">
        <div className="main-wrapper" style={{textAlign: 'center', position: 'relative'}}>
          <div className="container" style={{background: '#fff', boxShadow: '1px 1px 3px rgba(0,0,0,0.2)', padding: 0, paddingBottom: 150}}>
            <div className="retail-tabs">
              <div data-tab-label="clients" className="retail-tab active">Population</div>
              <div data-tab-label="users" className="retail-tab">Total Households</div>
              <div data-tab-label="users" className="retail-tab">Household Income</div>
              <div data-tab-label="users" className="retail-tab">Education</div>
              <div data-tab-label="users" className="retail-tab">Custom</div>
            </div>
            {/*Rankings*/}
            <div>
              <div className="rankings-saved-searches">
                <div className="rankings-saved-searches-title">{this.state.clientName} Saved Searches</div>
                {this.state.clientSearches.map(function(data, i){
                  return <div key={i} className="ranking-search-item">
                            <div className="ranking-search-item-img" style={{backgroundImage: 'url('+data.imgUrl+')'}} />
                            <div className="ranking-search-item-title">{data.street}<br /><span style={{fontSize: '.8em', color: '#aeaeae'}}>{data.city}</span></div>
                            <div className="ranking-search-item-rank">Rank<br /> <span style={{fontSize: '12pt', color: '#3080e8'}}>#{this.state.clientSearchesRankings.data[i].Population.rank}</span></div>
                          </div>
                },this)}
                
              </div>
              <div className="rankings-results">
                <div className="rankings-results-item">
                  <div className="rankings-results-item-img" />
                  <div className="rankings-results-item-title">New York City, 10010<br /> <span style={{fontSize: '.8em', color: '#808080'}}>Population: 150,000</span></div>
                  <div className="rankings-results-item-rank">#1</div>
                </div>
                <div className="rankings-results-item">
                  <div className="rankings-results-item-img" />
                  <div className="rankings-results-item-title">New York City, 10010<br /> <span style={{fontSize: '.8em', color: '#808080'}}>Population: 150,000</span></div>
                  <div className="rankings-results-item-rank">#2</div>
                </div>
                <div className="rankings-results-item">
                  <div className="rankings-results-item-img" />
                  <div className="rankings-results-item-title">New York City, 10010<br /> <span style={{fontSize: '.8em', color: '#808080'}}>Population: 150,000</span></div>
                  <div className="rankings-results-item-rank">#3</div>
                </div>
                <div className="rankings-results-item">
                  <div className="rankings-results-item-img" />
                  <div className="rankings-results-item-title">New York City, 10010<br /> <span style={{fontSize: '.8em', color: '#808080'}}>Population: 150,000</span></div>
                  <div className="rankings-results-item-rank">#4</div>
                </div>
                <div className="rankings-results-item">
                  <div className="rankings-results-item-img" />
                  <div className="rankings-results-item-title">New York City, 10010<br /> <span style={{fontSize: '.8em', color: '#808080'}}>Population: 150,000</span></div>
                  <div className="rankings-results-item-rank">#5</div>
                </div>
                <div className="rankings-results-item">
                  <div className="rankings-results-item-img" />
                  <div className="rankings-results-item-title">New York City, 10010<br /> <span style={{fontSize: '.8em', color: '#808080'}}>Population: 150,000</span></div>
                  <div className="rankings-results-item-rank">#6</div>
                </div>
                <div className="rankings-results-item">
                  <div className="rankings-results-item-img" />
                  <div className="rankings-results-item-title">New York City, 10010<br /> <span style={{fontSize: '.8em', color: '#808080'}}>Population: 150,000</span></div>
                  <div className="rankings-results-item-rank">#7</div>
                </div>
                <div className="rankings-results-item">
                  <div className="rankings-results-item-img" />
                  <div className="rankings-results-item-title">New York City, 10010<br /> <span style={{fontSize: '.8em', color: '#808080'}}>Population: 150,000</span></div>
                  <div className="rankings-results-item-rank">#8</div>
                </div>
                <div className="rankings-results-item">
                  <div className="rankings-results-item-img" />
                  <div className="rankings-results-item-title">New York City, 10010<br /> <span style={{fontSize: '.8em', color: '#808080'}}>Population: 150,000</span></div>
                  <div className="rankings-results-item-rank">#9</div>
                </div>
                <div className="rankings-results-item">
                  <div className="rankings-results-item-img" />
                  <div className="rankings-results-item-title">New York City, 10010<br /> <span style={{fontSize: '.8em', color: '#808080'}}>Population: 150,000</span></div>
                  <div className="rankings-results-item-rank">#10</div>
                </div>
                <div className="rankings-results-item">
                  <div className="load-more-btn">load more</div>
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
  return {
    auth: state.auth,
    client: state.client
    };
}
export default connect(mapStateToProps)(Rankings);