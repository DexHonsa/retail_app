import React from 'react';
import $ from 'jquery';
import icon from '../../../../images/ring-alt-small.svg';

class MoreZipDemographics extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			search : '',
			demographics : []
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
			          <div className="add-demo-filter-popup" style={{width: '80%'}}>
			            <div className="add-filter-title">More Demographics <i onClick={this.props.hideMoreZipDemographics} className="fa fa-close" /></div>
			            <div className="add-filter-stage" style={{height: '70vh', overflow: 'auto'}}>
			              <div className="demographic-info-container">
			                <div className="demographic-info-search"><input onChange={this.onSearchChange.bind(this)} placeholder="Search" type="text" /></div>

			                {loadingImg}
			               
			                {filteredDemographics.map(function(data,i){
			                	return <DemographicInfoItem key={i} title={data[0]} value={data[1]} />;
			                },this)}
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