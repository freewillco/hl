---
---
var locations = {{ site.locations | jsonify }}
// console.log(locations);

var positions = locations.map(function(loc) {
  return loc.pos;
});
console.log(positions);

var coords = locations.map(function(loc) {
  var bits = loc.pos.split(',');
  return {
    lat: parseFloat(bits[0]),
    lng: parseFloat(bits[1])
  };
});


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


var url = 'https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.98284&key=AIzaSyDxnWGHKaNlC6mgz9Mn3UdSVcRaBo9brT4';

// markers=color:blue%7Clabel:1%7C42,-80&markers=color:blue%7Clabel:1%7C41,-80&markers=color:blue%7Clabel:1%7C41,-81&markers=color:blue%7Clabel:1%7C41.5,-79&markers=color:blue%7Clabel:1%7C42.2,-81

var markers = locations.map(function(loc) {
  if (loc.category == 'protected') {
    color = 'green';
  } else if (loc.category == 'threatened') {
    color = 'yellow';
  } else if (loc.category == 'lost') {
    color = 'red';
  }
  console.log(loc.category);
  return 'markers=color:' + color + '|label:1|' + loc.pos;
});
console.log(markers);

var markersList = markers.map(encodeURI).join('&');
console.log(markersList);

url = 'https://maps.googleapis.com/maps/api/staticmap?size=600x300&maptype=roadmap&' + markersList;
url = url + '&key=AIzaSyDxnWGHKaNlC6mgz9Mn3UdSVcRaBo9brT4';

var link = '<img src="' + url + '"></img>';
console.log(link);
document.write(link);

// This example creates a simple polygon representing the Bermuda Triangle.
// When the user clicks on the polygon an info window opens, showing
// information about the polygon's coordinates.

var map;
var infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    // center: {lat: 43.058079, lng: -79.289132},
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
    marker.addListener('click', showArrays);
  });

  map.fitBounds(bounds);

  // Define the LatLng coordinates for the polygon.
  var triangleCoords = [
    {lat: 43.058079, lng: -79.289132},
    {lat: 43.158079, lng: -79.289132},
    {lat: 43.138079, lng: -79.339132},
    {lat: 43.088079, lng: -79.389132},
    {lat: 43.058079, lng: -79.289132}
  ];

  // Construct the polygon.
  var bermudaTriangle = new google.maps.Polygon({
    paths: triangleCoords,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 3,
    fillColor: '#FF0000',
    fillOpacity: 0.35
  });
  bermudaTriangle.setMap(map);

  // Add a listener for the click event.
  bermudaTriangle.addListener('click', showArrays);

  infoWindow = new google.maps.InfoWindow;
}

/** @this {google.maps.Polygon} */
function showArrays(event) {
  // Since this polygon has only one path, we can call getPath() to return the
  // MVCArray of LatLngs.
  // var vertices = this.getPath();

  var contentString = '<b>Hendershot Boulevard & Garner Road, Niagara Falls</b>' +
      '<br>Mature forests in 1934 would have been continually forested since at least the 1850’s - 1830’s making this a remnant of the original Carolinian forest.' +
      '<br><a href="/locations/hendershot-blvd.html">Read more</a>';

  // Replace the info window's content and position.
  infoWindow.setContent(contentString);
  infoWindow.setPosition(event.latLng);

  infoWindow.open(map);
}
