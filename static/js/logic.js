
// var points = L.layerGroup();
// https://docs.mapbox.com/mapbox-gl-js/example/cluster/
// note # earthquakes in original comments  have been changed to HMdb-Markers
// Use this link to get the geojson data.
mapboxgl.accessToken = API_KEY;

var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/dark-v10',
center: [-90.4194, 37.7749],
zoom: 2.6
});

// add fullscreen button
map.addControl(new mapboxgl.FullscreenControl());
// add zoom in/out & compass  
map.addControl(new mapboxgl.NavigationControl());

function HMBD() {
    var HistoricalMarker =
    // Add a new source from our GeoJSON data and
    // set the 'cluster' option to true. GL-JS will
    // add the point_count property to your source data.
    map.addSource('HMdb-Markers', {
    type: 'geojson',
    
    // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
    // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        data:
        '/static/data/HMdb-Markers.geojson',
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
        
    });
    
    map.addLayer({
    id: 'clusters',
    type: 'circle',
    source: 'HMdb-Markers',
    filter: ['has', 'point_count'],
    paint: {
    // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
    // with three steps to implement three types of circles:
    //   * Blue, 20px circles when point count is less than 100
    //   * Yellow, 30px circles when point count is between 100 and 750
    //   * Pink, 40px circles when point count is greater than or equal to 750
    'circle-color': [
    'step',
    ['get', 'point_count'],
    '#9d99ff',
    100,
    '#5a54ff',
    750,
    '#0800ff'
    ],
    'circle-radius': [
    'step',
    ['get', 'point_count'],
    20,
    100,
    30,
    750,
    40
    ]
    }
    });
    
    map.addLayer({
    id: 'cluster-count',
    type: 'symbol',
    source: 'HMdb-Markers',
    filter: ['has', 'point_count'],
    layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 12
    }
    })
    ;
    
    map.addLayer({
    id: 'unclustered-point',
    type: 'circle',
    source: 'HMdb-Markers',
    filter: ['!', ['has', 'point_count']],
    paint: {
    'circle-color': '#11b4da',
    'circle-radius': 4,
    'circle-stroke-width': 1,
    'circle-stroke-color': '#fff'
    }
    });
    
        // inspect a cluster on click
        map.on('click', 'clusters', function(e) {
        var features = map.queryRenderedFeatures(e.point, {
        layers: ['clusters']
        });
        var clusterId = features[0].properties.cluster_id;
        map.getSource('HMdb-Markers').getClusterExpansionZoom(
        clusterId,
        function(err, zoom) {
        if (err) return;
        
        map.easeTo({
        center: features[0].geometry.coordinates,
        zoom: zoom
        });
        }
        );
        });
        
        // When a click event occurs on a feature in
        // the unclustered-point layer, open a popup at
        // the location of the feature, with
        // description HTML from its properties.
        map.on('click', 'unclustered-point', function(e) {

        var coordinates = e.features[0].geometry.coordinates.slice();

        console.log(coordinates)
        var Title = e.features[0].properties.Title;
        var Link = e.features[0].properties.Link;
        
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        
        new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(`<p><a href=${Link}> ${Title} </a></p>`
        )
        .addTo(map);
        
        });
        
        map.on('mouseenter', 'clusters', function() {
        map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'clusters', function() {
        map.getCanvas().style.cursor = '';
        });
// points.addLayer(HistoricalMarker);
};



   
// ## second dataset who's heritage is it anyway cluster map
// 
function confed() {
    // Add a new source from our GeoJSON data and
    // set the 'cluster' option to true. GL-JS will
    // add the point_count property to your source data.
    map.addSource('confed-Markers', {
    
    type: 'geojson',
    // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
    // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
    data:
    '/static/data/whos_heritage_lat_long3.geojson',
    cluster: true,
    clusterMaxZoom: 14, // Max zoom to cluster points on
    clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    });
     
    
    
    map.addLayer({
    id: 'clusters-confed',
    type: 'circle',
    source: 'confed-Markers',
    filter: ['has', 'point_count'],
    paint: {
    // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
    // with three steps to implement three types of circles:
    //   * Blue, 20px circles when point count is less than 100
    //   * Yellow, 30px circles when point count is between 100 and 750
    //   * Pink, 40px circles when point count is greater than or equal to 750
    'circle-color': [
    'step',
    ['get', 'point_count'],
    '#ffa696',
    100,
    '#ed7a1c',
    750,
    '#fc0000'
    ],
    'circle-radius': [
    'step',
    ['get', 'point_count'],
    20,
    100,
    30,
    750,
    40
    ]
    }
    });
     
    map.addLayer({
    id: 'cluster-count-confed',
    type: 'symbol',
    source: 'confed-Markers',
    filter: ['has', 'point_count'],
    layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 12
    }
    });

map.addLayer({
    id: 'unclustered-point-confed',
    type: 'circle',
    source: 'confed-Markers',
    filter: ['!', ['has', 'point_count']],
    paint: {
    'circle-color': '#c23313',
    'circle-radius': 4,
    'circle-stroke-width': 1,
    'circle-stroke-color': '#fff'
    }
    });

// inspect a cluster on click
map.on('click', 'clusters-confed', function(e) {
    var features = map.queryRenderedFeatures(e.point, {
    layers: ['clusters-confed']
    });
    var clusterId = features[0].properties.cluster_id;
    map.getSource('confed-Markers').getClusterExpansionZoom(
    clusterId,
    function(err, zoom) {
    if (err) return;
     
    map.easeTo({
    center: features[0].geometry.coordinates,
    zoom: zoom
    });
    }
    );
    });
     
    // When a click event occurs on a feature in
    // the unclustered-point layer, open a popup at
    // the location of the feature, with
    // description HTML from its properties.
    map.on('click', 'unclustered-point-confed', function(e) {
    var coordinates = e.features[0].geometry.coordinates.slice();
    var Title = e.features[0].properties.feature_name;
    var Honorees = e.features[0].properties.Honorees;

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    
    new mapboxgl.Popup()
    .setLngLat(coordinates)
    .setHTML(
     `<p>${Honorees} ${Title} </a></p>`
    )
    // .setclass('')
    .addTo(map);
    // e.stopPropagation();
    });
     
    map.on('mouseenter', 'clusters-confed', function() {
    map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'clusters-confed', function() {
    map.getCanvas().style.cursor = '';
    });

};

function removeHMDBLayer(){ try {
    // remove HMbd layers
    map.removeLayer('clusters');
    map.removeLayer('cluster-count');
    map.removeLayer('unclustered-point');
    map.removeSource('HMdb-Markers');
}catch(err) {}
};
function removeConfedLayer() { try {
    // remove who's heritage markers 
    map.removeLayer('clusters-confed');
    map.removeLayer('cluster-count-confed');
    map.removeLayer('unclustered-point-confed');
    map.removeSource('confed-Markers');
}catch(err){}
};

function toggleCheck() {
    if(document.getElementById("dataSwitch").checked === true){
        removeConfedLayer();HMBD();
        update(csv1)
    } else {
      removeHMDBLayer();confed();
      update(csv2)
    }
  }
  
  $(function(){
    $('.toggle').on('click', function(event){
      event.preventDefault();
      $(this).toggleClass('active');
    });
  });

