import React from 'react';
import {Bar} from 'react-chartjs-2';




class ZipDemographics extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			on : true,
			zipDemographicItems : this.props.zipDemographicItems,
			data : {
				  labels: ['White', 'Black', 'Hispanic', 'Asian'],
				  datasets: [
				    {

				      backgroundColor: 'rgba(70,157,245,1.00)',
				      borderColor: 'rgba(70,157,245,1.00)',
				      borderWidth: 1,
				      hoverBackgroundColor: 'rgba(48,128,232,1.00)',
				      hoverBorderColor: 'rgba(48,128,232,1.00)',
				      data: [this.props.zipDemographicItems.WhitePopulation.value, this.props.zipDemographicItems.BlackPopulation.value, this.props.zipDemographicItems.HispanicPopulation.value, this.props.zipDemographicItems.AsianPopulation.value]
				    }
				  ]
				}
		}
	}
	componentDidMount() {

	}
	format(x) {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
		        <div className="zip-code-label"><span style={{fontSize:'14pt'}}>Zip Code</span><br />{this.props.zip}</div>
		        <div className="zip-code-demo-list">
		          <div className="zip-code-demo-item">
		            <div className="zip-code-demo-title">Total Households</div>
		            <div className="zip-code-demo-value">{this.format(this.state.zipDemographicItems.TotalHouseholds.value)}</div>
		          </div>
		          <div className="zip-code-demo-item">
		            <div className="zip-code-demo-title">Total Number Of Businesses</div>
		            <div className="zip-code-demo-value">{this.format(this.state.zipDemographicItems.TotalNumberOfBusinesses.value)}</div>
		          </div>
		          <div className="zip-code-demo-item">
		            <div className="zip-code-demo-title">Income Per Household</div>
		            <div className="zip-code-demo-value">${this.format(this.state.zipDemographicItems.IncomePerHousehold.value)}</div>
		          </div>
		          <div className="zip-code-demo-item">
		            <div className="zip-code-demo-title">Median Age</div>
		            <div className="zip-code-demo-value">{this.state.zipDemographicItems.MedianAge.value}</div>
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
