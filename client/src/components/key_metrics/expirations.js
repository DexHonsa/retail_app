import React from 'react';
import {Bar, Pie} from 'react-chartjs-2';
import axios from 'axios';
import {connect} from 'react-redux';

class Expirations extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      clientId: this.props.client.clientId,
      properties:[],
      upcomingExpirations:[]
    }
  }
  componentDidMount(){
    this.getExpirations(this.props.client.clientId);
  }
  componentWillReceiveProps(nextProps){

    this.getExpirations(nextProps.client.clientId);
  }
  count(arr, val) {
    var i, j,
        count = 0;
    for (i = 0, j = arr.length; i < j; i++) {
        (arr[i] === val) && count++;
    }
    return count;
}
  getExpirations(clientId){
    var this2 = this;
    axios.get('/api/getUploadedLocations/' + clientId).then(function(res){
      this2.setState({
        properties: res.data.data
      })
      var expirations = [];
      var expirationData = [];

        this2.state.properties.forEach(function(item,i){

          if(item['Lease Expiration'] != undefined){
              expirationData.push(item['Lease Expiration']);
              expirations.push(item);
          }
        })
        var chartData = [
          this2.count(expirationData, "2017"),
          this2.count(expirationData, "2018"),
          this2.count(expirationData, "2019"),
          this2.count(expirationData, "2020"),
          this2.count(expirationData, "2021"),
          this2.count(expirationData, "2022"),
          this2.count(expirationData, "2023"),
          this2.count(expirationData, "2024"),
          this2.count(expirationData, "2025"),
          this2.count(expirationData, "2026"),
          this2.count(expirationData, "2027"),
          this2.count(expirationData, "2028"),
          this2.count(expirationData, "2029")
        ];

        this2.setState({upcomingExpirations:expirations, chartData:chartData})



    })

  }

  render(){
    var data2 = {
        labels: [
            "2017",
            "2018",
            "2019",
            "2020",
            "2021",
            "2022",
            "2023",
            "2024",
            "2025",
            "2026",
            "2027",
            "2028",
            "2029"
        ],
        datasets: [
            {
                label: 'Expirations',
                data: this.state.chartData,
                backgroundColor: 'rgba(46,109,255,1)',
                borderColor: 'rgba(47,155,255,1.00)',
                barThickness: 1,
                borderWidth: 0
            }
        ]
    };
    var expirationChart = <Bar data={data2} height={180} options={{
        legend: {
            display: false
        },
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            yAxes: [
                {
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)"
                    },
                    ticks: {
                        beginAtZero: true,
                        // callback: function(label, index, labels) {
          							// 	return label;
          							// }
                        //
                      },
                      padding:10, min: -1
                    }
                      ],
                        xAxes: [{
                        // barThickness:25,
                        gridLines: { color: "rgba(0, 0, 0, 0.2)", borderDash : [3,4], lineWidth: .5, drawTicks: false, drawBorder:false }, ticks: { padding: 10, autoSkipPadding : 10 }
                       }
                      ]

                      }
                      }
                    }
                      />;
    return(<div className="expirations-container">
        <div className="performing-location-title">Expirations
            <div className="performing-location-dropdown">
                <div>
                    <span style={{
                        paddingRight: 15,
                        color: '#3080e8'
                    }}>Show:</span>
                    <select>
                        <option>6M</option>
                        <option>12M</option>
                        <option>36M</option>
                        <option>48M</option>
                    </select>
                </div>
            </div>
        </div>
        <div style={{
            display: 'flex',
            width: '100%'
        }}>
            <div className="chart" style={{
                position: 'relative',
                padding: 25
            }}>
                <div className="chart-title">Upcoming Expirations</div>
                {expirationChart}
            </div>
            <div className="chart" style={{
                position: 'relative',
                padding: 25
            }}>
                <div className="chart-title" style={{
                    margin: 0
                }}>Upcoming Expirations</div>
                <ul className="expiration-list">
                  {this.state.upcomingExpirations.map(function(data,i){
                    return <li>
                        <div className="expiration-title">{data.address} {data.city} {data.state}</div>
                        <div className="expiration-date">{data['Lease Expiration']}</div>
                    </li>
                  })}


                </ul>
            </div>
        </div>
    </div>
  );
  }
}
function mapStateToProps(state) {
    return {auth: state.auth, client: state.client};
}
export default connect(mapStateToProps)(Expirations);
