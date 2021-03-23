// 1.dispay current time and day
let currentTime = new Date();
let hours = currentTime.getUTCHours();  
let minutes = currentTime.getMinutes();
let day = currentTime.getUTCDay();

let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  " Saturday"
];

let h4 = document.querySelector("#time");
   h4.innerHTML = `Last updated at  ${hours}:${minutes}`;

if (hours < 10) {
     let h4 = document.querySelector("#time");
   h4.innerHTML = `Last updated at 0${hours}:${minutes}`;
 } 
 if (minutes < 10) {
    let h4 = document.querySelector("#time");
   h4.innerHTML = `Last updated at ${hours}:0${minutes}`;
 }
 let today = document.querySelector("#card-title-first");
today.innerHTML = `${weekDays[day]}`;
//dt 

function displayHours(timestamp) {
  let currentTime = new Date(timestamp);
let hours = currentTime.getUTCHours();  
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes= `0${minutes}`
}
if (hours < 10) {
  hours= `0${hours} `
}
return `${hours}:${minutes} `
}

//display the city name on the page after the user submits the form.

function searchingCity(event) {
  event.preventDefault();
  let inputCityName = document.querySelector("#input-city");
  let p = document.querySelector("p");
  p.innerHTML = `${inputCityName.value}`;
  search(inputCityName.value);
}

//
function showHourlyForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#first-forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
                            <div class="col-2">
                        <div class="card">
                            <div class="card-body-two">
                            <h5 class="card-title">${displayHours(
                              forecast.dt * 1000
                            )} </h5>
                            <img src="http://openweathermap.org/img/wn/${
                              forecast.weather[0].icon
                            }@2x.png">
                            <h6 class="card-subtitle">
                               ${Math.round(forecast.main.temp)}°C
                            </h6>
                            <p class="card-text">${
                              forecast.weather[0].description
                            }</p>
                           </div>
                           </div>
                           </div>`;
  }
}

function search(city) {
  let apiKey = "4b3a638fb4d48006da8ec9048f3f42e3";
  let apiUrl = ` https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showData);
  apiUrl= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric` ;
  axios.get(apiUrl).then(showHourlyForecast)
}


function showData(response) {
 console.log(response.data.main.temp);
 console.log(response);

 let currentTemp = response.data.main.temp;
 celsiusTemperature=response.data.main.temp;
  let tempNote = document.querySelector("#temperature");
  tempNote.innerHTML = `${Math.round(currentTemp)}`;
  let note= document.querySelector("#note");
  note.innerHTML = null;
  if (currentTemp <= 5) {
    note.innerHTML="I miss hating the summer heat... #BringSummerBack 🙋‍♀️"
  }
  if (currentTemp >=31) {
    note.innerHTML=" It’s finally hot enough outside to complain about how hot it is.🔥🥵 "
  }

  let currentCity = document.querySelector("p");
  currentCity.innerHTML = `Current city: ${response.data.name}`;
  let icon=document.querySelector("#primary-icon");
  icon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  let description=document.querySelector("#primary-description");
 description.innerHTML=`${response.data.weather[0].description}`
 
  let windSpeedElement=document.querySelector("#wind-speed");
  windSpeedElement.innerHTML=`Wind speed:${Math.round(response.data.wind.speed)}km/h`
  let humidityElement= document.querySelector("#humidity");
  humidityElement.innerHTML=`Humidity:${Math.round(response.data.main.humidity)}%`

}
let form = document.querySelector("#input-form");
form.addEventListener("submit", searchingCity);

//button
function getUserLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchForLocation);
}
function searchForLocation(position) {
  let apiKey = "4b3a638fb4d48006da8ec9048f3f42e3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showData);
}

let button = document.querySelector("#location-button");
button.addEventListener("click", getUserLocation);

//fahr.temp
function displayFahrenheitTemperature(event){
  event.preventDefault();
  let fahrenheitTemp= ( celsiusTemperature *9) /5 + 32
   let currentTemp= document.querySelector("#temperature");
   currentTemp.innerHTML= Math.round(fahrenheitTemp);
   celsiusElement.classList.remove("active");
   fahrenheitElement.classList.add("active");

}
let celsiusTemperature=null;

let fahrenheitElement=document.querySelector("#fahrenheit-link");
fahrenheitElement.addEventListener("click", displayFahrenheitTemperature)

//celsius link
function displayCelsiusTemperature (event) {
  event.preventDefault();
  let currentTemp= document.querySelector("#temperature");
  currentTemp.innerHTML= Math.round(celsiusTemperature);
  celsiusElement.classList.add("active");
   fahrenheitElement.classList.remove("active");
}
let celsiusElement=document.querySelector("#celsius-link");
celsiusElement.addEventListener("click", displayCelsiusTemperature)

search("Los Angeles");