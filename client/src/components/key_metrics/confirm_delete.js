import React from 'react';

class ConfirmDelete extends React.Component {

    render() {

        return (
            <div className="overlay" style={{
                display: 'flex',
                position: 'fixed',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div className="import-data-popup animated-slow bounceInUp" style={{width:300}}>

                    <div className="add-filter-title">Delete Data?
                        <i onClick={this.props.hideImportData} className="fa fa-close"/></div>
                    <div className="import-data-body" style={{textAlign:'center', margin:20,fontSize:'15pt'}}>
                        Are You Sure?
                    </div>
                    <div className="add-filter-footer">

                        <div style={{
                            marginLeft: 'auto',
                            display: 'flex'
                        }}>

                            <div style={{
                                marginRight: 10,
                                marginLeft: 'auto'
                            }} className="basic-btn-blue" onClick={() => this.props.deleteData()}>Delete</div>
                            <div onClick={() => this.props.hideConfirmDeleteData()} className="add-filter-close-btn">close</div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}




export default ConfirmDelete;
