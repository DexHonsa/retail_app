import React from 'react';
import {Bar} from 'react-chartjs-2';




class ZipDemographics extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			on : true,
			zipDemographicItems : this.props.zipDemographicItems,
			data : {
				  labels: ['White', 'Black', 'Mexican', 'Asian'],
				  datasets: [
				    {
				     
				      backgroundColor: 'rgba(70,157,245,1.00)',
				      borderColor: 'rgba(70,157,245,1.00)',
				      borderWidth: 1,
				      hoverBackgroundColor: 'rgba(48,128,232,1.00)',
				      hoverBorderColor: 'rgba(48,128,232,1.00)',
				      data: [this.props.zipDemographicItems.WhitePopulation, this.props.zipDemographicItems.BlackPopulation, this.props.zipDemographicItems.HispanicPopulation, this.props.zipDemographicItems.AsianPopulation]
				    }
				  ]
				}
		}
	}
	componentDidMount() {
		
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			zipDemographicItems : nextProps.zipDemographicItems
		})
	}
	render() {
		
		return(
			<div className="zip-code-popup">
		        <div className="zip-code-top">Zip Code Demographics</div>
		        <div className="zip-code-label">{this.props.zip}</div>
		        <div className="zip-code-demo-list">
		          <div className="zip-code-demo-item">
		            <div className="zip-code-demo-title">Total Households</div>
		            <div className="zip-code-demo-value">{this.state.zipDemographicItems.TotalHouseholds}</div>
		          </div>
		          <div className="zip-code-demo-item">
		            <div className="zip-code-demo-title">Total Number Of Businesses</div>
		            <div className="zip-code-demo-value">{this.state.zipDemographicItems.TotalNumberOfBusinesses}</div>
		          </div>
		          <div className="zip-code-demo-item">
		            <div className="zip-code-demo-title">Income Per Household</div>
		            <div className="zip-code-demo-value">{this.state.zipDemographicItems.IncomePerHousehold}</div>
		          </div>
		          <div className="zip-code-demo-item">
		            <div className="zip-code-demo-title">Median Age</div>
		            <div className="zip-code-demo-value">{this.state.zipDemographicItems.MedianAge}</div>
		          </div>
		          {/*<div className="zip-code-demo-item">
		            <div className="zip-code-demo-title">White Population</div>
		            <div className="zip-code-demo-value">{this.state.zipDemographicItems.WhitePopulation}</div>
		          </div>
		          <div className="zip-code-demo-item">
		            <div className="zip-code-demo-title">Black Population</div>
		            <div className="zip-code-demo-value">{this.state.zipDemographicItems.BlackPopulation}</div>
		          </div>
		          <div className="zip-code-demo-item">
		            <div className="zip-code-demo-title">Hispanic Population</div>
		            <div className="zip-code-demo-value">{this.state.zipDemographicItems.HispanicPopulation}</div>
		          </div>
		          <div className="zip-code-demo-item">
		            <div className="zip-code-demo-title">Asian Population</div>
		            <div className="zip-code-demo-value">{this.state.zipDemographicItems.AsianPopulation}</div>
		          </div>*/}
		          <div style={{padding:'10px'}}>
		          <Bar
			          data={this.state.data}
			          width={100}
			          height={80}
			          
			          options={{
			            maintainAspectRatio: true,
			            legend : {
			            	display: false
			            }
			          }}
			        />
			        </div>
		        </div>
		        <div onClick={this.props.showMoreZipDemographics} className="get-more-demographics-btn">Get More Demographics</div>
      		</div>

			);
	}
}
export default ZipDemographics;