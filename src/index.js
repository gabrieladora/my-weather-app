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
  let currentTemp = response.data.main.temp;
  let h3 = document.querySelector("h3");
  h3.innerHTML = `${Math.round(currentTemp)}°C`;
  let currentCity = document.querySelector("p");
  currentCity.innerHTML = `Current city: ${response.data.name}`;
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
