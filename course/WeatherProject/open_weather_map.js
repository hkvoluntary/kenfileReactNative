const WEATHER_API_KEY = "_YOU_API_KEY_";
const API_STEM = "http://api.openweathermap.org/data/2.5/weather?";

//New York zip code: 10001 10005 10021
//Los Angles zip code: 90001 90005 90012
//San Francisco zip code: 94104 94119
//URL: http://api.openweathermap.org/data/2.5/weather?zip=10001&units=imperial&APPID=_YOU_API_KEY_

function zipUrl(zip) {
  return `${API_STEM}zip=${zip}&units=imperial&APPID=${WEATHER_API_KEY}`;
}

function fetchForecast(zip) {
  return fetch(zipUrl(zip))
    .then(response => response.json())
    .then(responseJSON => {
      console.log('city:' + responseJSON.name)
      return {
        main: responseJSON.weather[0].main,
        description: responseJSON.weather[0].description,
        temp: responseJSON.main.temp,
        city: responseJSON.name
      };
      
    })
    .catch(error => {
      console.error(error);
    });
}

export default { fetchForecastFunction: fetchForecast };
