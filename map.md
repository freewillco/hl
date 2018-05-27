---
layout: page
title: Map
---

<style>
  /* Always set the map height explicitly to define the size of the div
    * element that contains the map. */
  #map {
    /* height: 100%; */
    height: 400px;
  }
  /* Optional: Makes the sample page fill the window. */
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
  }
</style>

<div>
  <h4>Habitat Loss Dashboard - Niagara Region</h4>
  <ul>
    <li>The regions shown in red have been lost</li>
    <li>The regions shown in yellow are in imminent danger of being lost</li>
    <li>The regions shown in green still exist: enjoy them, protect them</li>
  </ul>
</div>
<div id="map"></div>
<script src="map.js"></script>
<script async defer
src="https://maps.googleapis.com/maps/api/js?callback=initMap&key=AIzaSyDxnWGHKaNlC6mgz9Mn3UdSVcRaBo9brT4">
</script>
