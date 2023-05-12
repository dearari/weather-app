function displayWeather(response) {
  celsiusTemperature = response.data.temperature.current;
  document.querySelector("#city-name").innerHTML = response.data.city;
  document.querySelector("#live-temp").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.condition.description);
}

function searchCity(city) {
  let apiKey = "d8991684c37cf2c82b6oa05fb80b5a6t";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let calendar = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[calendar.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[calendar.getMonth()];
let date2 = calendar.getDate();
let year = calendar.getFullYear();

function hours12() {
  return (currentTime.getHours() + 24) % 12 || 12;
}

let currentTime = new Date();
let hour = currentTime.getHours();
if (hour === 10) {
  hour = `${hour}0`;
}
let minute = currentTime.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let date = document.querySelector("#current-date");
date.innerHTML = `${day} | ${month} ${date2} | ${hours12(hour)}:${minute}`;

searchCity("Seoul");

function convertFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = (celsiusTemperature * 9) / 5 + 32;
  let temperature = document.querySelector("#live-temp");
  temperature.innerHTML = Math.round(fahrenheit);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertFahrenheit);

function convertCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#live-temp");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertCelsius);

searchCity("Seoul");
