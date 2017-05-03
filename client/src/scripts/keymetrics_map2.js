import $ from 'jquery';
import arrive from 'arrive';

$(document).arrive('#mini-map', function() {
    window.mapboxgl.accessToken = 'pk.eyJ1IjoiZGV4aG9uc2EiLCJhIjoiY2luejFndTViMThsNnUya2o5bThpemRsaSJ9.GFlYLJmm5XmM-cGc57UH9g';
    var map = new window.mapboxgl.Map({
        container: 'mini-map', // container id
        style: 'mapbox://styles/dexhonsa/cj1pfxfrm00282ro9xwbv905b', //stylesheet location
        center: [
            -95.7129, 37.0902
        ], // starting position
        zoom: 4 // starting zoom
    });
    //map.doubleClickZoom.disable();
    //map.scrollZoom.disable();
    map.on('load', function() {
        map.on('mousemove',function(e){
          console.log('moving');
        })
        map.addSource('poi_markers', {
            "type": 'geojson',
            "data": {
                "type": "FeatureCollection",
                "features": [
                    {
                        "type": "Feature",
                        "properties": {
                            "description": "<strong>Make it Mount Pleasant</strong><p><a href=\"http://www.mtpleasantdc.com/makeitmtpleasant\" target=\"_blank\" title=\"Opens in a new window\">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>",
                            "icon": "theatre"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-77.038659, 38.931567]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "description": "<strong>Make it Mount Pleasant</strong><p><a href=\"http://www.mtpleasantdc.com/makeitmtpleasant\" target=\"_blank\" title=\"Opens in a new window\">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>",
                            "icon": "theatre"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-77.238122, 38.9345443]
                        }
                    }
                ]
            },
            cluster: true,
            clusterMaxZoom: 14, // Max zoom to cluster points on
            clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
        });

        map.addLayer({
            id: "clusters",
            type: "circle",
            source: "poi_markers",
            filter: [
                "has", "point_count"
            ],
            paint: {
                "circle-color": {
                    property: "point_count",
                    type: "interval",
                    stops: [
                        [
                            0, "#51bbd6"
                        ],
                        [
                            100, "#f1f075"
                        ],
                        [750, "#f28cb1"]
                    ]
                },
                "circle-radius": {
                    property: "point_count",
                    type: "interval",
                    stops: [
                        [
                            0, 20
                        ],
                        [
                            100, 30
                        ],
                        [750, 40]
                    ]
                }
            }
        });

        map.addLayer({
            id: "cluster-count",
            type: "symbol",
            source: "poi_markers",
            filter: [
                "has", "point_count"
            ],
            layout: {
                "text-field": "{point_count_abbreviated}",
                "text-font": [
                    "DIN Offc Pro Medium", "Arial Unicode MS Bold"
                ],
                "text-size": 12
            }
        });

        map.addLayer({
            id: "unclustered-point",
            type: "symbol",
            source: 'poi_markers',
            filter: [
                "!has", "point_count"
            ],
            // paint: {
            //     "circle-color": "#11b4da",
            //     "circle-radius": 25,
            //     "circle-stroke-width": 1,
            //     "circle-stroke-color": "#fff"
            // },
            layout: {
                "icon-image": "{icon}-15",
                "icon-allow-overlap": true
            }
        });

        map.addLayer({
            "id": "places",
            "type": "symbol",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": [
                        {
                            "type": "Feature",
                            "properties": {
                                "description": "<strong>Make it Mount Pleasant</strong><p><a href=\"http://www.mtpleasantdc.com/makeitmtpleasant\" target=\"_blank\" title=\"Opens in a new window\">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>",
                                "icon": "theatre"
                            },
                            "geometry": {
                                "type": "Point",
                                "coordinates": [-77.038659, 38.931567]
                            }
                        }, {
                            "type": "Feature",
                            "properties": {
                                "description": "<strong>Mad Men Season Five Finale Watch Party</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a <a href=\"http://madmens5finale.eventbrite.com/\" target=\"_blank\" title=\"Opens in a new window\">Mad Men Season Five Finale Watch Party</a>, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>",
                                "icon": "theatre"
                            },
                            "geometry": {
                                "type": "Point",
                                "coordinates": [-77.003168, 38.894651]
                            }
                        }, {
                            "type": "Feature",
                            "properties": {
                                "description": "<strong>Big Backyard Beach Bash and Wine Fest</strong><p>EatBar (2761 Washington Boulevard Arlington VA) is throwing a <a href=\"http://tallulaeatbar.ticketleap.com/2012beachblanket/\" target=\"_blank\" title=\"Opens in a new window\">Big Backyard Beach Bash and Wine Fest</a> on Saturday, serving up conch fritters, fish tacos and crab sliders, and Red Apron hot dogs. 12:00-3:00 p.m. $25.grill hot dogs.</p>",
                                "icon": "bar"
                            },
                            "geometry": {
                                "type": "Point",
                                "coordinates": [-77.090372, 38.881189]
                            }
                        }, {
                            "type": "Feature",
                            "properties": {
                                "description": "<strong>Ballston Arts & Crafts Market</strong><p>The <a href=\"http://ballstonarts-craftsmarket.blogspot.com/\" target=\"_blank\" title=\"Opens in a new window\">Ballston Arts & Crafts Market</a> sets up shop next to the Ballston metro this Saturday for the first of five dates this summer. Nearly 35 artists and crafters will be on hand selling their wares. 10:00-4:00 p.m.</p>",
                                "icon": "art-gallery"
                            },
                            "geometry": {
                                "type": "Point",
                                "coordinates": [-77.111561, 38.882342]
                            }
                        }, {
                            "type": "Feature",
                            "properties": {
                                "description": "<strong>Seersucker Bike Ride and Social</strong><p>Feeling dandy? Get fancy, grab your bike, and take part in this year's <a href=\"http://dandiesandquaintrelles.com/2012/04/the-seersucker-social-is-set-for-june-9th-save-the-date-and-start-planning-your-look/\" target=\"_blank\" title=\"Opens in a new window\">Seersucker Social</a> bike ride from Dandies and Quaintrelles. After the ride enjoy a lawn party at Hillwood with jazz, cocktails, paper hat-making, and more. 11:00-7:00 p.m.</p>",
                                "icon": "bicycle"
                            },
                            "geometry": {
                                "type": "Point",
                                "coordinates": [-77.052477, 38.943951]
                            }
                        }, {
                            "type": "Feature",
                            "properties": {
                                "description": "<strong>Capital Pride Parade</strong><p>The annual <a href=\"http://www.capitalpride.org/parade\" target=\"_blank\" title=\"Opens in a new window\">Capital Pride Parade</a> makes its way through Dupont this Saturday. 4:30 p.m. Free.</p>",
                                "icon": "star"
                            },
                            "geometry": {
                                "type": "Point",
                                "coordinates": [-77.043444, 38.909664]
                            }
                        }, {
                            "type": "Feature",
                            "properties": {
                                "description": "<strong>Muhsinah</strong><p>Jazz-influenced hip hop artist <a href=\"http://www.muhsinah.com\" target=\"_blank\" title=\"Opens in a new window\">Muhsinah</a> plays the <a href=\"http://www.blackcatdc.com\">Black Cat</a> (1811 14th Street NW) tonight with <a href=\"http://www.exitclov.com\" target=\"_blank\" title=\"Opens in a new window\">Exit Clov</a> and <a href=\"http://godsilla.bandcamp.com\" target=\"_blank\" title=\"Opens in a new window\">Gods’illa</a>. 9:00 p.m. $12.</p>",
                                "icon": "music"
                            },
                            "geometry": {
                                "type": "Point",
                                "coordinates": [-77.031706, 38.914581]
                            }
                        }, {
                            "type": "Feature",
                            "properties": {
                                "description": "<strong>A Little Night Music</strong><p>The Arlington Players' production of Stephen Sondheim's  <a href=\"http://www.thearlingtonplayers.org/drupal-6.20/node/4661/show\" target=\"_blank\" title=\"Opens in a new window\"><em>A Little Night Music</em></a> comes to the Kogod Cradle at The Mead Center for American Theater (1101 6th Street SW) this weekend and next. 8:00 p.m.</p>",
                                "icon": "music"
                            },
                            "geometry": {
                                "type": "Point",
                                "coordinates": [-77.020945, 38.878241]
                            }
                        }, {
                            "type": "Feature",
                            "properties": {
                                "description": "<strong>Truckeroo</strong><p><a href=\"http://www.truckeroodc.com/www/\" target=\"_blank\">Truckeroo</a> brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>",
                                "icon": "music"
                            },
                            "geometry": {
                                "type": "Point",
                                "coordinates": [-77.007481, 38.876516]
                            }
                        }
                    ]
                }
            },
            "layout": {
                "icon-image": "{icon}-15",
                "icon-allow-overlap": true
            }
        });

        var popup = new window.mapboxgl.Popup({closeButton: false, closeOnClick: false});

        map.on('mouseenter', 'places', function(e) {
            console.log('enter');
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';

            // Populate the popup and set its coordinates
            // based on the feature found.
            popup.setLngLat(e.features[0].geometry.coordinates).setHTML(e.features[0].properties.description).addTo(map);
        });

        map.on('mouseleave', 'unclustered-point', function() {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });

    })

});
