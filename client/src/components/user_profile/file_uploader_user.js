import React from 'react';





class FileUploaderUser extends React.Component {

handleFile(e) {
    const reader = new FileReader();
    const file = e.target.files[0];

    if (!file) return;

    reader.onload = img => {
      this.refs.in.value = '';
      this.props.handleFileChange(img.target.result);
    };
    reader.readAsDataURL(file);
  }

  render() {
    return (
      <input style={{opacity:'0'}} ref="in" type="file" accept="image/*" onChange={this.handleFile.bind(this)} />
    );
  }
}

export default FileUploaderUser;