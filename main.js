var countryCodes ;
var callOnce = true;
 blah = async () => {
  await fetch('https://ashikpaul.github.io/CountriesJson/countryCodes.json')
  .then(response => response.json())
  .then(data => {
    if(callOnce){
      callOnce = false;
      countryCodes = data;
    }
    else{
      callOnce = true;
    }
  });

  await fetch('https://api.covid19api.com/countries', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    if(callOnce){
      callOnce = false;
      showCountries(data);
    }
    else{
      callOnce = true;
    }
  });
}
blah();
showCountries = async (countries) => {
  for(coun in countries){
    await fetch('https://api.covid19api.com/total/country/'+countries[coun].Slug)
      .then(response => response.json())
      .then(data => {
        if(data.length)
          // console.log([countryCodes.filter((c)=> c.country_code == countries[coun].ISO2)[0].latlng,data[data.length - 1].Country,data[data.length -1].Active, data[data.length -1].Recovered]);
          console.log(countries[coun].Country, countries[coun].ISO2, countryCodes.filter((c)=> c.country_code == countries[coun].ISO2)[0].latlng);
          L.circle(countryCodes.filter((c)=> c.country_code == countries[coun].ISO2)[0].latlng, data[data.length -1].Recovered, {
            color: 'darkgreen',
            fillColor: '#90EE90',
            fillOpacity: 0.5
          }).addTo(mymap).bindPopup("I am a circle.");
          L.circle(countryCodes.filter((c)=> c.country_code == countries[coun].ISO2)[0].latlng, data[data.length -1].Active, {
            color: 'red',
            fillColor: 'red',
            fillOpacity: 0.5
          }).addTo(mymap).bindPopup("I am a circle.");
      }).catch((err)=>{
        //log error
      });
  }
};

var mymap = L.map('mapid').setView([22, 77], 3);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYXNoaWtwYXVsIiwiYSI6ImNrYWFwdWlqYjB1dHYzMnM5ZmhybXoweXUifQ.c-RJnUB83cyvk-o0iUnhQQ'
}).addTo(mymap);
// L.marker([13.034966, 77.637938]).addTo(mymap);
// var Jawg_Terrain = L.tileLayer('https://{s}.tile.jawg.io/jawg-terrain/{z}/{x}/{y}{r}.png?access-token={pk.eyJ1IjoiYXNoaWtwYXVsIiwiYSI6ImNrYWFwdWlqYjB1dHYzMnM5ZmhybXoweXUifQ.c-RJnUB83cyvk-o0iUnhQQ}', {
// 	attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// 	maxZoom: 18,
//   id: 'mapbox/streets-v11',
//   tileSize: 512,
//   zoomOffset: -1,
//   accessToken: 'pk.eyJ1IjoiYXNoaWtwYXVsIiwiYSI6ImNrYWFwdWlqYjB1dHYzMnM5ZmhybXoweXUifQ.c-RJnUB83cyvk-o0iUnhQQ'
// }).addTo(mymap);
// var OpenRailwayMap = L.tileLayer('https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png', {
// 	maxZoom: 19,
// 	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Map style: &copy; <a href="https://www.OpenRailwayMap.org">OpenRailwayMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
// }).addTo(mymap);

//   .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

// L.circle([51.508, -0.11], 500, {
//   color: 'red',
//   fillColor: '#f03',
//   fillOpacity: 0.5
// }).addTo(mymap).bindPopup("I am a circle.");

// L.polygon([
//   [51.509, -0.08],
//   [51.503, -0.06],
//   [51.51, -0.047]
// ]).addTo(mymap).bindPopup("I am a polygon.");


// var popup = L.popup();

// function onMapClick(e) {
//   popup
//     .setLatLng(e.latlng)
//     .setContent("You clicked the map at " + e.latlng.toString())
//     .openOn(mymap);
// }

// mymap.on('click', onMapClick);

