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
