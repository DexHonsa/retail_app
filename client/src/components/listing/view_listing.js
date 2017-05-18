import React from 'react';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';

class ViewListing extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      size:'',
      floor:'',
      unitNumber:'',
      yearBuilt:'',
      buildingSize:'',
      buildingClass:'',
      buildingType:'',
      tenancy:'',
      address:{},
      description:'',
      price:'',
      organization:'',
      contacts:[]


    }
  }
  componentDidMount(){
    var listingId = this.props.params.id;
    var this2 = this;
    axios.get('https://api.realmassive.com/spaces/' + listingId).then(function(res){
      console.log(res.data.data);
      this2.setState({
        size:Math.round(res.data.data.attributes.space_size.value),
        floor:res.data.data.attributes.floor_number,
        unitNumber: res.data.data.attributes.unit_number,
        description:res.data.data.attributes.description
      })
      //console.log(res);
      axios.get('https://api.realmassive.com' + res.data.data.relationships.buildings.links.related).then(function(res2){
        console.log(res2.data.data);
        if('year_built' in res2.data.data.attributes){
          this2.setState({
          yearBuilt:res2.data.data.attributes.year_built
          })
        }
        if('building_size' in res2.data.data.attributes){
          this2.setState({
            buildingSize:Math.round(res2.data.data.attributes.building_size.value)
          })
        }
        if('building_class' in res2.data.data.attributes){
          this2.setState({
            buildingClass:res2.data.data.attributes.building_class
          })
        }
        if('building_type' in res2.data.data.attributes){
          this2.setState({
            buildingType:res2.data.data.attributes.building_type
          })
        }
        if('tenancy' in res2.data.data.attributes){
          this2.setState({
            tenancy:res2.data.data.attributes.tenancy
          })
        }
        if('address' in res2.data.data.attributes){
          this2.setState({
            address:res2.data.data.attributes.address
          })
        }







          axios.get('https://api.realmassive.com' + res.data.data.relationships.leases.links.related).then(function(res3){
            console.log(res3.data.data);
            if('price' in res3.data.data[0].attributes){
              this2.setState({
                price:Math.round(res3.data.data[0].attributes.price.value)
              })
            }

              axios.get('https://api.realmassive.com' + res3.data.data[0].relationships.organizations.links.related).then(function(res4){
                this2.setState({
                  organization:res4.data.data[0].attributes.name
                })
                console.log(res4.data.data);
                  axios.get('https://api.realmassive.com' + res4.data.data[0].relationships.cards.links.related).then(function(res5){
                    console.log(res5.data.data);
                    this2.setState({
                      contacts:res5.data.data
                    })
                  });
              })

          })



      })
    })
  }
  render(){
    if(Object.keys(this.state.contacts).length > 0){


    var contacts = this.state.contacts.map(function(data,i){

      return <div key={i} className="client-contact-item" style={{display:'block'}}>
        <div className="client-contact-desc" style={{width:'100%'}}>{data.attributes.first_name} {data.attributes.last_name}<br /><span style={{fontSize: '10pt', color: '#808080', display:'block'}}>{data.attributes.title}</span></div>
        <div className="client-contact-icons">

          <i style={{marginLeft:0,marginRight:15}} className="fa fa-envelope"  />{data.attributes.email}<br />
          <i style={{marginLeft:0,marginRight:15}} className="fa fa-phone" />{data.attributes.phone}</div>
      </div>
    })

      ReactTooltip.rebuild();
      }
    return(
      <main className="main">
        <ReactTooltip/>
        <div className="main-wrapper" style={{textAlign: 'center', position: 'relative'}}>
          <div className="container" style={{background: '#fff', boxShadow: '1px 1px 3px rgba(0,0,0,0.2)', minHeight: 'calc(100vh - 70px)', padding: 0}}>
            <div className="view-listing-body">
              <div className="view-listing-description">
                <div className="view-listing-address">
                  {this.state.address.street + ' ' + this.state.address.city + ' ' + this.state.address.state + ' ' + this.state.address.zipcode}
                  <div className="view-listing-type">{this.state.buildingType}</div>
                </div>
                <div className="view-listing-top">
                  <div className="view-listing-img" />
                </div>
                <div className="input-segment">
                  <div className="input-segment-title">Description</div>
                  {this.state.description}
                </div>
                <div className="input-segment">
                  <div className="input-segment-title">Building Details</div>
                  <div className="input-segment-inputs">
                    
                    <div className="input-segment-item">
                      <div className="input-title">Year Built</div>
                      <input type="text" placeholder="Empty" value={this.state.yearBuilt} />
                      <div className="input-active-bar" />
                    </div>





                    <div className="input-segment-item">
                      <div className="input-title">Floor</div>
                      <input type="text" placeholder="Empty" value={this.state.floor} />
                      <div className="input-active-bar" />
                    </div>



                    <div className="input-segment-item" style={{border: 'none'}}>
                    </div>
                  </div>
                </div>
                <div className="input-segment">
                  <div className="input-segment-title">Leasing Details</div>
                  <div className="input-segment-inputs">
                    <div className="input-segment-item">
                      <div className="input-title">Property Name</div>
                      <input type="text" placeholder="Empty" />
                      <div className="input-active-bar" />
                    </div>
                    <div className="input-segment-item">
                      <div className="input-title">Year Built</div>
                      <input type="text" placeholder="Empty" />
                      <div className="input-active-bar" />
                    </div>
                    <div className="input-segment-item">
                      <div className="input-title">Property Address</div>
                      <input type="text" placeholder="Empty" />
                      <div className="input-active-bar" />
                    </div>
                    <div className="input-segment-item">
                      <div className="input-title">Year Renovated</div>
                      <input type="text" placeholder="Empty" />
                      <div className="input-active-bar" />
                    </div>
                    <div className="input-segment-item">
                      <div className="input-title">Zip Code</div>
                      <input type="text" placeholder="Empty" />
                      <div className="input-active-bar" />
                    </div>
                    <div className="input-segment-item">
                      <div className="input-title">No. of Buildings</div>
                      <input type="text" placeholder="Empty" />
                      <div className="input-active-bar" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="view-listing-side-container">
                <div className="available-now-btn">Available Now</div>
                <div className="view-listings-contacts-container">
                  <div className="client-contacts">
                    <div className="client-contact-header">Related Contacts</div>
                    {contacts}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    );
  }
}

export default ViewListing;
