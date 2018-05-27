---
---

var locations = {{ site.locations | jsonify }}

function positionFor(loc) {
  var bits = loc.pos.split(',');
  return {
    lat: parseFloat(bits[0]),
    lng: parseFloat(bits[1])
  };
}

function titleFor(loc) {
  return loc.title;
}

function colorFor(category) {
  var result = 'white';
  if (category == 'protected') {
    result = 'green';
  } else if (category == 'threatened') {
    result = 'yellow';
  } else if (category == 'lost') {
    result = 'red';
  }
  return result;
}

function iconFor(loc) {
  var color = colorFor(loc.category);
  return 'http://maps.google.com/mapfiles/ms/icons/' + color + '-dot.png';
}

// This example creates a simple polygon representing the Bermuda Triangle.
// When the user clicks on the polygon an info window opens, showing
// information about the polygon's coordinates.

var map;
var infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    mapTypeId: 'terrain'
  });

  var bounds = new google.maps.LatLngBounds();
  locations.forEach(function(loc) {
    bounds.extend(positionFor(loc));
    var marker = new google.maps.Marker({
      position: positionFor(loc),
      map: map,
      title: titleFor(loc),
      icon: iconFor(loc)
    });
    marker.addListener('click', function(event) {
      showLocationInfo(loc);
    });
  });

  map.addListener('click', function(event) {
    infoWindow.close();
  });

  map.fitBounds(bounds);

  infoWindow = new google.maps.InfoWindow();
}

function showLocationInfo(loc) {

  var contentString = '<b>' + loc.title + '</b>' +
      '<br><a href="' + loc.url + '">See details</a>';

  // Replace the info window's content and position.
  infoWindow.setContent(contentString);
  infoWindow.setPosition(positionFor(loc));

  infoWindow.open(map);
}
