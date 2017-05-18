/* eslint-disable */
import $ from 'jquery';
import arrive from 'arrive';
var map;
var draw;
var geocoder;
var popup;

document.arrive('#map', function() {

    refreshMap();
    map.on('style.load', function() {
        addLayers();
        map.doubleClickZoom.disable();
    });
});

function changeMap(val){
    removeSourcesAndLayers();
    var mapStyle;

    if(val == 1){
        mapStyle = 'mapbox://styles/dexhonsa/cj0ckgfvs003i2rpb80fhoyzu';
    }
    if(val == 2){
        mapStyle = 'mapbox://styles/dexhonsa/ciyaweb92003d2ss7g5neultw';
    }
    if(val == 3){
        mapStyle = 'mapbox://styles/dexhonsa/cizyf1ndk003x2rpls6yc5ecd';
    }

    map.setStyle(mapStyle);
    map.on('style.load', function() {
        addLayers();
    });

}
function removeSourcesAndLayers(){
    map.removeSource('zip_layer');
    map.removeSource('poi_markers');

}
function getZipsFromBounds(callback){
        var bounds = map.getBounds();
         var neLat = bounds._ne.lat;
         var neLng = bounds._ne.lng;
         var swLat = bounds._sw.lat;
         var swLng = bounds._sw.lng;

         var obj = {"neLat":neLat, "neLng":neLng, "swLat":swLat, "swLng":swLng};
         //filter the zips in the bounding box
         $.ajax({
            type: 'POST',
            url: '/api/getZips/',
            data : obj,
            success: function(res){
                var data = res.data.map(String);
                var newArray = []
                data.forEach(function(item){
                    if(item.toString().length < 5)
                        item = "0" + item;
                    newArray.push(item);
                })
                return callback(newArray);
            }
         })
}
function filterZips(zips, filters, callback){
    var zips = zips;
    var zipNumbers = zips.map(Number);
    var options = {};
    options.zips = zipNumbers;
    options.filters = filters;
    $.ajax({
        type: 'POST',
        url:'/api/filterZips/',
        data: JSON.stringify(options),
        contentType: 'application/json',
        processData: false,
        success: function(data){
            console.log(data);
            return callback(data);

        }
    })
}
function clearDrawnZips(){
    map.setFilter("zip-border", null);
    map.setFilter("zip-fill", null);
    map.getSource('zip_layer').setData({
        "type": "FeatureCollection",
        "features": []
    });
}
function drawFilteredZips(array){

        var zipArray = []
        array.forEach(function(item){
            zipArray.push(item.ZipCode)
        })
        zipArray = zipArray.map(String);
        var newArray = [];
        zipArray.forEach(function(item){
                    if(item.toString().length < 5)
                        item = "0" + item;
                    newArray.push(item);
                })

                $.ajax({
                    type:'POST',
                    url: '/api/drawZips/',
                    data: JSON.stringify(newArray),
                    contentType: "application/json",
                    processData: false,
                    success: function(data){

                        map.setFilter("zip-border", null);
                        map.setFilter("zip-fill", null);
                        map.getSource('zip_layer').setData({
                            "type": "FeatureCollection",
                            "features": data.data
                        });
                    }
                })
}
function refreshMap() {
    window.mapboxgl.accessToken = 'pk.eyJ1IjoiZGV4aG9uc2EiLCJhIjoiY2luejFndTViMThsNnUya2o5bThpemRsaSJ9.GFlYLJmm5XmM-cGc57UH9g';
    map = new window.mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/dexhonsa/cj0ckgfvs003i2rpb80fhoyzu', //stylesheet location
        center: [-74.005941, 40.712784], // starting position
        zoom: 10 // starting zoom
    });


    draw = new window.MapboxDraw({
        displayControlsDefault: false,
        controls: {
            polygon: true,
            trash: true
        }
    });
    map.doubleClickZoom.disable();
    geocoder = new window.MapboxGeocoder({
        accessToken: window.mapboxgl.accessToken
    });
    popup = new window.mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });
    map.addControl(draw);

    map.on('dataloading', function() {
        map.doubleClickZoom.disable();
        $('.map-preloader').removeClass('hide-loader');


    });
    map.on("render", function() {
        if (map.loaded()) {
            map.doubleClickZoom.disable();
            $('.map-preloader').addClass('hide-loader');
        }
    });
    map.on('mousemove',function(){
        $('.map-preloader').addClass('hide-loader');
    });
    map.on('dragend', function() {
        updateMap();



    });
    map.on('zoomend', function() {
        updateMap();
    });
    map.on('load', function() {
        $('.map-preloader').addClass('hide-loader');
        map.doubleClickZoom.disable();

    });

    map.addControl(geocoder);
    geocoder.on('result', function(ev) {

        var lng = ev.result.geometry.coordinates[0];
        var lat = ev.result.geometry.coordinates[1];
        var id = Math.random();
        createMarker([lat, lng, id, ev.result.place_name]);
        $('.marker').click(function() {
            var lat = $(this).attr('lat');
            var lng = $(this).attr('lng');
            $('.view-result').show();
            $('.view-result').removeClass('fadeOutRight');
            $('.view-result').addClass('fadeInRight');
        })
    });
    map.on('dblclick', function(ev) {
        // map.setFilter("block_boundaries-border-hover", ["==", "name", ""]);
        // var features = map.queryRenderedFeatures(ev.point, {
        //     layers: ["block_boundaries"]
        // });
        // if (features.length) {
        //     map.setFilter("block_boundaries-border-hover", ["==", "name", features[0].properties.name]);
        // } else {
        //     map.setFilter("block_boundaries-border-hover", ["==", "name", ""]);
        // }
        var lat = ev.lngLat.lat;
        var lng = ev.lngLat.lng;
        var id = "marker-" + Math.floor((Math.random() * 100) + 1);
        var address = "";
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "%2C" + lng + "&key=AIzaSyBXkG_joIB9yjAP94-L6S-GLTWnj7hYmzs",
            "method": "GET",
            "headers": {}
        }
        $.ajax(settings).done(function(response) {
            address = response.results[0].formatted_address;
            createMarker(lat, lng, id, address);
        });
    })
    $('.draw-toggle').click(function() {
        var drawnPoly = draw.getAll();

    })


    $.ajax({
        type: "GET",
        url: "/api/searches",
        success: function(data) {
            data.forEach(function(item) {
                var lat = item.lat;
                var lng = item.lng;
                var address = item.street + item.city;
                var img = item.imgUrl;
                var id = Math.random();
                createSavedMarker(lat, lng, id, address);
            })
        },
        dataType: "json",
        contentType: "application/json"
    });
}
function addLayers(){

        map.addSource('zip_layer', {
            "type": 'geojson',
            "data": {
                "type": "FeatureCollection",
                "features": [{
                    "type": "Feature",
                    "properties": {},
                    'geometry': {
                        'type': 'Polygon',
                        'coordinates': [
                            [
                                [-67.13734351262877, 45.137451890638886],
                                [-66.96466, 44.8097],
                                [-68.03252, 44.3252],
                                [-69.06, 43.98],
                                [-70.11617, 43.68405],
                                [-70.64573401557249, 43.090083319667144],
                                [-70.75102474636725, 43.08003225358635],
                                [-70.79761105007827, 43.21973948828747],
                                [-70.98176001655037, 43.36789581966826],
                                [-70.94416541205806, 43.46633942318431],
                                [-71.08482, 45.3052400000002],
                                [-70.6600225491012, 45.46022288673396],
                                [-70.30495378282376, 45.914794623389355],
                                [-70.00014034695016, 46.69317088478567],
                                [-69.23708614772835, 47.44777598732787],
                                [-68.90478084987546, 47.184794623394396],
                                [-68.23430497910454, 47.35462921812177],
                                [-67.79035274928509, 47.066248887716995],
                                [-67.79141211614706, 45.702585354182816],
                                [-67.13734351262877, 45.137451890638886]
                            ]
                        ]
                    }
                }]
            }
        });
        // map.addSource('block_boundaries', {
        //     "type": 'geojson',
        //     "data": {
        //         "type": "FeatureCollection",
        //         "features": [{
        //             "type": "Feature",
        //             "properties": {},
        //             'geometry': {
        //                 'type': 'Polygon',
        //                 'coordinates': [
        //                     [
        //                         [-67.13734351262877, 45.137451890638886],
        //                         [-66.96466, 44.8097],
        //                         [-68.03252, 44.3252],
        //                         [-69.06, 43.98],
        //                         [-70.11617, 43.68405],
        //                         [-70.64573401557249, 43.090083319667144],
        //                         [-70.75102474636725, 43.08003225358635],
        //                         [-70.79761105007827, 43.21973948828747],
        //                         [-70.98176001655037, 43.36789581966826],
        //                         [-70.94416541205806, 43.46633942318431],
        //                         [-71.08482, 45.3052400000002],
        //                         [-70.6600225491012, 45.46022288673396],
        //                         [-70.30495378282376, 45.914794623389355],
        //                         [-70.00014034695016, 46.69317088478567],
        //                         [-69.23708614772835, 47.44777598732787],
        //                         [-68.90478084987546, 47.184794623394396],
        //                         [-68.23430497910454, 47.35462921812177],
        //                         [-67.79035274928509, 47.066248887716995],
        //                         [-67.79141211614706, 45.702585354182816],
        //                         [-67.13734351262877, 45.137451890638886]
        //                     ]
        //                 ]
        //             }
        //         }]
        //     }
        // });
        map.addSource('poi_markers', {
            "type": 'geojson',
            "data": {
                "type": "FeatureCollection",
                "features": [{
                    "type": "Feature",
                    "properties": {
                        "description": "<strong>Make it Mount Pleasant</strong><p><a href=\"http://www.mtpleasantdc.com/makeitmtpleasant\" target=\"_blank\" title=\"Opens in a new window\">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>",
                        "icon": "theatre"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [-77.038659, 38.931567]
                    }
                }]
            }
        });
        map.addSource('listing_markers', {
            "type": 'geojson',
            "data": {
                "type": "FeatureCollection",
                "features": [{
                    "type": "Feature",
                    "properties": {
                        "description": "<strong>Make it Mount Pleasant</strong><p><a href=\"http://www.mtpleasantdc.com/makeitmtpleasant\" target=\"_blank\" title=\"Opens in a new window\">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>",
                        "icon": "theatre"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [-77.038659, 38.931567]
                    }
                }]
            },
            cluster: true,
            clusterMaxZoom: 14, // Max zoom to cluster points on
            clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
        });
        // map.addLayer({
        //     "id": "block_boundaries",
        //     "type": "fill",
        //     "source": "block_boundaries",
        //     "paint": {
        //         "fill-color": "#3080e8",
        //         "fill-opacity": 0
        //     },
        // });
        // map.addLayer({
        //     "id": "block_boundaries-border",
        //     "type": "line",
        //     "source": "block_boundaries",
        //     "layout": {},
        //     "paint": {
        //         "line-color": "#000",
        //         "line-width": 1
        //     },
        //     "filter": ["==", "name", ""]
        // });
        // map.addLayer({
        //     "id": "block_boundaries-border-hover",
        //     "type": "line",
        //     "source": "block_boundaries",
        //     "layout": {},
        //     "paint": {
        //         "line-color": "#ff0000",
        //         "line-width": 2,
        //     },
        //     "filter": ["==", "name", ""]
        // });

        // map.addLayer({
        //     "id": "zip-fill-active",
        //     "type": "fill",
        //     "source": "zip_layer",
        //     "paint": {
        //         "fill-color": "#3080e8",
        //         "fill-opacity": 0.6
        //     },
        //     "filter": ["==", "ZCTA5CE10", ""]
        // });




        //   map.addLayer({
        //       "id": "traffic",
        //       "type": "line",
        //       "source": {
        //           type: 'vector',
        //            url: 'mapbox://mapbox.mapbox-traffic-v1'
        //        },
        //        "source-layer": "traffic",
        //        "paint" : {
        //            "line-color": "#00ff00",
        //            "line-width" : 2
        //        }
        //

        //         });




        // map.on("mouseout", function() {
        //     map.setFilter("block_boundaries-border-hover", ["==", "name", ""]);
        // });
        map.addLayer({
        id: "clusters",
        type: "circle",
        source: "listing_markers",
        filter: ["has", "point_count"],
        paint: {
            "circle-color": {
                property: "point_count",
                type: "interval",
                stops: [
                    [0, "#51bbd6"],
                    [100, "#f1f075"],
                    [750, "#f28cb1"],
                ]
            },
            "circle-radius": {
                property: "point_count",
                type: "interval",
                stops: [
                    [0, 20],
                    [100, 30],
                    [750, 40]
                ]
            }
        }
    });

    map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "listing_markers",
        filter: ["has", "point_count"],
        layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12
        }
    });
    map.addLayer({
        id: "unclustered-point",
        type: "symbol",
        source: "listing_markers",
        filter: ["!has", "point_count"],
        "layout": {
                 "icon-image": "marker",
                 "icon-size": .7,
                 "text-field": "{title}",
                 "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                 "text-offset": [0, 0.6],
                 "text-anchor": "top",
                 "icon-allow-overlap": true
             }
        // paint: {
        //     "circle-color": "#11b4da",
        //     "circle-radius": 4,
        //     "circle-stroke-width": 1,
        //     "circle-stroke-color": "#fff"
        // }
    });
         map.addLayer({
            "id": "pois",
            "type": "symbol",
            "source": "poi_markers",
            "layout": {
                "icon-image": "marker",
                "icon-size": .7,
                "text-field": "{title}",
                "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                "text-offset": [0, 0.6],
                "text-anchor": "top",
                "icon-allow-overlap": true

            }
        });
      //   map.addLayer({
      //      "id": "listings",
      //      "type": "symbol",
      //      "source": "listing_markers",
      //      "layout": {
      //          "icon-image": "marker-15",
      //          "icon-size": 1,
      //          "text-field": "{title}",
      //          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
      //          "text-offset": [0, 0.6],
      //          "text-anchor": "top",
      //          "icon-allow-overlap": true
       //
      //      }
      //  });
        map.addLayer({
            "id": "zip-border",
            "type": "line",
            "source": "zip_layer",
            "layout": {},
            "paint": {
                "line-color": "#3080e8",
                "line-width": 3
            }
            //"filter": ["==", "name", ""]
        });
        map.addLayer({
            "id": "zip-fill",
            "type": "fill",
            "source": "zip_layer",
            "paint": {
                "fill-color": "#3080e8",
                "fill-opacity": 0.1
            }
        });
        map.addLayer({
            "id": "zip-fill-hover",
            "type": "fill",
            "source": "zip_layer",
            "paint": {
                "fill-color": "#3080e8",
                "fill-opacity": 0.3
            }
        });
        map.on("mousemove", function(e) {
            var features = map.queryRenderedFeatures(e.point, {
                layers: ["zip-fill","unclustered-point"]
            });

            // var listingLayer = map.queryRenderedFeatures(e.point, {
            //     layers: ["unclustered-point"]
            // });

            map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
            if (features.length) {
                map.setFilter("zip-fill-hover", ["==", "ZCTA5CE10", features[0].properties.ZCTA5CE10]);
            } else {
                map.setFilter("zip-fill-hover", ["==", "ZCTA5CE10", ""]);
            }
        });
        map.on("click", function(e) {
            var features = map.queryRenderedFeatures(e.point, {
                layers: ["zip-fill"]
            });
            var listings = map.queryRenderedFeatures(e.point, {
                layers: ["unclustered-point"]
            });
            if(listings.length){
              console.log(listings[0].properties);
              var lat = listings[0].properties.lat;
              var lng = listings[0].properties.lng;
              var listingId = listings[0].properties.listing_id;

              var id = "marker-" + Math.floor((Math.random() * 100) + 1);
              var address = "";
              var settings = {
                  "async": true,
                  "crossDomain": true,
                  "url": "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "%2C" + lng + "&key=AIzaSyBXkG_joIB9yjAP94-L6S-GLTWnj7hYmzs",
                  "method": "GET",
                  "headers": {}
              }
              $.ajax(settings).done(function(response) {
                  address = response.results[0].formatted_address;
                  createListingMarker(lat, lng, id, listingId, address);
                  setTimeout(function(){
                    var l = document.getElementById(id);
                    l.click();
                  },100)

              });
            }
            if (features.length) {
                flyToLocation(features[0].properties.INTPTLAT10, features[0].properties.INTPTLON10);
                // map.setFilter("zip-fill-active", ["==", "ZCTA5CE10", features[0].properties.ZCTA5CE10]);
            } else {
                map.setFilter("zip-fill-hover", ["==", "ZCTA5CE10", ""]);
                //map.setFilter("zip-fill-active", ["==", "ZCTA5CE10", ""]);
            }
        })

        // Reset the state-fills-hover layer's filter when the mouse leaves the map
        map.on("mouseout", function() {
            map.setFilter("zip-fill-hover", ["==", "ZCTA5CE10", ""]);
        });


}
// function getListings(){
//   var bounds = map.getBounds();
//   var polygon = [bounds._ne.lat, bounds._ne.lng, bounds._sw.lat, bounds._sw.lng, bounds._ne.lat, bounds._sw.lng, bounds._sw.lat,bounds._ne.lng]
//   var url = "https://api.realmassive.com/buildings?include=spaces.leases&page[limit]=100&filter[polygon]="+polygon[0]+","+polygon[1]+","+polygon[2]+","+polygon[3]+","+polygon[4]+","+polygon[5]+","+polygon[6]+","+polygon[7]+"&filter[where][spaces.leases.id][ge]=0&filter[where][spaces.leases.archived]=false"
//  console.log(url);
//   var settings = {
//   "async": true,
//   "crossDomain": true,
//   "url": url,
//   "method": "GET",
//   "headers": {
//     "content-type": "application/json",
//     "authorization": "Bearer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJyZWFsbWFzc2l2ZSIsInNjb3BlIjoiIiwic3ViIjoiZGV4QHRoZWFtcC5jb20iLCJleHAiOjE0OTQzNTI1MzN9.NTitbV6tUdyTkvLjwpCltht0bXrOHBVgm1YGcbBzFx0",
//     "cache-control": "no-cache",
//     "postman-token": "c2034c1e-1135-6e6d-68b3-a61775556125"
//   },
//   "processData": false,
//   "data": "{\"email\": \"dex@theamp.com\", \"password\":\"Awesomeo21!\"}"
// }
//
// $.ajax(settings).done(function (response) {
// var results = response.data;
// var data = [];
//
//   results.forEach(function(item){
//     console.log(item);
//     data.push({
//         "type": "Feature",
//         "properties": {
//             "description": "blank",
//             "icon": "theatre",
//             "lng":item.attributes.address.longitude,
//             "lat":item.attributes.address.latitude,
//             "listing_id":item.attributes.id
//         },
//         "geometry": {
//             "type": "Point",
//             "coordinates": [item.attributes.address.longitude, item.attributes.address.latitude]
//         }
//     })
//     //console.log(item.attributes.address.latitude);
//   })
// setTimeout(function(){
//   console.log(data.length)
//   map.getSource('listing_markers').setData({
//       "type": "FeatureCollection",
//       "features": data
//   });
// },2000)
//
//
//
// });
//
// }
function updateListings(filters){
  var bounds = map.getBounds();
  var polygon = [bounds._ne.lat, bounds._ne.lng, bounds._sw.lat, bounds._sw.lng, bounds._ne.lat, bounds._sw.lng, bounds._sw.lat,bounds._ne.lng];
  var typeOption;
  var sizeOption;
  var forOption;
  var upperSize;
  var lowerSize;

  if(filters.type == "Retail"){
    typeOption = "retail";
  }
  if(filters.type == "Office"){
    typeOption = "office";
  }
  if(filters.type == "Industrial"){
    typeOption = "industrial";
  }


  if(filters.size == "Under 1,000 SF"){
    upperSize = "1000";
    lowerSize = "0";
  }
  if(filters.size == "1,000 - 2,500 SF"){
    upperSize = "2500";
    lowerSize = "1000";
  }
  if(filters.size == "2,500 - 5,000 SF"){
    upperSize = "5000";
    lowerSize = "2500";
  }
  if(filters.size == "5,000 - 10,000 SF"){
    upperSize = "10000";
    lowerSize = "5000";
  }
  if(filters.size == "Over 10,000 SF"){
    upperSize = "1000000";
    lowerSize = "10000";
  }
var url;
  if(filters.for == "Lease"){
    url = "https://api.realmassive.com/buildings?include=spaces.leases&page[limit]=100&filter[polygon]="+polygon[0]+","+polygon[1]+","+polygon[2]+","+polygon[3]+","+polygon[4]+","+polygon[5]+","+polygon[6]+","+polygon[7]+","+polygon[0]+","+polygon[1]+"&filter[where][spaces.leases.id][ge]=0&filter[where][spaces.leases.archived]=false&filter[where][building_type]="+typeOption+"&filter[where][spaces.min_divisible.value][lt]="+upperSize+"&filter[where][spaces.max_contiguous.value][gt]="+lowerSize;

  }
  if(filters.for == "Sub Lease"){
    url = "https://api.realmassive.com/buildings?include=spaces.subleases&page[limit]=100&filter[polygon]="+polygon[0]+","+polygon[1]+","+polygon[2]+","+polygon[3]+","+polygon[4]+","+polygon[5]+","+polygon[6]+","+polygon[7]+","+polygon[0]+","+polygon[1]+"&filter[where][spaces.subleases.id][ge]=0&filter[where][spaces.subleases.archived]=false&filter[where][building_type]="+typeOption+"&filter[where][spaces.min_divisible.value][lt]="+upperSize+"&filter[where][spaces.max_contiguous.value][gt]="+lowerSize;

  }
  if(filters.for == "Sale"){
    url = "https://api.realmassive.com/buildings?include=sales&page[limit]=100&filter[polygon]="+polygon[0]+","+polygon[1]+","+polygon[2]+","+polygon[3]+","+polygon[4]+","+polygon[5]+","+polygon[6]+","+polygon[7]+","+polygon[0]+","+polygon[1]+"&filter[where][sales.id][ge]=0&filter[where][sales.archived]=false&filter[where][building_type]="+typeOption;
  }


  drawListings(url);



  map.on('dragend', function() {
    console.log('hit');
    drawListings(url);
  });
  // map.off('dragend',function(){
  //   console.log('off');
  // })





}


function drawListings(url){
  var settings = {
  "async": true,
  "crossDomain": true,
  "url": url,
  "method": "GET",
  "headers": {
    "content-type": "application/json",
    "authorization": "Bearer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJyZWFsbWFzc2l2ZSIsInNjb3BlIjoiIiwic3ViIjoiZGV4QHRoZWFtcC5jb20iLCJleHAiOjE0OTQzNTI1MzN9.NTitbV6tUdyTkvLjwpCltht0bXrOHBVgm1YGcbBzFx0",
    "cache-control": "no-cache",
    "postman-token": "c2034c1e-1135-6e6d-68b3-a61775556125"
  },
  "processData": false,
  "data": "{\"email\": \"dex@theamp.com\", \"password\":\"Awesomeo21!\"}"
}

$.ajax(settings).done(function (response) {
var results = response.data;
var data = [];

  results.forEach(function(item){
    console.log(item);
    data.push({
        "type": "Feature",
        "properties": {
            "description": "blank",
            "icon": "theatre",
            "lng":item.attributes.address.longitude,
            "lat":item.attributes.address.latitude,
            "listing_id":item.id
        },
        "geometry": {
            "type": "Point",
            "coordinates": [item.attributes.address.longitude, item.attributes.address.latitude]
        }
    })
    //console.log(item.attributes.address.latitude);
  })

  console.log(data.length)
  map.getSource('listing_markers').setData({
      "type": "FeatureCollection",
      "features": data
  });



});
}
function drawZip(zip) {
    $.ajax({
        type: "GET",
        url: "/api/zip/" + zip,
        success: function(data) {

            map.setFilter("zip-border", null);
            map.setFilter("zip-fill", null);
            map.getSource('zip_layer').setData({
                "type": "FeatureCollection",
                "features": [data.Zips[0]]
            });
        },
        dataType: "json",
        contentType: "application/json"
    });
}
function drawZipAndFlyTo(zip){
    drawZip(zip);
    var lat;
    var lng;
   $.ajax({
        type: 'GET',
        url: '/api/geocoder/' + zip,
        async : false,
        success: function(res){

          var parse = JSON.parse(res.body);
          console.log(parse);
          lat = parse.results[0].geometry.location.lat;
          lng = parse.results[0].geometry.location.lng;
        }
      })

    map.flyTo({
        center: [lng, lat],
        zoom: 12
    });
}
function hideZip() {
    map.setFilter("zip-border", ["==", "ZCTA5CE10", ""]);
    map.setFilter("zip-fill", ["==", "ZCTA5CE10", ""]);
}

function updateMap() {

    var bounds = map.getBounds();
    var neLat = bounds._ne.lat;
    var neLng = bounds._ne.lng;
    var swLat = bounds._sw.lat;
    var swLng = bounds._sw.lng;
    var coords = {
        "ne_lat": neLat,
        "ne_lon": neLng,
        "radius": 5,
        "sw_lat": swLat,
        "sw_lon": swLng
    };
    // $.ajax({
    //     type: "POST",
    //     url: "https://retailapi.theamp.com/demographics/get_geojson?search_by=bounding_box_area",
    //     data: JSON.stringify(coords),
    //     contentType: "json",
    //     success: function(data) {
    //         var block_ids = [];
    //         var block_coordinates = [];
    //         data.results.forEach(function(item) {
    //             var lat = item.properties.INTPTLAT;
    //             var lng = item.properties.INTPTLON;
    //             var boundaries = item.geometry.coordinates;
    //             block_coordinates.push(boundaries);
    //             block_ids.push(item.id);
    //         });
    //         //drawBlocks(block_coordinates);
    //         //getProperties(block_ids)
    //     }
    // });
    //lalala
    //getPois();
}

function getPois(lat, lng, filters) {
    var map2;
    var service;
    var infowindow;
    var pyrmont = new window.google.maps.LatLng(lat, lng);
    map2 = new window.google.maps.Map(document.getElementById('google-map'), {
        center: pyrmont,
        zoom: 15
    });
    var request = {
        location: pyrmont,
        radius: '500',
        types: filters
    };
    service = new window.google.maps.places.PlacesService(map2);
    service.nearbySearch(request, callback);
    var googlePois = [];

    function callback(results, status) {
        $('.poi-marker').remove();
        if (status == window.google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                var place = results[i];
                googlePois.push(place);
            }
        }
    }


    var foursquarePois = [];
    var poiSource = [];
    var typesJoined = filters.join();
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.foursquare.com/v2/venues/search?ll=" + lat + "," + lng + "&query=" + typesJoined + "&v=20161224&client_id=ECE35OJI5AST0N0NVCFC25TUVDD4G1S5YD2XULNXMR55MG0E&client_secret=HFZYXDVLBFAUMNF31R5S32PMFFOT4YI0E3A0JWCPTMCCT0AU",
        "method": "GET"
    }
    $.ajax(settings).done(function(response) {

        foursquarePois = response.response.venues;
    });


    setTimeout(function() {


        foursquarePois.forEach(function(item) {
            var source2 = {
                "type": "Feature",
                "properties": {
                    "description": "<strong>" + item.name + "</strong>"
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [item.location.lng, item.location.lat]
                }
            }
            poiSource.push(source2)
        });

        googlePois.forEach(function(item) {

            var source = {
                "type": "Feature",
                "properties": {
                    "description": "<strong>" + item.name + "</strong>"
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [item.geometry.location.lng(), item.geometry.location.lat()]
                }
            }
            poiSource.push(source)
        });

        map.getSource('poi_markers').setData({
            "type": "FeatureCollection",
            "features": poiSource
        });
        map.on('mousemove', function(e) {
            var features = map.queryRenderedFeatures(e.point, {
                layers: ['pois']
            });
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

            if (!features.length) {
                popup.remove();
                return;
            }

            var feature = features[0];

            // Populate the popup and set its coordinates
            // based on the feature found.
            popup.setLngLat(feature.geometry.coordinates)
                .setHTML(feature.properties.description)
                .addTo(map);
        });

    }, 1000)
    //return googlePois;


}

function getMapPois(filters) {
    var center = map.getCenter();
    var lng = center.lng;
    var lat = center.lat;
    var map2;
    var service;
    var infowindow;
    var pyrmont = new window.google.maps.LatLng(lat, lng);
    map2 = new window.google.maps.Map(document.getElementById('google-map'), {
        center: pyrmont,
        zoom: 15
    });
    var request = {
        location: pyrmont,
        radius: '500',
        types: filters
    };
    service = new window.google.maps.places.PlacesService(map2);
    service.nearbySearch(request, callback);
    var googlePois = [];

    function callback(results, status) {
        $('.poi-marker').remove();
        if (status == window.google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                var place = results[i];

                googlePois.push(place);
            }

        }
    }


    var foursquarePois = [];
    var poiSource = [];
    var typesJoined = filters.join();
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.foursquare.com/v2/venues/search?ll=" + lat + "," + lng + "&query=" + typesJoined + "&v=20161224&client_id=ECE35OJI5AST0N0NVCFC25TUVDD4G1S5YD2XULNXMR55MG0E&client_secret=HFZYXDVLBFAUMNF31R5S32PMFFOT4YI0E3A0JWCPTMCCT0AU",
        "method": "GET"
    }
    $.ajax(settings).done(function(response) {

        foursquarePois = response.response.venues;

    });


    setTimeout(function() {


        foursquarePois.forEach(function(item) {
            var source2 = {
                "type": "Feature",
                "properties": {
                    "description": "<strong>" + item.name + "</strong>"
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [item.location.lng, item.location.lat]
                }
            }
            poiSource.push(source2)
        });

        googlePois.forEach(function(item) {

            var source = {
                "type": "Feature",
                "properties": {
                    "description": "<div style='font-size:12pt;position:relative;'>"+item.name+"</div>"
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [item.geometry.location.lng(), item.geometry.location.lat()]
                }
            }
            poiSource.push(source)
        });

        map.getSource('poi_markers').setData({
            "type": "FeatureCollection",
            "features": poiSource
        });
        map.on('mousemove', function(e) {
            var features = map.queryRenderedFeatures(e.point, {
                layers: ['pois']
            });
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

            if (!features.length) {
                popup.remove();
                return;
            }

            var feature = features[0];

            // Populate the popup and set its coordinates
            // based on the feature found.
            popup.setLngLat(feature.geometry.coordinates)
                .setHTML(feature.properties.description)
                .addTo(map);
        });

    }, 1000)

    return googlePois;


}

function removePois() {
    map.getSource('poi_markers').setData({
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "properties": {
                "description": "<strong>Make it Mount Pleasant</strong><p><a href=\"http://www.mtpleasantdc.com/makeitmtpleasant\" target=\"_blank\" title=\"Opens in a new window\">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>",
                "icon": "theatre"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [-77.038659, 38.931567]
            }
        }]
    });
}

function flyToLocation(lat, lng) {
    map.flyTo({
        center: [lng, lat],
        zoom: 14
    });
}

function drawPois(results) {
    var features = [];
    results.forEach(function(item) {
        var lat = item.geometry.location.lat;
        var lng = item.geometry.location.lng;
        var coords = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [lng, lat]
            },
            "properties": {
                "title": item.name,
                "icon": "monument"
            }
        }
        features.push(coords);
    });
    map.getSource('poi_layer').setData({
        "type": "FeatureCollection",
        "features": features
    });
}

// function drawBlocks(results) {
//     var blocks = []
//     results.forEach(function(res) {
//         blocks.push({
//             "type": "Feature",
//             "properties": {
//                 "name": Math.random()
//             },
//             "geometry": {
//                 "type": "Polygon",
//                 "coordinates": res
//             }
//         });
//     });
//     map.getSource('block_boundaries').setData({
//         "type": "FeatureCollection",
//         "features": blocks
//     });
// }

function getProperties(results) {
    var req = {
        "block_ids": results
    }
    $.ajax({
        type: "POST",
        url: "https://retailapi.theamp.com/properties",
        data: JSON.stringify(req),
        contentType: "json",
        success: function(data) {
            $('.marker').remove();
            data.response.forEach(function(item) {
                createMarker(item.lat, item.long, 'first', item.name);
            });
        }
    });
}

function createMarker(lat, lng, id, popupText, img) {
    $('.marker').remove();
    var lngLat = [lng, lat];
    var popup = new window.mapboxgl.Popup({
            offset: 25
        })
        .setHTML('<div class="marker-popup"><div class="marker-popup-img" style="background-image: url(https://maps.googleapis.com/maps/api/streetview?location=' + lat + ',' + lng + '&size=300x300&key=AIzaSyBXkG_joIB9yjAP94-L6S-GLTWnj7hYmzs);"></div><div class="marker-popup-desc"><span style="font-size:12pt; color:#000;">' + popupText + '</span></div></div>');
    // create DOM element for the marker
    var el = document.createElement('div');
    el.id = id;
    el.className = 'marker';
    el.setAttribute('lat', lat);
    el.setAttribute('lng', lng);
    el.setAttribute('address', popupText);
    el.onclick = function() {
        map.flyTo({
            center: [lng, lat],
            zoom: 14
        });
    }
    // create the marker
    new window.mapboxgl.Marker(el, {
            offset: [-25, -25]
        })
        .setLngLat(lngLat)
        .setPopup(popup)
        .addTo(map);
}

function createListingMarker(lat, lng, id, listingId, popupText, img) {
    $('.marker').remove();
    var lngLat = [lng, lat];
    var popup = new window.mapboxgl.Popup({
            offset: 25
        })
        .setHTML('<div class="marker-popup"><div class="marker-popup-img" style="background-image: url(https://maps.googleapis.com/maps/api/streetview?location=' + lat + ',' + lng + '&size=300x300&key=AIzaSyBXkG_joIB9yjAP94-L6S-GLTWnj7hYmzs);"></div><div class="marker-popup-desc"><span style="font-size:12pt; color:#000;">' + popupText + '</span></div></div>');
    // create DOM element for the marker
    var el = document.createElement('div');
    el.id = id;
    el.className = 'marker listingmarker';
    el.setAttribute('lat', lat);
    el.setAttribute('lng', lng);
    el.setAttribute('address', popupText);
    el.setAttribute('listing_id', listingId);
    el.onclick = function() {
        map.flyTo({
            center: [lng, lat],
            zoom: 14
        });
    }
    // create the marker
    new window.mapboxgl.Marker(el, {
            offset: [-25, -25]
        })
        .setLngLat(lngLat)
        .setPopup(popup)
        .addTo(map);
}

function createSavedMarker(lat, lng, id, popupText, img) {
    var lngLat = [lng, lat];
    var popup = new window.mapboxgl.Popup({
            offset: 25
        })
        .setHTML('<div class="marker-popup"><div class="marker-popup-img" style="background-image: url(https://maps.googleapis.com/maps/api/streetview?location=' + lat + ',' + lng + '&size=300x300&key=AIzaSyBXkG_joIB9yjAP94-L6S-GLTWnj7hYmzs);"></div><div class="marker-popup-desc"><span style="font-size:12pt; color:#000;">' + popupText + '</span></div></div>');
    // create DOM element for the marker
    var el = document.createElement('div');
    el.id = id;
    el.className = 'saved-marker';
    el.setAttribute('lat', lat);
    el.setAttribute('lng', lng);
    el.setAttribute('address', popupText);
    el.onclick = function() {
        map.flyTo({
            center: [lng, lat],
            zoom: 14
        });
    }
    // create the marker
    new window.mapboxgl.Marker(el, {
            offset: [-25, -25]
        })
        .setLngLat(lngLat)
        .setPopup(popup)
        .addTo(map);
}

function createPoiMarker(lat, lng, popupText) {
    var id = Math.random();
    var lngLat = [lng, lat];
    var popup = new window.mapboxgl.Popup({
            offset: 25
        })
        .setHTML('<div class="marker-popup"><div class="marker-popup-img" style="background-image: url(https://maps.googleapis.com/maps/api/streetview?location=' + lat + ',' + lng + '&size=300x300&key=AIzaSyBXkG_joIB9yjAP94-L6S-GLTWnj7hYmzs);"></div><div class="marker-popup-desc"><span style="font-size:12pt; color:#000;">' + popupText + '</span></div></div>');
    // create DOM element for the marker
    var el = document.createElement('div');
    el.id = id;
    el.className = 'poi-marker';
    el.setAttribute('lat', lat);
    el.setAttribute('lng', lng);
    el.setAttribute('address', popupText);
    // create the marker
    new window.mapboxgl.Marker(el, {
            offset: [-25, -25]
        })
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(map);
}


const Client = {
    createSavedMarker,
    getPois,
    createPoiMarker,
    removePois,
    flyToLocation,
    getMapPois,
    drawZip,
    hideZip,
    changeMap,
    getZipsFromBounds,
    drawFilteredZips,
    filterZips,
    clearDrawnZips,
    drawZipAndFlyTo,

    updateListings
};
export default Client;
