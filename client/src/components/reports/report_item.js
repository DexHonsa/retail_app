import React from 'react';
import {Bar, Pie} from 'react-chartjs-2';
import $ from 'jquery';
import axios from 'axios';
import {connect} from 'react-redux';

class ReportItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			demographics : [],
			imgUrl : "https://maps.googleapis.com/maps/api/streetview?location=" + this.props.latitude + "," + this.props.longitude + "&size=400x400&key=AIzaSyBXkG_joIB9yjAP94-L6S-GLTWnj7hYmzs",
			twitterFeed: [],
			associatedUsers:[],
			searchId: this.props.id
		}
	}
	componentDidMount() {
		this.getTwitterFeed();
		var that = this;
		$.ajax({
            type: "GET",
            url: '/api/getZipDemographics/' + this.props.zip ,
            success: function(data) {
            	var tempArr = [];
				var s = data.data[0];
                that.setState({
                  demographics: data.data[0]
                });
            },
            contentType: "application/json"
        });
        this.getUsers(this.props.client.clientId);

	}
	componentWillReceiveProps(nextProps) {
		this.getUsers(nextProps.client.clientId);
		this.setState({
			searchId: nextProps.id
		})
	}
	getUsers(clientId){
		var this2 =this;
		axios.get('/api/getAssociatedUsers/' + clientId).then(function(res){
			console.log(res.data.data);
			this2.setState({
				associatedUsers: res.data.data
			})
		})
	}
	getTwitterFeed(){
    var this2 = this;

    axios.get('/api/twitter/' + this.props.longitude + "/" + this.props.latitude).then(function(res){

      this2.setState({
        twitterFeed : res.data.tweets.statuses
      })

    })
  }

	onSearchChange(e){
		this.setState({
			search : e.target.value
		})

	}
	render(){
		var incomeChart;
		var demographicValues;
		var twitterItems;
		var userBadges;
		if(Object.keys(this.state.associatedUsers).length >0){
			userBadges = this.state.associatedUsers.map(function(data, i){

				var count;

				if(data.views[this.state.searchId] === undefined){
					count = 0;
				}else{
					count = data.views[this.state.searchId];
				}

				return <div key={i} className="user-like-item">
				        <div className="user-like-img" style={{backgroundImage : 'url('+data.user_img_path+')'}} />
				        <div className="user-like-title">{data.first_name + ' ' + data.last_name}<br /><span style={{fontSize: '.8em'}}>{count} <i className="fa fa-eye" /></span></div>
				      </div>;

			},this)
		}
		if(Object.keys(this.state.twitterFeed).length>0){
			twitterItems = this.state.twitterFeed.map(function(data, i){
				return <div key={i} className="report-item-social-item">
                  <div className="report-item-social-inner">
                    <div className="report-item-social-item-img" style={{backgroundImage: 'url(' + data.user.profile_image_url + ')'}} />
                    <div className="report-item-social-item-name">{data.user.name}<br /><span style={{color: '#808080', fontSize: '.8em'}}>@{data.user.screen_name}</span><i className="fa fa-twitter" /></div>
                    <div className="report-item-social-item-body">{data.text}</div>
                  </div>
                </div>;
			})
		}
       if(Object.keys(this.state.demographics).length > 0){
       	demographicValues = <div className="property-info-details" style={{width: '100%'}}><div className="detail-item">
                  <div className="detail-title">Total Businesses</div>
                  <div className="detail-value">219</div>
                </div>
                <div className="detail-item">
                  <div className="detail-title">Total Households</div>
                  <div className="detail-value">7,654</div>
                </div>
                <div className="detail-item">
                  <div className="detail-title">Total Family Households</div>
                  <div className="detail-value">5705</div>
                </div>
                <div className="detail-item">
                  <div className="detail-title">Male Age Median</div>
                  <div className="detail-value">39.3</div>
                </div>
                <div className="detail-item">
                  <div className="detail-title">Female Age Median</div>
                  <div className="detail-value">41.9</div>
                </div></div>;

       	var data2 = {

				labels: ["< 25k", "25k - 50k", "50k - 100k", "100k - 200k", "> 200k"],
				datasets: [{
					label: 'Percent',
					data: [ parseFloat(this.state.demographics.IncomeLessThan25.value),  parseFloat(this.state.demographics.IncomeBetween25to50.value),  parseFloat(this.state.demographics.IncomeBetween50to100.value),  parseFloat(this.state.demographics.IncomeBetween100to200.value),  parseFloat(this.state.demographics.IncomeGreater200.value)],
					backgroundColor: '#2BD17C',
					borderColor: 'rgba(47,155,255,0.00)',
					pointBorderWidth:1,
					pointRadius:3,
					pointBackgroundColor:'rgba(47,155,255,1.00)',
					borderWidth: 3,
					pointHoverRadius:7,
					pointHitRadius: 15
				}]
			};
			incomeChart = <Bar
			            data={data2}
			            width={100}
			            height={300}
			            options={{
							"legend": {
								"display":false
							},
							"responsive" : true,
							"maintainAspectRatio": false,
							"scales": {
								"yAxes": [{
									"gridLines": {
										"color": "rgba(0, 0, 0, 0)",
									},
									"ticks": {
										"beginAtZero":true,
										"callback": function(label, index, labels) {
											return parseInt(label*100)+'%';
										}
									},

								}],
								"xAxes": [{
									"gridLines": {
										color: "rgba(0, 0, 0, 0)",
									}

								}]
							}
						}}
			           />;
			           //agechart
			           var ageChart;
		var data = (canvas) => {
			 const ctx = canvas.getContext("2d")
       		 const gradient = ctx.createLinearGradient(0,100,0,0);
	       		 gradient.addColorStop(0, 'rgba(250,174,50,1)');
			 	 gradient.addColorStop(1, 'rgba(250,174,50,0)');
       		 	return{
				labels: [ "5-9", "10-14", "15-19", "20-24", "25-29", "30-34", "35-39", "40-44", "45-49", "50-54","55<"],
				datasets: [{
					label: 'Views',
					data: [  this.state.demographics.Population5to9.value, this.state.demographics.Population10to14.value, this.state.demographics.Population15to19.value, this.state.demographics.Population20to24.value,
					 this.state.demographics.Population25to29.value, this.state.demographics.Population30to34.value, this.state.demographics.Population35to39.value, this.state.demographics.Population40to44.value, this.state.demographics.Population45to49.value,
					 this.state.demographics.Population50to54.value,this.state.demographics.Population62Plus.value],
					backgroundColor: gradient,
					borderColor: 'rgba(47,155,255,0.00)',
					pointBorderWidth:1,
					pointRadius:3,
					pointBackgroundColor:'rgba(47,155,255,1.00)',
					borderWidth: 3,
					pointHoverRadius:7,
					pointHitRadius: 15
				}]}
			};
		ageChart = <Bar
                      	ref="chart"
			            data={data}
			            width={100}
			            height={300}
			            options={{
							"legend": {
								"display":false
							},
							"responsive" : true,
							"maintainAspectRatio": false,
							"scales": {
								"yAxes": [{
									"gridLines": {
										"color": "rgba(0, 0, 0, 0)",
									},
									"ticks": {
										"beginAtZero":true,
										"callback": function(label, index, labels) {
											return Math.round(parseInt(label/1000) * 100) /100 +'k';
										}
									},

								}],
								"xAxes": [{
									"gridLines": {
										color: "rgba(0, 0, 0, 0)",
									}

								}]
							}
						}}
			           />;
			           //education chart
			           var educationChart;

						var data3 = {
								labels: ["Bachelors or Greater", "Highschool Graduate"],
								datasets: [{
									label: 'Views',
									data: [ this.state.demographics.EducationBachelorOrGreater.value,Math.round(parseFloat(1-this.state.demographics.EducationBachelorOrGreater.value) * 100) / 100 ],
									backgroundColor: [
										"#FF6384",
										"#3B85C4",
										"#FFCE56"
									]
								}]
							};
							educationChart = <Pie
							            data={data3}
							            width={100}
							            height={300}
							            options={{
											"legend": {
												"display":false,
												"position" : 'right'
											},
											"responsive" : true,
											"maintainAspectRatio": false,

										}}
							           />;
							           //race chart
							           var raceChart;
										var data4 = {
												labels: ["White", "Black", "Hispanic","Asian"],
												datasets: [{
													label: 'Views',
													data: [ this.state.demographics.WhitePopulation.value,this.state.demographics.BlackPopulation.value,this.state.demographics.HispanicPopulation.value,this.state.demographics.AsianPopulation.value ],
													backgroundColor: [
														"#3B85C4",
														"#3765DB",
														"#37BBDB",
														"#34D1C6",

													]
												}]
											};
											raceChart = <Pie
											            data={data4}
											            width={100}
											            height={300}
											            options={{
															"legend": {
																"display":false,
																"position" : 'right'
															},
															"responsive" : true,
															"maintainAspectRatio": false,

														}}
											           />;

       }





		return(
			<div className="report-container">
        <div className="report-item">
          <div className="report-item-top">
            <div className="report-item-details">
              <div>{this.props.street} {this.props.city} </div><span style={{fontSize: '.8em', color: '#808080'}}><div className="send-report-btn">Email Report</div></span>
              <div className="report-item-user-likes">
              {userBadges}
                {/*<div className="user-like-item">
                  <div className="user-like-img" />
                  <div className="user-like-title"><i className="fa fa-thumbs-up" /> Derick Bradly</div>
                </div>
                <div className="user-like-item">
                  <div className="user-like-img" />
                  <div className="user-like-title"><i className="fa fa-thumbs-up" /> Neel Naicker</div>
                </div>
                <div className="user-like-item">
                  <div className="user-like-img" />
                  <div className="user-like-title"><i className="fa fa-thumbs-up" /> Austin Johnson</div>
                </div>
                <div className="user-like-item">
                  <div className="user-like-img" />
                  <div className="user-like-title"><i className="fa fa-thumbs-up" /> Brad Guthry</div>
                </div>*/}
              </div>

            </div>
            <div className="report-item-img" style={{backgroundImage:'url('+this.state.imgUrl+')'}} />
          </div>
          <div className="report-item-details">
            <div style={{display: 'flex', alignItems: 'center', borderBottom: 'solid 1px #e0e0e0'}}>
                  <div className="chart-1-container" style={{padding: 15, flex: 2}}>
                    <div className="graph-1-title" style={{textAlign: 'center'}}>Age Separation</div>
                    <div style={{width: '100%', position: 'relative', padding: 15}}>
                      {ageChart}
                    </div>
                  </div>
                  <div className="chart-1-container" style={{padding: 15, flex: 2}}>
                    <div className="graph-1-title" style={{textAlign: 'center'}}>Income Range</div>
                    <div style={{width: '100%', position: 'relative', padding: 15}}>
                      {incomeChart}
                    </div>
                  </div>
                  <div className="chart-1-container" style={{padding: 15, flex: 1}}>
                    <div className="graph-1-title" style={{textAlign: 'center'}}>Education</div>
                    <div style={{width: '100%', position: 'relative', padding: 15}}>
                      {educationChart}
                    </div>
                  </div>
                  <div className="chart-1-container" style={{padding: 15, flex: 1}}>
                    <div className="graph-1-title" style={{textAlign: 'center'}}>Race Distribution</div>
                    <div style={{width: '100%', position: 'relative', padding: 15}}>
                      {raceChart}
                    </div>
                  </div>
            </div>
            <div className="report-item-demographics">
              <div className="report-item-title-header">Demographic Information</div>
              <div className="property-info-details" style={{width: '100%'}}>
                <div className="detail-item">
                  <div className="detail-title">County</div>
                  <div className="detail-value">{this.state.demographics.County}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-title">County FIPS Code</div>
                  <div className="detail-value">{this.state.demographics.CountyFIPSCode}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-title">Us Division</div>
                  <div className="detail-value">{this.state.demographics.USDivision}</div>
                </div>
                <div className="detail-item">
                  {/*<div className="detail-title">Us Division</div>
                  <div className="detail-value">Middle Atlantic</div>*/}
                </div>
                <div className="detail-item">
                  {/*<div className="detail-title">Us Division</div>
                  <div className="detail-value">Middle Atlantic</div>*/}
                </div>
              </div>

              {demographicValues}


            </div>
            <div className="report-item-social">
              <div className="report-item-title-header">Social Information</div>
              <div className="report-item-social-row">
                {twitterItems}

              </div>
            </div>
            {/*<div className="report-item-activity">
              <div className="report-item-title-header">Recent Activity</div>
              <div className="activity-item">
                <div className="activity-item-user-img" />
                <div className="activity-item-title">Derrick Bradley<br /><span style={{fontSize: '.8em', color: '#808080'}}>Admin</span></div>
                <div className="activity-item-desc">Liked this Property</div>
                <div className="activity-item-time-ago">2 days ago</div>
              </div>
              <div className="activity-item">
                <div className="activity-item-user-img" />
                <div className="activity-item-title">Derrick Bradley<br /><span style={{fontSize: '.8em', color: '#808080'}}>Admin</span></div>
                <div className="activity-item-desc">Added property</div>
                <div className="activity-item-time-ago">3 days ago</div>
              </div>
              <div className="activity-item">
                <div className="activity-item-user-img" />
                <div className="activity-item-title">Derrick Bradley<br /><span style={{fontSize: '.8em', color: '#808080'}}>Admin</span></div>
                <div className="activity-item-desc">Liked this Property</div>
                <div className="activity-item-time-ago">2 days ago</div>
              </div>
              <div className="activity-item">
                <div className="activity-item-user-img" />
                <div className="activity-item-title">Derrick Bradley<br /><span style={{fontSize: '.8em', color: '#808080'}}>Admin</span></div>
                <div className="activity-item-desc">Liked this Property</div>
                <div className="activity-item-time-ago">2 days ago</div>
              </div>
            </div>*/}
          </div>
        </div>
      </div>

			);
	}
}

function mapStateToProps(state){
  return {
    auth: state.auth,
    client: state.client
  };
}
export default connect(mapStateToProps)(ReportItem);
