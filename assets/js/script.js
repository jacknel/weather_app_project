// const apiKey = '7989e54da22b5217da0cf43c215b6b08'
// script.js

const apiKey = "7989e54da22b5217da0cf43c215b6b08";

// Wait for the DOM to be fully loaded
$(document).ready(() => {
    // Listen for the form submit event
    $("#search-form").submit((event) => {
        event.preventDefault();

        // Get the search input value
        const search = $("#search").val();

        // Make an API call to OpenWeather
        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}`,
            method: "GET"
        }).then((response) => {
            // Update the forecast and search history elements in the HTML
            $("#forecast").text(`The current weather in ${search} is ${response.weather[0].description} with a temperature of ${response.main.temp} degrees.`);
            $("#search-history").append(`<p>${search}</p>`);

            //clear search input
            $("#search").val("")
        }).catch((error) => {
            console.log(error);
        });
    });
});

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search");
const searchHistory = document.querySelector("#search-history");
const forecast = document.querySelector("#forecast");
const fiveDayForecast = document.querySelector("#fiveDayForecast");

searchForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const searchTerm = searchInput.value;
    searchInput.value = "";
    getWeather(searchTerm);
});

function getWeather(searchTerm) {
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=imperial&appid=${apiKey}`;
    const fiveDayForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}&units=imperial&appid=${apiKey}`;

    fetch(weatherURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            const city = data.name;
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            forecast.innerHTML = `<p>City: ${city}</p>
                                <p>Temperature: ${temperature} &#8457;</p>
                                <p>Humidity: ${humidity}%</p>
                                <p>Wind Speed: ${windSpeed} mph</p>`;
            searchHistory.innerHTML += `<p>${city}</p>`;
        });
    fetch(fiveDayForecastURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            const forecastArr = data.list;
            let forecastHTML = "";
            for (let i = 0; i < forecastArr.length; i += 8) {
                forecastHTML += `<div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">${data.city.name}</h5>
                                        <p class="card-text">Date: ${forecastArr[i].dt_txt}</p>
                                        <p class="card-text">Temperature: ${forecastArr[i].main.temp} &#8457;</p>
                                        <p class="card-text">Humidity: ${forecastArr[i].main.humidity}%</p>
                                    </div>
                                </div>`;
            }
            fiveDayForecast.innerHTML = forecastHTML;
        });
}
