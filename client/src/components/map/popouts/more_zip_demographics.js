import React from 'react';
import $ from 'jquery';
import {Bar, Pie} from 'react-chartjs-2';

class MoreZipDemographics extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			search : '',
			demographics : [],
			imgUrl : ''


		}
	}
	componentDidMount() {

		var that = this;
		$.ajax({
            type: "GET",
            url: '/api/getZipDemographics/' + this.props.zip ,
            success: function(data) {
            	var tempArr = [];
				var s = data.data[0];


				$.each(s,function(i,v){
					var i2 = i.replace( /([a-z])([A-Z])/g, "$1 $2");
					i2 = i2.replace(/Population/, "Population ");
					i2 = i2.replace(/to/, " - ");
					i2 = i2.replace( /([a-z])([0-9])/g, "$1 $2");
					i2 = i2.replace( /MSA/, "MSA ");
					i2 = i2.replace( /USD/, "USD ");
					i2 = i2.replace( /FIPS/, "FIPS ");
					i2 = i2.replace( /CSA/, "CSA ");
					i2 = i2.replace( /CBSA/, "CBSA ");
					i2 = i2.replace( /Mo - r/, "Motor");
					i2 = i2.replace( /Plus/, " Plus ");
					i2 = i2.replace( /plus/, " plus ");


					tempArr.push([i2,v]);
				});

                that.setState({
                  imgUrl: "https://maps.googleapis.com/maps/api/streetview?location=" + data.data[0].Latitude + "," + data.data[0].Longitude + "&size=400x400&key=AIzaSyBXkG_joIB9yjAP94-L6S-GLTWnj7hYmzs",
                  demographics: data.data[0]
                });

            },
            contentType: "application/json"
        });
	}

	onSearchChange(e){
		this.setState({
			search : e.target.value
		})

	}
	render() {
		// var chart    = this.refs.chart.getContext('2d');


		// var gradient = chart.createLinearGradient(0, 0, 0, 400);
		// 	gradient.addColorStop(0, 'rgba(250,174,50,1)');
		// 	gradient.addColorStop(1, 'rgba(250,174,50,0)');
		var incomeChart;
		var demographicValues;
       if(Object.keys(this.state.demographics).length > 0){
       	demographicValues = <div><div className="property-info-details">
			          <div className="detail-item">
			            <div className="detail-title">Total Businesses</div>
			            <div className="detail-value">{this.state.demographics.TotalNumberOfBusinesses.value}</div>
			          </div>
			          <div className="detail-item">
			            <div className="detail-title">Total Households</div>
			            <div className="detail-value">{this.state.demographics.TotalHouseholds.value}</div>
			          </div>
			          <div className="detail-item">
			            <div className="detail-title">Total Family Households</div>
			            <div className="detail-value">{this.state.demographics.FamilyHouseholds.value}</div>
			          </div>
			        </div>
			        <div className="property-info-details">
			          <div className="detail-item">
			            <div className="detail-title">Male Age Median</div>
			            <div className="detail-value">{this.state.demographics.MedianAgeMale.value}</div>
			          </div>
			          <div className="detail-item">
			            <div className="detail-title">Female Age Median</div>
			            <div className="detail-value">{this.state.demographics.MedianAgeFemale.value}</div>
			          </div>
			          <div className="detail-item">
			            <div className="detail-title">Household Income</div>
			            <div className="detail-value">${this.state.demographics.IncomePerHousehold.value}</div>
			          </div>
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

		// 	 var filteredDemographics
		var demographicsList;
		var demo = this.state.demographics;
		 if(Object.keys(this.state.demographics).length > 0){
			 //console.log(this.state.demographics);
				demographicsList = Object.keys(demo).map(function(item, i){
					var i2 = item.replace( /([a-z])([A-Z])/g, "$1 $2");
					i2 = i2.replace(/Population/, "Population ");
					i2 = i2.replace(/to/, " - ");
					i2 = i2.replace( /([a-z])([0-9])/g, "$1 $2");
					i2 = i2.replace( /MSA/, "MSA ");
					i2 = i2.replace( /USD/, "USD ");
					i2 = i2.replace( /FIPS/, "FIPS ");
					i2 = i2.replace( /CSA/, "CSA ");
					i2 = i2.replace( /CBSA/, "CBSA ");
					i2 = i2.replace( /Mo - r/, "Motor");
					i2 = i2.replace( /Plus/, " Plus ");
					i2 = i2.replace( /plus/, " plus ");

						if(demo[item].value != undefined){
							return <DemographicInfoItem key={i} title={i2} value={demo[item].value} />;
						}else{
							return <DemographicInfoItem key={i} title={i2} value={demo[item]} />;
						}


					},this)



		//  filteredDemographics = this.state.demographics.filter(
    //     (data) => {
		//
    //       return data[0].toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
    //     }
    //     );
		// 	}else{
		// 		filteredDemographics = [];
		 	}

		return(
				<div className="modal-overlay">
        <div className="add-demo-filter-popup-container">
          <div className="add-demo-filter-popup animated-slow fadeInUp" style={{width: '80%'}}>
            <div className="add-filter-title">More Demographics <i onClick={this.props.hideMoreZipDemographics} className="fa fa-close" /></div>
            <div className="add-filter-stage" style={{height: '70vh', width: '100%', position: 'relative', overflow: 'auto'}}>
              <div className="demographic-info-container">

                <div className="property-info-container">
			        <div className="property-img" style={{backgroundImage:'url('+this.state.imgUrl+')'}} />
			        <div className="property-info-title">{this.props.street} {this.props.city} {this.state.demographics.StateAbbreviation}, {this.state.demographics.ZipCode} </div>
			        <div className="property-info-details">
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
			        </div>
			        {demographicValues}
			        <div className="bottom-details">
			          <div className="bottom-detail-item">
			            PMSA: <span style={{color: '#808080', fontSize: '14pt'}}><br />{this.state.demographics.PMSA}</span>
			          </div>
			          <div className="bottom-detail-item">
			            MSA: <span style={{color: '#808080', fontSize: '14pt'}}><br />{this.state.demographics.MSA}</span>
			          </div>
			          <div className="bottom-detail-item">
			            CSA: <span style={{color: '#808080', fontSize: '14pt'}}><br />{this.state.demographics.CSA}</span>
			          </div>
			          <div className="bottom-detail-item">
			            CBSA: <span style={{color: '#808080', fontSize: '14pt'}}><br />{this.state.demographics.CBSA}</span>
			          </div>
			          <div className="bottom-detail-item">
			            CBSA: <span style={{color: '#808080', fontSize: '14pt'}}><br />{this.state.demographics.CBSA}</span>
			          </div>
			        </div>
			        <div className="bottom-img-details">
			          <div className="bottom-detail-item">
			            Latititude <span style={{color: '#808080', fontSize: '14pt'}}><br />{this.state.demographics.Latitude}</span>
			          </div>
			          <div className="bottom-detail-item">
			            Longitude: <span style={{color: '#808080', fontSize: '14pt'}}><br />{this.state.demographics.Longitude}</span>
			          </div>
			          {/*<div className="bottom-detail-item">
			            Altitude: <span style={{color: '#808080', fontSize: '14pt'}}><br />{this.state.demographics.Altitude}</span>
			          </div>*/}
			        </div>
			      </div>

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
                <div className="other-demographics">
                  <div style={{fontSize: '12pt', margin: 15}}>All Demographic Items</div>
                  <div className="demographic-info-search"><input onChange={this.onSearchChange.bind(this)} placeholder="Search" type="text" /></div>
                  <div className="demographic-list-container">
                    {demographicsList}
                  </div>
                </div>
              </div>
            </div>
            <div className="add-filter-footer"><div onClick={this.props.hideMoreZipDemographics} className="add-filter-close-btn">close</div></div>
          </div>
        </div>
      </div>


			);
	}
}

class DemographicInfoItem extends React.Component {
	render() {


	return(
		<div className="demographic-info-item animated fadeIn">
          <div className="demographic-info-title">{this.props.title}</div>
          <div className="demographic-info-value">{this.props.value}</div>
        </div>
		);
	}
}

export default MoreZipDemographics;
