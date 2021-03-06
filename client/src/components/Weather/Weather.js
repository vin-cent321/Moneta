import React from "react";
import jquery from 'jquery';
import './Weather.css'
var $ = jquery;


function weather() {
    // This is our API key
    var APIKey = "166a433c57516f51dfab1f7edaed8413";

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
      "q=Richmond,Virginia&units=imperial&appid=" + APIKey;

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {
        // Log the queryURL
        //console.log(queryURL);

        // Log the resulting object
        //console.log(response);

        // Transfer content to HTML
        $(".city").html(response.name + " Weather Details");
        $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".humidity").text("Humidity: " + response.main.humidity);
        $(".temp").text("Temperature (F) " + response.main.temp);

        // Log the data in the console as well
        //console.log("Wind Speed: " + response.wind.speed+"mph");
        //console.log("Humidity: " + response.main.humidity+"%");
        //console.log("Temperature (F): " + response.main.temp);
      });
}

function Weather() {
    weather()
        return (
            <div className="weatherContainer">
            <div className="city"></div>
            <div className="wind"></div>
            <div className="humidity"></div>
            <div className="temp"></div>
            </div>
        )
}

export default Weather