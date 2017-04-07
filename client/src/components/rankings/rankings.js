import React from 'react';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';
import $ from 'jquery';
import spinner from '../../../images/loading.gif';
import { Link } from 'react-router';

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
      resultsInfo: [],
      resultsDone: false
    }
  }
  componentDidMount() {
    this.setState({
      results:[],
      resultsInfo:[],
      results: []
    });
    this.getClientSearches(this.props.auth.user.id, this.props.client.clientId, this.state.field);
    this.getRankingsResults(this.props.route.field);
  }
  componentWillReceiveProps(nextProps) {
    var this2 = this;
    if(nextProps.client.clientId !== this.state.clientId){
      this2.setState({
        clientName: nextProps.client.clientName,
        clientId: nextProps.client.clientId,
      })
      this2.getRankingsResults(this2.state.field);
      this2.getClientSearches(this2.props.auth.user.id, nextProps.client.clientId, this2.state.field);


    }
    if(this.state.field !== nextProps.route.field){
    this.setState({
       field: nextProps.route.field,
      results: [],
      resultsInfo:[],
      resultsDone:false,
      clientSearchesRankings: []
    })
    this2.getClientSearches(this2.props.auth.user.id, this2.props.client.clientId, nextProps.route.field);
    
    this.getRankingsResults(nextProps.route.field);
 }
    
    
    
  }

  getResultsDetails(zipCode, callback){
    $.ajax({
        type: 'GET',
        url: '/api/geocoder/' + zipCode,
        async : true,
        success: function(res){
          
          var parse = JSON.parse(res.body);
         
          var address = parse.results[0].formatted_address;
          callback(address);
        }
      })
  }
  getResultsInfo(field){
    var this2 = this;
    var resultsInfo = [];
    this.state.results.forEach(function(item, i){
      var address = '';
      //var img_path = "https://maps.googleapis.com/maps/api/streetview?location=" + item.Latitude + "," + item.Longitude + "&size=400x400&key=AIzaSyBXkG_joIB9yjAP94-L6S-GLTWnj7hYmzs";
      var value = item[field].value;
      var city = item.City;
      var state = item.StateAbbreviation;
      var zip = item.ZipCode;
     
       resultsInfo[i] = {
         // "img": img_path,
          "value":value,
          "address" : city + ', ' + state + ' ' + zip,
          "field" : field
        }
      var newArray = this2.state.resultsInfo.slice();
      newArray.push(resultsInfo);
      this2.setState({
        resultsInfo: newArray
      });
      if(i === 9){
        
        this2.setState({
          resultsDone: true
        })
       
        
      }
    })
  }
  getClientSearches(userId, clientId, field){
    var this2 = this;
    axios.get('/api/searches/' + userId + '/' + clientId).then(function(res){
      var zipArray = [];
      res.data.forEach(function(item){
        zipArray.push(item.zip);
      })
      this2.setState({
        clientSearches:res.data,
        zips: zipArray
      })
      this2.getClientSearchesRankings(zipArray, field);
    })
  }
  getRankingsResults(field){
    var this2 = this;
    axios.get('/api/rankings/' + field).then(function(res){
      this2.setState({
        results: res.data.data
      })
      this2.getResultsInfo(field);
     
    })
    
    
  }
  getClientSearchesRankings(zips, field){
    var this2 = this;
    axios.post('/api/getSearchRankings', {'zips': zips, 'field': field }).then(function(res){
    
      this2.setState({
        clientSearchesRankings: res.data.data
      })
    
    })

  }
	render(){
    var results;
      if(this.state.resultsDone){

        results = this.state.results.map(function(data, i){
                                
                               return <div key={i} className="rankings-results-item animated fadeInUp">
                                  
                                  <div className="rankings-results-item-title"><Link to={'/map/' + data.ZipCode}>{this.state.resultsInfo[i][i].address}</Link><br /> <span style={{fontSize: '.8em', color: '#808080'}}>{this.state.resultsInfo[i][i].field}: {this.state.resultsInfo[i][i].value} </span></div>
                                  <div className="rankings-results-item-rank">#{i+1}</div>
                                </div>
                              },this)
        
      }else{

        results = <div><img style={{width: 35}} src={spinner} /></div>;
      }

      var clientResults;

      //console.log(this.state.clientSearchesRankings.length);
      if(this.state.clientSearchesRankings.length !== 0){

        clientResults = this.state.clientSearches.map(function(item, i){
               if(i == 0){
                return (
                  <div key={i}>
                  <div className="rankings-saved-searches-title">{this.state.clientName} Saved Searches</div>
                  <div className="ranking-search-item animated fadeInUp">
                        <div className="ranking-search-item-img" style={{backgroundImage: 'url('+item.imgUrl+')'}} />
                        <div className="ranking-search-item-title">{item.street}<br /><span style={{fontSize: '.8em', color: '#aeaeae'}}>{item.city}</span></div>
                        <div className="ranking-search-item-rank">Rank<br /> <span style={{fontSize: '12pt', color: '#3080e8'}}>#{this.state.clientSearchesRankings[i][this.state.field].rank}</span></div>
                        <div className="ranking-search-item-rank">Value<br /> <span style={{fontSize: '12pt', color: '#3080e8'}}>{this.state.clientSearchesRankings[i][this.state.field].value}</span></div>
                  </div>
                  </div>);
              }else{
                  return (
                  <div key={i}>
                  
                  <div className="ranking-search-item animated fadeInUp">
                        <div className="ranking-search-item-img" style={{backgroundImage: 'url('+item.imgUrl+')'}} />
                        <div className="ranking-search-item-title">{item.street}<br /><span style={{fontSize: '.8em', color: '#aeaeae'}}>{item.city}</span></div>
                        <div className="ranking-search-item-rank">Rank<br /> <span style={{fontSize: '12pt', color: '#3080e8'}}>#{this.state.clientSearchesRankings[i][this.state.field].rank}</span></div>
                        <div className="ranking-search-item-rank">Value<br /> <span style={{fontSize: '12pt', color: '#3080e8'}}>{this.state.clientSearchesRankings[i][this.state.field].value}</span></div>
                  </div>
                  </div>);
               }
                },this)
        
      }else{

        clientResults = <div className="rankings-saved-searches-title">Select a Client</div>;
      }

      
		return(
			<main className="main">
        <div className="main-wrapper" style={{textAlign: 'center', position: 'relative'}}>
          <div className="container" style={{background: '#fff', boxShadow: '1px 1px 3px rgba(0,0,0,0.2)', padding: 0, paddingBottom: 150}}>
            <div className="retail-tabs">
           
              <Link to="/rankings/population" data-tab-label="clients" className="retail-tab" activeClassName="active">Population</Link>
              <Link to="/rankings/households" data-tab-label="clients" className="retail-tab" activeClassName="active">Households</Link>
              <Link to="/rankings/income" data-tab-label="users" className="retail-tab" activeClassName="active">Household Income</Link>
              <Link to="/rankings/education" data-tab-label="users" className="retail-tab" activeClassName="active">Education</Link>
              <div data-tab-label="users" className="retail-tab">Custom</div>
            </div>
            {/*Rankings*/}
            <div>
              <div className="rankings-saved-searches">
                
                {clientResults}
                
              </div>
              <div className="rankings-results">

                {results}
                
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