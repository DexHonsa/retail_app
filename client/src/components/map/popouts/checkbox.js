import React from 'react';

class Checkbox extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isChecked : this.props.isChecked
    }
  }
  componentDidMount = () => {
    const { handleCheckboxChange, label } = this.props;
    if(this.state.isChecked == true){
      handleCheckboxChange(label);
    }
  }
  toggleCheckboxChange = () => {
    const { handleCheckboxChange, label } = this.props;

    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));

    handleCheckboxChange(label);
  }
  render() {
    const { label } = this.props;
    const { labelText } = this.props;
    const { isChecked } = this.state;

    return(
        <label className="control control--checkbox">{labelText}
            <input type="checkbox" value={label} checked={isChecked} onChange={this.toggleCheckboxChange} />
            <div className="control__indicator" />
        </label>
      );
  }
}
export default Checkbox;