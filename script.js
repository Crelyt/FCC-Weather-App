$(document).ready(function() {

  var lat;
  var long;
  var fahrenheit;
  var celsius;
  var current_temp_f = true;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {

      lat = position.coords.latitude;
      long = position.coords.longitude;

      var api = 'https://fcc-weather-api.glitch.me/api/current?lat=' + lat + '&lon=' + long;

      $.getJSON(api, function(data) {
        var forecast_text = data.weather[0].main;
        var weather_icon = data.weather[0].icon;
        var location = data.name;
        var temperature = data.main.temp;
        var country = data.sys.country;

        fahrenheit = (temperature * (9/5) + 32).toFixed(0);
        celsius = temperature.toFixed(0);

        $('#location-text').text(location);
        $('#country-text').text(country);
        $('#temperature-text').html(fahrenheit + " &deg;F");
        $('.icon-wrap').html('<img src=\'' + weather_icon + '\' alt="Weather Icon">');
        $('#forecast-text').text(forecast_text);

        $('.temperature').on('click', function() {
          if (current_temp_f) {
            $('#temperature-text').html(celsius + " &deg;C");
            current_temp_f = false;
          } else if (!current_temp_f) {
            $('#temperature-text').html(fahrenheit + " &deg;F");
            current_temp_f = true;
          }
        });

        if (fahrenheit > 90) {
          $('body').css('background-color', '#DE3C4B');
        } else if (fahrenheit > 70) {
          $('body').css('background-color', '#F7D08A');
        } else if (fahrenheit > 40) {
          $('body').css('background-color', '#87B6A7');
        } else {
          $('body').css('background-color', '#71B4DB');
        }
      });
    });
  };
});
