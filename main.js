var countryCodes ;
var callOnce = true;
var mymap = L.map('mapid').setView([0, 0], 3);

searchCountry = () =>{
 var country = document.getElementById("searchCountry").value;
 mymap.setView(countryCodes.filter((c)=> c.name.toLowerCase() == country.toLowerCase())[0].latlng,6);
}

blah = async () => {
  await fetch('https://ashikpaul.github.io/CountriesJson/countryCodes.json')
  .then(response => response.json())
  .then(data => {
    // if(callOnce){
    //   callOnce = false;
      countryCodes = data;
    // }
    // else{
    //   callOnce = true;
    // }
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
    // if(callOnce){
    //   callOnce = false;
      showCountries(data);
    // }
    // else{
    //   callOnce = true;
    // }
  });
}
blah();
showCountries = async (countries) => {
  for(coun in countries){
    await fetch('https://api.covid19api.com/total/country/'+countries[coun].Slug)
      .then(response => response.json())
      .then(data => {
        if(data.length){         
          L.circle(countryCodes.filter((c)=> c.country_code == countries[coun].ISO2)[0].latlng, data[data.length -1].Recovered, {
            color: 'darkgreen',
            fillColor: '#90EE90',
            fillOpacity: 0.5
          }).addTo(mymap).bindPopup("<b>Recoverd</b>:"+data[data.length -1].Recovered.toString()+"  <b> Active</b>:"+data[data.length -1].Active.toString())
          .on('mouseover', function(e){
            this.openPopup();
          }).on('mouseout', function (e) {
            this.closePopup();
          });
          L.circle(countryCodes.filter((c)=> c.country_code == countries[coun].ISO2)[0].latlng, data[data.length -1].Active, {
            color: 'red',
            fillColor: 'red',
            fillOpacity: 0.5
          }).addTo(mymap).bindPopup("<b>Recoverd</b>:"+data[data.length -1].Recovered.toString()+"<br/><b>Active</b>:"+data[data.length -1].Active.toString())
          .on('mouseover', function(e){
            this.openPopup();
          }).on('mouseout', function (e) {
            this.closePopup();
          });
        }
      });
  }
};

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYXNoaWtwYXVsIiwiYSI6ImNrYWFwdWlqYjB1dHYzMnM5ZmhybXoweXUifQ.c-RJnUB83cyvk-o0iUnhQQ'
}).addTo(mymap);

