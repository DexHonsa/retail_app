import React from 'react';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';
import '../../../style/pipeline.css';
import '../../../style/key_metrics.css';
class Pipeline extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render(){

    return(

      <main className="main">
        <ReactTooltip/>

        <div className="main-wrapper" style={{textAlign: 'center', position: 'relative'}}>
          <div className="container" style={{background: '#fff', boxShadow: '1px 1px 3px rgba(0,0,0,0.2)', padding: 0, paddingBottom: 150}}>
      <div>
        <div className="key-metrics-top">
            <div className="dropdown-selector-container">
                <div className="dropdown-item-selector">
                    <select>
                        <option>Business Groups</option>
                    </select>
                </div>
                <div className="dropdown-item-selector">
                    <select>
                        <option>Country</option>
                    </select>
                </div>
                <div className="dropdown-item-selector">
                    <select>
                        <option>Region</option>
                    </select>
                </div>
                <div className="dropdown-item-selector">
                    <select>
                        <option>State</option></select>
                </div>
                <div className="dropdown-item-selector">
                    <select>
                        <option>City</option>

                    </select>
                </div>
                <div className="dropdown-item-selector">
                    <select>
                        <option>Location</option>
                    </select>
                </div>
                <div className="dropdown-item-selector">
                    <select>
                        <option>Timeframe</option>
                    </select>
                </div>

            </div>

        </div>
        <div className="key-metrics-title">
            <h3>Pipeline</h3></div>
            <div style={{padding:15, textAlign:'left'}}>
        <div>
        <div className="add-stage-btn">Add Stage</div>
        <div className="pipeline-tile-container">
          <div className="pipeline-tile-item">
            <div className="pipeline-tile-title">All Deals</div>
            <div className="pipeline-tile-value">223</div>
            <div className="pipeline-tile-icon">
              <i className="fa fa-clock-o" /> 2d
            </div>
            <div className="pipeline-tile-icon">
              <i>SF</i> 2d
            </div>
            <div className="pipeline-tile-icon">
              <i className="fa fa-money" /> $120K
            </div>
          </div>
          <div id="lead" className="pipeline-tile-item aqua">
            <div className="delete-stage"><i className="fa fa-trash" /></div>
            <div className="pipeline-tile-title"><input type="text" defaultValue="Lead" /></div>
            <div className="pipeline-tile-value">223</div>
            <div className="pipeline-tile-icon">
              <i className="fa fa-clock-o" /> 2d
            </div>
            <div className="pipeline-tile-icon">
              <i>SF</i> 2d
            </div>
            <div className="pipeline-tile-icon">
              <i className="fa fa-money" /> $120K
            </div>
          </div>
          <div className="pipeline-tile-item bluegreen">
            <div className="delete-stage"><i className="fa fa-trash" /></div>
            <div className="pipeline-tile-title"><input type="text" defaultValue="Contacted" /></div>
            <div className="pipeline-tile-value">223</div>
            <div className="pipeline-tile-icon">
              <i className="fa fa-clock-o" /> 2d
            </div>
            <div className="pipeline-tile-icon">
              <i>SF</i> 2d
            </div>
            <div className="pipeline-tile-icon">
              <i className="fa fa-money" /> $120K
            </div>
          </div>
          <div className="pipeline-tile-item green">
            <div className="delete-stage"><i className="fa fa-trash" /></div>
            <div className="pipeline-tile-title"><input type="text" defaultValue="Proposal" /></div>
            <div className="pipeline-tile-value">223</div>
            <div className="pipeline-tile-icon">
              <i className="fa fa-clock-o" /> 2d
            </div>
            <div className="pipeline-tile-icon">
              <i>SF</i> 2d
            </div>
            <div className="pipeline-tile-icon">
              <i className="fa fa-money" /> $120K
            </div>
          </div>
          <div className="pipeline-tile-item yellowgreen">
            <div className="delete-stage"><i className="fa fa-trash" /></div>
            <div className="pipeline-tile-title"><input type="text" defaultValue="Negotitation" /></div>
            <div className="pipeline-tile-value">223</div>
            <div className="pipeline-tile-icon">
              <i className="fa fa-clock-o" /> 2d
            </div>
            <div className="pipeline-tile-icon">
              <i>SF</i> 2d
            </div>
            <div className="pipeline-tile-icon">
              <i className="fa fa-money" /> $120K
            </div>
          </div>
          <div className="pipeline-tile-item yelloworange">
            <div className="delete-stage"><i className="fa fa-trash" /></div>
            <div className="pipeline-tile-title"><input type="text" defaultValue="Pending" /></div>
            <div className="pipeline-tile-value">223</div>
            <div className="pipeline-tile-icon">
              <i className="fa fa-clock-o" /> 2d
            </div>
            <div className="pipeline-tile-icon">
              <i>SF</i> 2d
            </div>
            <div className="pipeline-tile-icon">
              <i className="fa fa-money" /> $120K
            </div>
          </div>
          <div className="pipeline-tile-item orange">
            <div className="delete-stage"><i className="fa fa-trash" /></div>
            <div className="pipeline-tile-title"><input type="text" defaultValue="Lease Prep" /></div>
            <div className="pipeline-tile-value">223</div>
            <div className="pipeline-tile-icon">
              <i className="fa fa-clock-o" /> 2d
            </div>
            <div className="pipeline-tile-icon">
              <i>SF</i> 2d
            </div>
            <div className="pipeline-tile-icon">
              <i className="fa fa-money" /> $120K
            </div>
          </div>
          <div className="pipeline-tile-item redorange">
            <div className="delete-stage"><i className="fa fa-trash" /></div>
            <div className="pipeline-tile-title"><input type="text" defaultValue="Approved" /></div>
            <div className="pipeline-tile-value">223</div>
            <div className="pipeline-tile-icon">
              <i className="fa fa-clock-o" /> 2d
            </div>
            <div className="pipeline-tile-icon">
              <i>SF</i> 2d
            </div>
            <div className="pipeline-tile-icon">
              <i className="fa fa-money" /> $120K
            </div>
          </div>
          <div className="pipeline-tile-item red">
            <div className="delete-stage"><i className="fa fa-trash" /></div>
            <div className="pipeline-tile-title"><input type="text" defaultValue="Executed" /></div>
            <div className="pipeline-tile-value">223</div>
            <div className="pipeline-tile-icon">
              <i className="fa fa-clock-o" /> 2d
            </div>
            <div className="pipeline-tile-icon">
              <i>SF</i> 2d
            </div>
            <div className="pipeline-tile-icon">
              <i className="fa fa-money" /> $120K
            </div>
          </div>
          <div className="pipeline-tile-item">
            <div className="delete-stage"><i className="fa fa-trash" /></div>
            <div className="pipeline-tile-title">Dead Deals</div>
            <div className="pipeline-tile-value">223</div>
            <div className="pipeline-tile-icon">
              <i className="fa fa-clock-o" /> 2d
            </div>
            <div className="pipeline-tile-icon">
              <i>SF</i> 2d
            </div>
            <div className="pipeline-tile-icon">
              <i className="fa fa-money" /> $120K
            </div>
          </div>
        </div>
        <div className="pipeline-details">
          <div className="pipeline-deal-item headers">
            <div className="pipeline-deal-title">Deal Name</div>
            <div className="pipeline-deal-stage">Stage</div>
            <div className="pipeline-deal-commission">Commission</div>
            <div className="pipeline-deal-date-added">Date Added</div>
            <div className="pipeline-deal-contact">Contact</div>
          </div>
          <div className="pipeline-deal-item lead-stage">
            <div className="pipeline-deal-title">Tresemary Deal</div>
            <div className="pipeline-deal-stage"><div className="stage-badge">Lead</div></div>
            <div className="pipeline-deal-commission">$100,000</div>
            <div className="pipeline-deal-date-added">12/01/2016</div>
            <div className="pipeline-deal-contact"><div className="pipeline-deal-contact-item"><i className="fa fa-user" />  David Hicks</div></div>
          </div>
          <div className="pipeline-deal-item contacted">
            <div className="pipeline-deal-title">Tresemary Deal</div>
            <div className="pipeline-deal-stage"><div className="stage-badge">Contacted</div></div>
            <div className="pipeline-deal-commission">$100,000</div>
            <div className="pipeline-deal-date-added">12/01/2016</div>
            <div className="pipeline-deal-contact"><div className="pipeline-deal-contact-item"><i className="fa fa-user" />  David Hicks</div></div>
          </div>
          <div className="pipeline-deal-item proposal">
            <div className="pipeline-deal-title">Tresemary Deal</div>
            <div className="pipeline-deal-stage"><div className="stage-badge">Proposal</div></div>
            <div className="pipeline-deal-commission">$100,000</div>
            <div className="pipeline-deal-date-added">12/01/2016</div>
            <div className="pipeline-deal-contact"><div className="pipeline-deal-contact-item"><i className="fa fa-user" />  David Hicks</div></div>
          </div>
          <div className="pipeline-deal-item negotiation">
            <div className="pipeline-deal-title">Tresemary Deal</div>
            <div className="pipeline-deal-stage"><div className="stage-badge">Negotiation</div></div>
            <div className="pipeline-deal-commission">$100,000</div>
            <div className="pipeline-deal-date-added">12/01/2016</div>
            <div className="pipeline-deal-contact"><div className="pipeline-deal-contact-item"><i className="fa fa-user" />  David Hicks</div></div>
          </div>
          <div className="pipeline-deal-item pending">
            <div className="pipeline-deal-title">Tresemary Deal</div>
            <div className="pipeline-deal-stage"><div className="stage-badge">Pending</div></div>
            <div className="pipeline-deal-commission">$100,000</div>
            <div className="pipeline-deal-date-added">12/01/2016</div>
            <div className="pipeline-deal-contact"><div className="pipeline-deal-contact-item"><i className="fa fa-user" />  David Hicks</div></div>
          </div>
          <div className="pipeline-deal-item lease-prep">
            <div className="pipeline-deal-title">Tresemary Deal</div>
            <div className="pipeline-deal-stage"><div className="stage-badge">Lease Prep</div></div>
            <div className="pipeline-deal-commission">$100,000</div>
            <div className="pipeline-deal-date-added">12/01/2016</div>
            <div className="pipeline-deal-contact"><div className="pipeline-deal-contact-item"><i className="fa fa-user" />  David Hicks</div></div>
          </div>
          <div className="pipeline-deal-item approved">
            <div className="pipeline-deal-title">Tresemary Deal</div>
            <div className="pipeline-deal-stage"><div className="stage-badge">Approved</div></div>
            <div className="pipeline-deal-commission">$100,000</div>
            <div className="pipeline-deal-date-added">12/01/2016</div>
            <div className="pipeline-deal-contact"><div className="pipeline-deal-contact-item"><i className="fa fa-user" />  David Hicks</div></div>
          </div>
          <div className="pipeline-deal-item executed">
            <div className="pipeline-deal-title">Tresemary Deal</div>
            <div className="pipeline-deal-stage"><div className="stage-badge">Executed</div></div>
            <div className="pipeline-deal-commission">$100,000</div>
            <div className="pipeline-deal-date-added">12/01/2016</div>
            <div className="pipeline-deal-contact"><div className="pipeline-deal-contact-item"><i className="fa fa-user" />  David Hicks</div></div>
          </div>
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

export default Pipeline;
