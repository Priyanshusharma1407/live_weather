const notificationElement = document.querySelector(".notification")
const iconElement = document.querySelector(".weather-icon")
const tempElement = document.querySelector(".temp-value p")
const descElement = document.querySelector(".temp-description p")
const locationElement = document.querySelector(".location p")
const Kelvin = 273;

const key = "a66c5e2086f0fa206cb41452fa2bf5a7"

const weather={};

weather.temperature = {
    unit : "celsius"
}

function celsiustoFahrenheit(temperature) {
   return  (temperature * 9 / 5) + 32;

}

function displayWeather()
{
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value} ° <span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city},${weather.country}`;
}

tempElement.addEventListener("click", () => {
    if (weather.temperature.value === undefined) return;
    if (weather.temperature.unit == "celsius") {
        let fahrenheit = celsiustoFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`
        weather.temperature.unit = "fahrenheit"
    }
    else {
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius";
    }
})


if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display="block";
    notificationElement.innerHTML = "<p>Browser Dosen't Support Geolocation</p>"
}

function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude, longitude);
}

function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message}</p>`;
}

function getWeather(latitude, longitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    fetch(api)
    .then(function (response) {
        let data = response.json();
        console.log(data);
        return data;
        
    })
        .then(function (data) {
            weather.temperature.value = Math.floor(data.main.temp - Kelvin);
            weather.description = data.weather[0].description;
            weather.city = data.name;
            weather.iconId = data.weather[0].icon;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}

