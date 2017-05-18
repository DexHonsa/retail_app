import $ from 'jquery';
import arrive from 'arrive';
var map;



document.arrive('#mini-map', function() {
window.mapboxgl.accessToken = 'pk.eyJ1IjoiZGV4aG9uc2EiLCJhIjoiY2luejFndTViMThsNnUya2o5bThpemRsaSJ9.GFlYLJmm5XmM-cGc57UH9g';
 map = new window.mapboxgl.Map({
    container: 'mini-map', // container id
    style: 'mapbox://styles/dexhonsa/cj1pfxfrm00282ro9xwbv905b', //stylesheet location
    center: [-95.7129, 37.0902], // starting position
    zoom: 4 // starting zoom
});
map.doubleClickZoom.disable();
//map.scrollZoom.disable();
map.on('mouseenter', function(e){
  console.log('over');
})


map.on('load', function() {

  map.on('mouseenter',function(e){
      console.log('moving');
  })
    // Add a layer showing the places.
    map.addSource('UploadedLocations',{
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": []
        }
    })
    map.addLayer({
        "id": "places",
        "type": "symbol",
        "source": "UploadedLocations",
        "layout": {
            "icon-image": "marker-15",
            "icon-allow-overlap": true
        }
    });

    // Create a popup, but don't add it to the map yet.
    var popup = new window.mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map.on('mouseenter', 'places', function(e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(e.features[0].geometry.coordinates)
            .setHTML(e.features[0].properties.description)
            .addTo(map);
    });

    map.on('mouseleave', 'places', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
});


});


function getUploadedLocations(clientId){
  $.ajax({
    type:"GET",
    url: '/getUploadedLocations' + '/' + clientId,
    success: function(data){

      var locationItems = [];
      data.data.forEach(function(item){
        locationItems.push({
            "type": "Feature",
            "properties": {
                "description": "<strong>"+item.address+ ' ' +item.state+ ' '+item.zip+"</strong><p>Location #"+item.locationNumber+"</p>",
                "icon": "music"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [item.lng, item.lat]
            }
        })
      })
      map.getSource('UploadedLocations').setData({
          "type": "FeatureCollection",
          "features": locationItems
      });
    }
  })
}
const MiniMap = {
  getUploadedLocations
};
export default MiniMap;
