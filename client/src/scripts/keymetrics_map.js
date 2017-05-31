import $ from 'jquery';
import arrive from 'arrive';
var map;



document.arrive('#mini-map', function() {
window.mapboxgl.accessToken = 'pk.eyJ1IjoiZGV4aG9uc2EiLCJhIjoiY2luejFndTViMThsNnUya2o5bThpemRsaSJ9.GFlYLJmm5XmM-cGc57UH9g';
 map = new window.mapboxgl.Map({
    container: 'mini-map', // container id
    style: 'mapbox://styles/dexhonsa/cizyfpyzn003k2sobx3m1pbmh', //stylesheet location
    center: [-95.7129, 37.0902], // starting position
    zoom: 4 // starting zoom
});
map.doubleClickZoom.disable();
//map.scrollZoom.disable();
map.on('mouseenter', function(e){
  console.log('over');
})


map.on('load', function() {
  map.addControl(new window.mapboxgl.NavigationControl());

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
            "icon-image": "marker-16",
            "icon-allow-overlap": true
        }
    });

    map.addSource('UploadedFilteredLocations',{
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": []
        }
    })
    map.addLayer({
        "id": "filteredLocations",
        "type": "symbol",
        "source": "UploadedFilteredLocations",
        "layout": {
            "icon-image": "marker-{icon}",
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
  console.log('map');
  $.ajax({
    type:"GET",
    url: '/api/getUploadedLocations' + '/' + clientId,
    success: function(data){

      var locationItems = [];
      data.data.forEach(function(item){
        console.log(item);
        locationItems.push({
            "type": "Feature",
            "properties": {
                "description": "<strong>"+item.address+ ' ' +item.state+ ' '+item['zip code']+"</strong><p>Location #"+item['location number']+"</p>",
                "icon": "music"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [item.longitude, item.latitude]
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
function getUploadedFilteredLocations(filter,type,clientId){
  $.ajax({
    type:"GET",
    url: '/api/getUploadedFilteredLocations' + '/' + clientId + '/' + filter + '/' + type,
    success: function(data){

      var locationItems2 = [];
      data.data.forEach(function(item){
        locationItems2.push({
            "type": "Feature",
            "properties": {
                "description": "<strong>"+item.address+ ' ' +item.state+ ' '+item['zip code']+"</strong><p>Location #"+item['location number']+"</p>",
                "icon": "15"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [item.longitude, item.latitude]
            }
        })
      })
      map.getSource('UploadedFilteredLocations').setData({
          "type": "FeatureCollection",
          "features": locationItems2
      });
    }
  })
}
const MiniMap = {
  getUploadedLocations,
  getUploadedFilteredLocations
};
export default MiniMap;
