$(document).ready(function(){
  worker();

  function worker() {
    $.ajax({
      url: "http://localhost:5000/api/getEmergencies",
        type: 'get',
        contentType: 'application/x-www-form-urlencoded',   
        dataType: 'json',  

      success: function(data) {
        // alert(JSON.stringify(data.emergencies[0]));

        var geojson = {
            type: 'FeatureCollection',
            features: [{
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [data.emergencies[0].longitude, data.emergencies[0].latitude]
              },
              properties: {
                title: 'MedKey',
                description: data.emergencies[0].medikey
              }
            },
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [-122.414, 37.776]
              },
              properties: {
                title: 'Mapbox',
                description: 'San Francisco, California'
              }
            }]
          };

             //     // add markers to map
      geojson.features.forEach(function(marker) {
      
      // create a HTML element for each feature
      var el = document.createElement('div');
      el.className = 'marker';
      
      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
      .setHTML('<h5>' + marker.properties.title + '</h5><p>' + marker.properties.description + '</p>'))
      .addTo(map);
      });
      },
      complete: function() {
        // Schedule the next request when the current one's complete
        setTimeout(worker, 5000);
      }
    });
  };
})
  