import React from 'react';
import $ from 'jquery';
import icon from '../../../../images/ring-alt-small.svg';
import {Bar, Pie} from 'react-chartjs-2';

class MoreZipDemographics extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			search : '',
			demographics : [],
			imgUrl : "https://maps.googleapis.com/maps/api/streetview?location=" + this.props.latitude + "," + this.props.longitude + "&size=400x400&key=AIzaSyBXkG_joIB9yjAP94-L6S-GLTWnj7hYmzs"
			

		}
	}
	componentDidMount() {
		var that = this;
		$.ajax({
            type: "GET",
            url: 'http://demographicmarketing.net/api/demographics/demographicDataasjsonp?customerKey=4447e7ba&zipcode=' + this.props.zip ,
            success: function(data) {
            	var tempArr = [];
				var s = data.d[0];

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

                  demographics: tempArr
                });
            },
            dataType: "jsonp",
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
		
       
		var data = (canvas) => {
			 const ctx = canvas.getContext("2d")
       		 const gradient = ctx.createLinearGradient(0,100,0,0);
	       		 gradient.addColorStop(0, 'rgba(250,174,50,1)');   
			 	 gradient.addColorStop(1, 'rgba(250,174,50,0)');
       		 	return{
				labels: ["<5", "5-9", "10-14", "15-19", "20-24", "25-29", "30-34", "35-49", "50-54","55<"],
				datasets: [{
					label: 'Views',
					data: [ 1300, 2000, 3202, 3506, 2700, 2800, 2359, 1223, 1007, 723],
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
		var data2 = {
				labels: ["< 25k", "25k - 50k", "50k - 100k", "100k - 200k", "> 200k"],
				datasets: [{
					label: 'Views',
					data: [ 10, 20, 10, 10, 30],
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
		var data3 = {
				labels: ["College", "Highschool"],
				datasets: [{
					label: 'Views',
					data: [ 10, 100 ],
					backgroundColor: [
						"#FF6384",
						"#3B85C4",
						"#FFCE56"
					]
				}]
			};
		var data4 = {
				labels: ["White", "Black", "Mexican","Asian"],
				datasets: [{
					label: 'Views',
					data: [ 1000, 300, 122, 220 ],
					backgroundColor: [
						"#3B85C4",
						"#3765DB",
						"#37BBDB",
						"#34D1C6",
						
					]
				}]
			};

		var filteredDemographics = this.state.demographics.filter(
        (data) => {
        	
          return data[0].toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        }
        );
		var loadingImg;
        if(filteredDemographics.length == 0){
        	loadingImg = <div className="demo-loading-img" ><img src={icon} /></div>
        }else{
        	//loadingImg = null;
        }
		return(
				<div className="modal-overlay">
        <div className="add-demo-filter-popup-container">
          <div className="add-demo-filter-popup animated-slow fadeInUp" style={{width: '80%'}}>
            <div className="add-filter-title">More Demographics <i onClick={this.props.hideMoreZipDemographics} className="fa fa-close" /></div>
            <div className="add-filter-stage" style={{height: '70vh', width: '100%', position: 'relative', overflow: 'auto'}}>
              <div className="demographic-info-container">
               
                <div className="property-info-container">
			        <div className="property-img" />
			        <div className="property-info-title">12345 Maddison Ave San Francisco Ca, 92260</div>
			        <div className="property-info-details">
			          <div className="detail-item">
			            <div className="detail-title">County</div>
			            <div className="detail-value">QUEENS</div>
			          </div>
			          <div className="detail-item">
			            <div className="detail-title">County FIPS Code</div>
			            <div className="detail-value">081</div>
			          </div>
			          <div className="detail-item">
			            <div className="detail-title">Us Division</div>
			            <div className="detail-value">Middle Atlantic</div>
			          </div>
			        </div>
			        <div className="property-info-details">
			          <div className="detail-item">
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
			        </div>
			        <div className="property-info-details">
			          <div className="detail-item">
			            <div className="detail-title">Male Age Median</div>
			            <div className="detail-value">39.3</div>
			          </div>
			          <div className="detail-item">
			            <div className="detail-title">Female Age Median</div>
			            <div className="detail-value">41.9</div>
			          </div>
			          <div className="detail-item">
			            <div className="detail-title">Household Income</div>
			            <div className="detail-value">$51,336</div>
			          </div>
			        </div>
			        <div className="bottom-details">
			          <div className="bottom-detail-item">
			            PMSA: <span style={{color: '#808080', fontSize: '14pt'}}><br />5600</span>
			          </div>
			          <div className="bottom-detail-item">
			            MSA: <span style={{color: '#808080', fontSize: '14pt'}}><br />5602</span>
			          </div>
			          <div className="bottom-detail-item">
			            CSA: <span style={{color: '#808080', fontSize: '14pt'}}><br />408</span>
			          </div>
			          <div className="bottom-detail-item">
			            CBSA: <span style={{color: '#808080', fontSize: '14pt'}}><br />35620</span>
			          </div>
			          <div className="bottom-detail-item">
			            CBSA: <span style={{color: '#808080', fontSize: '14pt'}}><br />35620</span>
			          </div>
			        </div>
			        <div className="bottom-img-details">
			          <div className="bottom-detail-item">
			            Latititude <span style={{color: '#808080', fontSize: '14pt'}}><br />47.53424234</span>
			          </div>
			          <div className="bottom-detail-item">
			            Longitude: <span style={{color: '#808080', fontSize: '14pt'}}><br />-101.123521</span>
			          </div>
			          <div className="bottom-detail-item">
			            Altitude: <span style={{color: '#808080', fontSize: '14pt'}}><br />5600</span>
			          </div>
			        </div>
			      </div>

                <div style={{display: 'flex', alignItems: 'center', borderBottom: 'solid 1px #e0e0e0'}}>
                  <div className="chart-1-container" style={{padding: 15, flex: 2}}>
                    <div className="graph-1-title" style={{textAlign: 'center'}}>Age Separation</div>
                    <div style={{width: '100%', position: 'relative', padding: 15}}>
                      <Bar
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
											return label/1000+'k';
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
			           />
                    </div>
                  </div>
                  <div className="chart-1-container" style={{padding: 15, flex: 2}}>
                    <div className="graph-1-title" style={{textAlign: 'center'}}>Income Range</div>
                    <div style={{width: '100%', position: 'relative', padding: 15}}>
                      <Bar
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
											return label/1000+'k';
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
			           />
                    </div>
                  </div>
                  <div className="chart-1-container" style={{padding: 15, flex: 1}}>
                    <div className="graph-1-title" style={{textAlign: 'center'}}>Education</div>
                    <div style={{width: '100%', position: 'relative', padding: 15}}>
                      <Pie
			            data={data3}
			            width={100}
			            height={300}
			            options={{
							"legend": {
								"display":true,
								"position" : 'right'
							},
							"responsive" : true,
							"maintainAspectRatio": false,
							
						}}
			           />
                    </div>
                  </div>
                  <div className="chart-1-container" style={{padding: 15, flex: 1}}>
                    <div className="graph-1-title" style={{textAlign: 'center'}}>Race Distribution</div>
                    <div style={{width: '100%', position: 'relative', padding: 15}}>
                      <Pie
			            data={data4}
			            width={100}
			            height={300}
			            options={{
							"legend": {
								"display":true,
								"position" : 'right'
							},
							"responsive" : true,
							"maintainAspectRatio": false,
							
						}}
			           />
                    </div>
                  </div>
                </div>
                <div className="other-demographics">
                  <div style={{fontSize: '12pt', margin: 15}}>All Demographic Items</div>
                  <div className="demographic-info-search"><input onChange={this.onSearchChange.bind(this)} placeholder="Search" type="text" /></div>
                  <div className="demographic-list-container">
                    {filteredDemographics.map(function(data,i){
			                	return <DemographicInfoItem key={i} title={data[0]} value={data[1]} />;
			                },this)}
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