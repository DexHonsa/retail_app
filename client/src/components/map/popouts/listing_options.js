import React from 'react';
import Select from 'react-select';
import Client from '../../../scripts/myScript';
class ListingOptions extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      typeValue: "",
      forValue: "",
      sizeValue: "",
      typeItems: ["Industrial","Office","Retail"],
      forItems: ["Lease","Sub Lease", "Sale"],
      sizeItems: ["Under - 1,000 SF","1,000 - 2,500 SF", "2,500 - 5,000 SF","5,000 - 10,000 SF", "Over 10,000 SF"],

    }
  }
  componentDidMount() {
    var newTypeItems = [];
    var newForItems = [];
    var newSizeItems = [];
    var that = this;
    this.state.typeItems.forEach(function(item){
      var title = that.titleCase(item)
      newTypeItems.push({ value: item, label: title })
    })
    this.state.forItems.forEach(function(item){
      var title = that.titleCase(item)
      newForItems.push({ value: item, label: title })
    })
    this.state.sizeItems.forEach(function(item){
      var title = that.titleCase(item)
      newSizeItems.push({ value: item, label: title })
    })
    this.setState({
      typeItems : newTypeItems,
      forItems : newForItems,
      sizeItems : newSizeItems
    })


  }
  handleSelectTypeChange (value) {

      this.setState({ typeValue: value });
    }
    handleSelectSizeChange (value) {

        this.setState({ sizeValue: value });
      }
  handleSelectForChange (value) {

      this.setState({ forValue: value });
    }
    titleCase(str) {
        var str2 = str.replace(/_/g, ' ');
       var words = str2.toLowerCase().split(' ');

       for(var i = 0; i < words.length; i++) {
            var letters = words[i].split('');
            letters[0] = letters[0].toUpperCase();
            words[i] = letters.join('');
       }
       return words.join(' ');
  }


  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();
    var listingSelections = {type:this.state.typeValue, for:this.state.forValue,size:this.state.sizeValue};

      Client.updateListings(listingSelections);
    }


  render(){
    var typeOptions = this.state.typeItems;
    var forOptions = this.state.forItems;
    var sizeOptions = this.state.sizeItems;
    return(
      <div className="left-nav-popup">
        <div className="left-nav-popup-title" style={{textAlign: 'left'}}>Listing Options</div>
        <div className="listing-options-selector-container">
          <div className="listing-options-selector-item">
            <div className="listing-options-selector-title">Type</div>
            <div className="listing-options-selector-select">
              <Select simpleValue
                          placeholder="Select"
                          value={this.state.typeValue}
                          className="my-selector"
                          name="Type"
                          onChange={this.handleSelectTypeChange.bind(this)}
                          options={typeOptions}
                          clearable={true}

                      />
            </div>
          </div>
          <div className="listing-options-selector-item">
            <div className="listing-options-selector-title">For</div>
            <div className="listing-options-selector-select">
              <Select simpleValue
                          placeholder="Select"
                          value={this.state.forValue}
                          className="my-selector"
                          name="For"
                          onChange={this.handleSelectForChange.bind(this)}
                          options={forOptions}
                          clearable={true}

                      />
            </div>
          </div>
          <div className="listing-options-selector-item">
            <div className="listing-options-selector-title">Size</div>
            <div className="listing-options-selector-select">
              <Select simpleValue
                          placeholder="Select"
                          value={this.state.sizeValue}
                          className="my-selector"
                          name="Size"
                          onChange={this.handleSelectSizeChange.bind(this)}
                          options={sizeOptions}
                          clearable={true}

                      />
            </div>
          </div>

        </div>
        <div className="apply-filter-btn" onClick={this.handleFormSubmit.bind(this)} >Apply Filters </div>
      </div>
    );
  }
}
export default ListingOptions;
