import React from 'react';
import axios from 'axios';
import TableInput from '../table_input';
import TextInput from '../text_input';
import TextArea from '../textarea_input';

class Clauses extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      property: []
    }

  }
  componentDidMount(){
    var this2 = this;
    var id = this.props.params.id;
    axios.get('/api/search/' + id).then(function(res){
      this2.setState({property:res.data.Searches})
    }).catch(function (error) {
      if (error.response) {
        axios.get('/api/getUploadedLocation' + '/' + id).then(function(res2){
               this2.setState({property:res2.data.data,isOwned:true});
         })
      }
    })
  }
  render(){
    return(
      <div className="animated fadeInUp">
        <div className="input-segment">
          <div className="input-segment-title">Clause</div>
        <TextArea />
      </div>
      <div className="basic-btn-blue" style={{float:'right',margin:15}}>Add Clause</div>
      </div>
    );
  }
}
export default Clauses;
