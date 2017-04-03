import React from 'react';
import Client from '../../../scripts/myScript';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const items = ["accounting",
                      "airport",
                      "amusement_park",
                      "aquarium",
                      "art_gallery",
                      "atm",
                      "bakery",
                      "bank",
                      "bar",
                      "beauty_salon",
                      "bicycle_store",
                      "book_store",
                      "bowling_alley",
                      "bus_station",
                      "cafe",
                      "campground",
                      "car_dealer",
                      "car_rental",
                      "car_repair",
                      "car_wash",
                      "casino",
                      "cemetery",
                      "church",
                      "city_hall",
                      "clothing_store",
                      "convenience_store",
                      "courthouse",
                      "dentist",
                      "department_store",
                      "doctor",
                      "electrician",
                      "electronics_store",
                      "embassy",
                      "fire_station",
                      "florist",
                      "funeral_home",
                      "furniture_store",
                      "gas_station",
                      "gym",
                      "hair_care",
                      "hardware_store",
                      "hindu_temple",
                      "home_goods_store",
                      "hospital",
                      "insurance_agency",
                      "jewelry_store",
                      "laundry",
                      "lawyer",
                      "library",
                      "liquor_store",
                      "local_government_office",
                      "locksmith",
                      "lodging",
                      "meal_delivery",
                      "meal_takeaway",
                      "mosque",
                      "movie_rental",
                      "movie_theater",
                      "moving_company",
                      "museum",
                      "night_club",
                      "painter",
                      "park",
                      "parking",
                      "pet_store",
                      "pharmacy",
                      "physiotherapist",
                      "plumber",
                      "police",
                      "post_office",
                      "real_estate_agency",
                      "restaurant",
                      "roofing_contractor",
                      "rv_park",
                      "school",
                      "shoe_store",
                      "shopping_mall",
                      "spa",
                      "stadium",
                      "storage",
                      "store",
                      "subway_station",
                      "synagogue",
                      "taxi_stand",
                      "train_station",
                      "transit_station",
                      "travel_agency",
                      "university",
                      "veterinary_care",
                      "zoo"];


class PoiPopout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
      poi_items : items,
      poi_item_data : [],
      search : "",
      value: ""
    }
  }
	
  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  }
  componentDidMount() {
    var newArray = [];
    var that = this;
    items.forEach(function(item){
      var title = that.titleCase(item)
      newArray.push({ value: item, label: title })
    })
    this.setState({
      poi_item_data : newArray
    })
    Client.removePois();
    
  }


  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  }

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();
    var poiFilterSelections;
    if(this.state.value.length === 0){
      poiFilterSelections = null;
      this.props.removePois();
      this.props.setPoiFilters(poiFilterSelections);
    }else{
      console.log([this.state.value]);
      poiFilterSelections = [this.state.value];
      this.props.setPoiFilters(poiFilterSelections);
      Client.getMapPois(poiFilterSelections);
    }
    
   
    
    

   
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

  
    
    

  
handleSelectChange (value) {
    console.log('You\'ve selected:', value);
    this.setState({ value });
  }
  


	render() {
    

    var poiData = this.state.poi_item_data;
		return (
				 <div className="left-nav-popup">
                    <div className="left-nav-popup-title">POIs <i className="fa fa-life-saver" /></div>
                    <div className="left-nav-popup-tabs">
                      <div className="left-nav-popup-tab">By Name</div>
                      <div className="left-nav-popup-tab active">By Category</div>
                    </div>
                    <Select.Creatable multi simpleValue
                                placeholder="Select POI's"
                                value={this.state.value}
                                className="my-selector"
                                name="Pois"
                                onChange={this.handleSelectChange.bind(this)}
                                options={poiData}
                                clearable={true}
                                
                            />
                    
                    
                    <div className="apply-filter-btn" onClick={this.handleFormSubmit.bind(this)} >Apply Filters </div>
                  </div>
			);
	}
}

export default PoiPopout;