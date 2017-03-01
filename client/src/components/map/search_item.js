import React from 'react';



class SearchItem extends React.Component{
    constructor(props) {
    super(props);  

    this.state = {
      
    }  
    
  }


  
  render(){
    return (
      
      <div onClick={() => {this.props.findSearch(this.props.keyId)}} className="results-item" style={{backgroundImage: 'url(' + this.props.img + ')'}}>
        <div className="result-img" />
        <div className="result-details">
          <div id="first-location" className="results-title">{this.props.street}<br /><span style={{fontSize: '10pt'}}>{this.props.city}<br />Office</span><br /></div>
          <div className="results-btns">
            <div onClick={(e) => {this.props.deleteThis(this.props.index, this.props.keyId, e)}} className="results-btn"><i className="fa fa-trash" /> Delete</div>
          </div>
        </div>
      </div>

     

    );
  }
    
  
    

  



  }

export default SearchItem;