import React from 'react';
import axios from 'axios';

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value : this.props.value,
      id: ''
    }

  }
  componentDidMount(){

    var this2 = this;
    // axios.get('/api/search' + '/' + this2.props.params.id).then(function(res){
    //   console.log(res.data);
    //   if(res.Searches[this2.props.title] !== undefined){
    //     this2.setState({value : res.Searches[this2.props.title]})
    //   }
    //
    // })
  }
  componentWillReceiveProps(nextProps){
    this.setState({value: nextProps.value})
  }
  // camelize(str) {
  //   return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
  //     return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  //   }).replace(/\s+/g, '');
  // }
  handleBlur(e){

    var this2 = this;
    var title = this.props.title;

    var data = {};

    data[title] = e.target.value;

    axios.put('/api/UpdateProperty' + '/' + this2.props.id, data).then(function(res){

      if(res.data.data.skipped > 0){
        axios.put('/api/UpdateUploadedLocation' + '/' + this2.props.id, data).then(function(res2){
          console.log(res2);
        })
      }
    })

  }
  handleChange(e){
    this.setState({
      value: e.target.value
    })
  }
  render(){
    return(
      <div className="input-segment-item">
        <div className="input-title">{this.props.title}</div>
        <input onChange={this.handleChange.bind(this)} onBlur={this.handleBlur.bind(this)} value={this.state.value} type="text" placeholder="--" />
        <div className="input-active-bar" />
      </div>

    );
  }
}
export default TextInput;
