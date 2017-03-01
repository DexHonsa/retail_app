import $ from 'jquery';
import arrive from 'arrive';
    var map;
    var draw;
    var geocoder;
    var popup;

$(document).arrive('#map', function(){
    refreshMap();
});

    function refreshMap(){


        window.mapboxgl.accessToken = 'pk.eyJ1IjoiZGV4aG9uc2EiLCJhIjoiY2luejFndTViMThsNnUya2o5bThpemRsaSJ9.GFlYLJmm5XmM-cGc57UH9g';
        map = new window.mapboxgl.Map({
            container: 'map', // container id
            style: 'mapbox://styles/dexhonsa/ciyaweb92003d2ss7g5neultw', //stylesheet location
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
        geocoder = new window.MapboxGeocoder({
            accessToken: window.mapboxgl.accessToken
        });
        popup = new window.mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });

        
        map.addControl(draw);
        map.doubleClickZoom.disable();
        map.on('dataloading', function() {
            $('.map-preloader').removeClass('hide-loader');
        });
        map.on("render", function() {
            if (map.loaded()) {
                $('.map-preloader').addClass('hide-loader');
            }
        });
        map.on('dragend', function() {
            updateMap();
        });
        map.on('zoomend', function() {
            updateMap();
        });
        map.on('load', function() {
            $('.map-preloader').addClass('hide-loader');
            map.addSource('poi_layer', {
                type: 'geojson',
                "data": {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-77.03238901390978, 38.913188059745586]
                        },
                        "properties": {
                            "title": "Mapbox DC",
                            "icon": "monument"
                        }
                    }]
                }
            });
            map.addSource('block_boundaries', {
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
            map.addLayer({
                "id": "block_boundaries",
                "type": "fill",
                "source": "block_boundaries",
                "paint": {
                    "fill-color": "#3080e8",
                    "fill-opacity": 0
                },
            });
            map.addLayer({
                "id": "block_boundaries-border",
                "type": "line",
                "source": "block_boundaries",
                "layout": {},
                "paint": {
                    "line-color": "#000",
                    "line-width": 1
                },
                "filter": ["==", "name", ""]
            });
            map.addLayer({
                "id": "block_boundaries-border-hover",
                "type": "line",
                "source": "block_boundaries",
                "layout": {},
                "paint": {
                    "line-color": "#ff0000",
                    "line-width": 2,
                },
                "filter": ["==", "name", ""]
            });
            map.addLayer({
                "id": "pois",
                "type": "symbol",
                "source": "poi_markers",
                "layout": {
                    "icon-image": "marker",
                    "icon-size": 1,
                    "text-field": "{title}",
                    "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                    "text-offset": [0, 0.6],
                    "text-anchor": "top",
                   
                }
            });
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

            



            map.on("mouseout", function() {
                map.setFilter("block_boundaries-border-hover", ["==", "name", ""]);
            });
        });
        
        map.addControl(geocoder);
        geocoder.on('result', function(ev) {
            console.log(ev);
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
            map.setFilter("block_boundaries-border-hover", ["==", "name", ""]);
            var features = map.queryRenderedFeatures(ev.point, {
                layers: ["block_boundaries"]
            });
            if (features.length) {
                map.setFilter("block_boundaries-border-hover", ["==", "name", features[0].properties.name]);
            } else {
                map.setFilter("block_boundaries-border-hover", ["==", "name", ""]);
            }
            var lat = ev.lngLat.lat;
            var lng = ev.lngLat.lng;
            var id = "marker-" + Math.floor((Math.random() * 100) + 1);
            var address = "";
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "%2C" + lng + "&key=AIzaSyBXkG_joIB9yjAP94-L6S-GLTWnj7hYmzs",
                "method": "GET",
                "headers": {
                }
            }
            $.ajax(settings).done(function(response) {
                address = response.results[0].formatted_address;
                createMarker(lat, lng, id, address);
            });
        })
        $('.draw-toggle').click(function() {
            var drawnPoly = draw.getAll();
            console.log(drawnPoly.features[0].geometry);
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
        $.ajax({
            type: "POST",
            url: "https://retailapi.theamp.com/demographics/get_geojson?search_by=bounding_box_area",
            data: JSON.stringify(coords),
            contentType: "json",
            success: function(data) {
                var block_ids = [];
                var block_coordinates = [];
                data.results.forEach(function(item) {
                    var lat = item.properties.INTPTLAT;
                    var lng = item.properties.INTPTLON;
                    var boundaries = item.geometry.coordinates;
                    block_coordinates.push(boundaries);
                    block_ids.push(item.id);
                });
                drawBlocks(block_coordinates);
                //getProperties(block_ids)
            }
        });
        //lalala
       //getPois();
    }
    function getPois(lat,lng) {
        
        
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
            types: ['store','food']
        };
        service = new window.google.maps.places.PlacesService(map2);
        service.nearbySearch(request, callback);
        var pois = [];

        function callback(results, status) {
            $('.poi-marker').remove();
            if (status == window.google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    var place = results[i];
                    pois.push(place);
                }
            }
        }
        
        var poiSource = [];


        setTimeout(function(){
        pois.forEach(function(item){
            //console.log(item);
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
                var features = map.queryRenderedFeatures(e.point, { layers: ['pois'] });
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
       
        },1000)
        return pois;
        
        
    }
    function removePois(){
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

    function flyToLocation(lat,lng){
        map.flyTo({
                center: [lng, lat],
                zoom: 16
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

    function drawBlocks(results) {
        var blocks = []
        results.forEach(function(res) {
            blocks.push({
                "type": "Feature",
                "properties": {
                    "name": Math.random()
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": res
                }
            });
        });
        map.getSource('block_boundaries').setData({
            "type": "FeatureCollection",
            "features": blocks
        });
    }

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
                zoom: 16
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
                zoom: 16
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
    
const Client = {createSavedMarker, getPois, createPoiMarker, removePois, flyToLocation};
export default Client;
    

