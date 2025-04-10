// Auto fetch with geolocation
navigator.geolocation.getCurrentPosition((position) => {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  getWeather(lat, long);
});

// This was auto on page load, now manual:
function getCurrentLocationWeather() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      getWeather(lat, long);
    },
    (error) => {
      let msg = '';
      switch (error.code) {
        case error.PERMISSION_DENIED:
          msg = "Location permission was denied. Please enable it.";
          break;
        case error.POSITION_UNAVAILABLE:
          msg = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          msg = "The request to get your location timed out.";
          break;
        default:
          msg = "An unknown error occurred.";
      }
      alert(msg);
    }
  );
}

// 🌐 Updated: Call your own backend instead of OpenWeather directly
const getWeather = (lat, long) => {
  const url = `http://localhost:5000/weather?lat=${lat}&lon=${long}`;
  fetch(url)
    .then((response) => response.json())
    .then((weather) => updateUI(weather))
    .catch(() => {
      document.querySelector('.weatherContainer__box').innerText = 'Failed to fetch location weather.';
    });
};

// Manual city input option
function fetchCityWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return alert("Please enter a city name.");

  // 🌐 Updated: Call backend service instead of direct API
  const url = `http://localhost:5000/weather?city=${city}`;
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("City not found.");
      return response.json();
    })
    .then((weather) => updateUI(weather))
    .catch((err) => {
      document.querySelector('.weatherContainer__box').innerText = 'City not found.';
    });
}

// Update UI function (used by both auto and manual)
function updateUI(weather) {
  document.querySelector('.weatherContainer__city').innerText = weather.name;
  document.querySelector('.weatherContainer__temp__temp').innerText = `${Math.round(weather.main.temp)} ℃`;
  document.querySelector('.weatherContainer__wind__data').innerText = `${weather.wind.speed} km/h`;
  document.querySelector('.weatherContainer__sky__description').innerText = weather.weather[0].description;
}
