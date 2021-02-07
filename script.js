var searchBtn = document.getElementById("search-button");
var searchHistoryDiv = document.getElementById("search-history-div");
var searchBar = document.getElementById("search-bar");
var apiKey = "6d3eebb8385c27dd48a391051273f03c";
var searchedArray = [];
//first attempt at dynamic button creation. technically correct, but more complicated.

searchBtn.addEventListener("click", addButton)

function addButton(){
  console.log("button works!");
  // var createdHistoryBtns = document.createElement("a");
  // createdHistoryBtns.innerText = searchBar.value;
  // createdHistoryBtns.classList.add("btn", "btn-primary");
  // createdHistoryBtns.setAttribute("href"); //<---Put the URLs for each ajax call here
  //   addCity(searchBar.value);
};

function showButtons(){
    $("#search-history-div").empty();

    var cityList = JSON.parse(localStorage.getItem("cityList"));
    var searchHistoryButtons =  "";
    //loop through cities
    cityList.forEach((city, i) => {
        searchHistoryButtons += `<div class="row"><button class="search-history-buttons btn btn-primary">${city}</button></div>`;
    });

    $("#search-history-div").append(searchHistoryButtons);
     
}

function addCity(cityName){
   //add to local storage
   console.log(cityName)
}
//first ajax call gets lon and lat, second uses lon and lat to make another call so we can search by city name
function getWeatherData(city) {
  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`,
    method: "GET",
  }).then(function (response) {
    const { lat, lon } = response.coord;
    $.ajax({
      url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`,
      method: "GET",
    }).then(function (response2) {
      showWeather(response2.current, response2.daily);
    });
  });
}
//displays current weather in the jumbotron, as well as 5-day forecast. looks for currentWeather and fiveDayWeather as info/objects.
function showWeather(currentWeather, fiveDayWeather) {
  $("#currentWeather").empty();
  $("#fiveDay").empty();

  console.log(currentWeather);
  var htmlCurrent = `<div class="jumbotron jumbotron-fluid">
    <div class="container">
      <h3 class="display-4">${moment().format("l")}</h3>
      <p class="lead">${currentWeather.temp}</p>
    </div>
  </div>`;

  $("#currentWeather").append(htmlCurrent);

  console.log(fiveDayWeather);
  //forEach replaces for loop, dynamically creates and appends html code below to hard-coded id, data to be filled by exploring the ajax call objects, variables seen in html code below.
  var html5Day = "";
  fiveDayWeather.forEach((day, i) => {
    //limits 5-day cards to, in fact, 5 cards.
    if (i < 5) {
      html5Day += `<div class="col=md-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${day.dt}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Temp: ${day.temp}</h6>
            <p class="card-text">Humidity: ${day.humidity}%</p>
          </div>
        </div>
      </div>`;
    }
  });

  $("#fiveDay").append(html5Day);
}

getWeatherData("Atlanta");
showButtons();

// var testFive = [
//     {dt: "09/17/2020", temp:"60", humidity:"65%"},
//     {dt: "09/18/2020", temp:"60", humidity:"65%"},
//     {dt: "09/19/2020", temp:"60", humidity:"65%"},
//     {dt: "09/20/2020", temp:"60", humidity:"65%"},
//     {dt: "09/21/2020", temp:"60", humidity:"65%"}
// ]
// showWeather({}, testFive)

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast
// ```
