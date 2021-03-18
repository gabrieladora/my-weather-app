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

let h4 = document.querySelector("h4");
   h4.innerHTML = `${hours}:${minutes}`;

if (hours < 10) {
     let h4 = document.querySelector("h4");
   h4.innerHTML = `0${hours}:${minutes}`;
 } 
 if (minutes < 10) {
    let h4 = document.querySelector("h4");
   h4.innerHTML = `${hours}:0${minutes}`;
 }
 let today = document.querySelector("#card-title");
today.innerHTML = `${weekDays[day]}`;

//display the city name on the page after the user submits the form.

function searchingCity(event) {
  event.preventDefault();
  let inputCityName = document.querySelector("#input-city");
  let p = document.querySelector("p");
  p.innerHTML = `${inputCityName.value}`;
  search(inputCityName.value);
}

function search(city) {
  let apiKey = "4b3a638fb4d48006da8ec9048f3f42e3";
  let apiUrl = ` https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showData);
}

function showData(response) {
 console.log(response.data.main.temp);
 console.log(response);
  let currentTemp = response.data.main.temp;
  let h3 = document.querySelector("h3");
  h3.innerHTML = `${Math.round(currentTemp)}°C`;
  if (currentTemp <= 4) {
    let note= document.querySelector("#note");
    note.innerHTML="I miss hating the summer heat... #BringSummerBack 🙋‍♀️"
  }
  if (currentTemp >=35) {
    let note= document.querySelector("#note");
    note.innerHTML="It’s finally hot enough outside to complain about how hot it is.🔥🥵 "
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

